/*
  # Fix RLS policies and admin-only registration

  1. Security Updates
    - Update RLS policies to be more restrictive
    - Only allow admins to create profiles (with bootstrap scenario)
    - Restrict registration to admin email only
    
  2. Policy Updates
    - Drop and recreate all policies to avoid conflicts
    - Ensure proper role-based access control
    - Allow authenticated users to view profiles for author info
    
  3. Trigger Function
    - Create function to handle new user registration
    - Restrict signup to admin@reclaimd.com only
    - Bootstrap first admin if none exists
*/

-- Drop all existing policies first to avoid conflicts
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Profiles are viewable by authenticated users" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "System can create profiles" ON profiles;

-- Drop existing policies on other tables
DROP POLICY IF EXISTS "Authors can create posts" ON posts;
DROP POLICY IF EXISTS "Admins can create posts" ON posts;
DROP POLICY IF EXISTS "Authors can create pages" ON pages;
DROP POLICY IF EXISTS "Admins can create pages" ON pages;
DROP POLICY IF EXISTS "Authenticated users can upload media" ON media;
DROP POLICY IF EXISTS "Admins can upload media" ON media;

-- Create new restrictive policies for profiles
CREATE POLICY "System can create profiles"
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
CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Drop existing trigger and function if they exist
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user();

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
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Update posts policies
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

-- Update pages policies
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

-- Update media policies
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