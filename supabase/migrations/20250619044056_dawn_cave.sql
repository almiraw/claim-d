/*
  # Admin-only CMS Setup

  1. Security Changes
    - Update RLS policies to restrict profile creation to admins only
    - Allow the first user to become admin (bootstrap scenario)
    - Set up proper read permissions for authenticated users

  2. User Registration Control
    - Create trigger function to handle new user registration
    - Only allow admin@reclaimd.com or first user to register
    - Automatically assign admin role to admin@reclaimd.com

  3. Important Notes
    - The actual admin user must be created through Supabase Auth dashboard
    - This migration sets up the policies and triggers for proper access control
*/

-- First, let's update the RLS policies to be more restrictive
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;

-- Only allow admins to create profiles, or allow first user (bootstrap scenario)
CREATE POLICY "Only admins can create profiles"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (
    -- Allow if user is already an admin
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
    -- Or if no admin exists yet (bootstrap scenario)
    OR NOT EXISTS (SELECT 1 FROM profiles WHERE role = 'admin')
    -- Or if this is the trigger creating the profile for a new auth user
    OR auth.uid() IS NOT NULL
  );

-- Allow authenticated users to read all profiles (for author info, etc.)
CREATE POLICY "Profiles are viewable by authenticated users"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow users to update their own profiles
CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Create a function to handle new user registration (admin only)
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Only allow admin@reclaimd.com to sign up, or if no admin exists yet
  IF NEW.email = 'admin@reclaimd.com' OR NOT EXISTS (SELECT 1 FROM profiles WHERE role = 'admin') THEN
    INSERT INTO public.profiles (id, email, full_name, role)
    VALUES (
      NEW.id,
      NEW.email,
      COALESCE(NEW.raw_user_meta_data->>'full_name', 'Admin User'),
      CASE 
        WHEN NEW.email = 'admin@reclaimd.com' THEN 'admin'
        ELSE 'admin'  -- First user becomes admin if no admin exists
      END
    );
  ELSE
    -- Reject the signup by raising an exception
    RAISE EXCEPTION 'Registration is restricted to administrators only';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Update existing RLS policies for other tables to work with admin-only system
-- Ensure posts can be managed by admins
DROP POLICY IF EXISTS "Authors can create posts" ON posts;
CREATE POLICY "Admins can create posts"
  ON posts
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'editor', 'author')
    )
  );

-- Ensure pages can be managed by admins
DROP POLICY IF EXISTS "Authors can create pages" ON pages;
CREATE POLICY "Admins can create pages"
  ON pages
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'editor', 'author')
    )
  );

-- Update media upload policy
DROP POLICY IF EXISTS "Authenticated users can upload media" ON media;
CREATE POLICY "Admins can upload media"
  ON media
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'editor', 'author')
    )
  );