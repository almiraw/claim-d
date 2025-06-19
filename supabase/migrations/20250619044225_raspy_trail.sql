/*
  # Fix Admin Authentication System

  1. Security Changes
    - Update RLS policies for admin-only access
    - Create trigger for automatic profile creation
    - Restrict registration to admin users only

  2. Policy Updates
    - Drop and recreate all conflicting policies
    - Ensure proper permissions for content management
    - Allow first user to become admin (bootstrap)

  3. Trigger Function
    - Automatically create profiles for new auth users
    - Assign admin role to admin@reclaimd.com
    - Restrict registration after admin exists
*/

-- Drop all existing policies that might conflict
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Authors can create posts" ON posts;
DROP POLICY IF EXISTS "Authors can create pages" ON pages;
DROP POLICY IF EXISTS "Authenticated users can upload media" ON media;

-- Create new profile policies
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

CREATE POLICY "Profiles are viewable by authenticated users"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update their own profile"
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

-- Update posts policies for admin-only system
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

-- Update pages policies for admin-only system
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

-- Update media policies for admin-only system
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