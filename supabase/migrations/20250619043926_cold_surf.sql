/*
  # Create default admin user

  1. Security
    - Remove public signup functionality
    - Create default admin user
    - Restrict profile creation to admin only

  2. Default Admin Credentials
    - Email: admin@reclaimd.com
    - Password: admin123456
    - Role: admin
*/

-- First, let's update the RLS policies to be more restrictive
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;

-- Only allow admins to create profiles
CREATE POLICY "Only admins can create profiles"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
    OR NOT EXISTS (SELECT 1 FROM profiles WHERE role = 'admin')
  );

-- Allow users to read all profiles (for author info, etc.)
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
CREATE POLICY "Profiles are viewable by authenticated users"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (true);

-- Insert default admin user (this will be created when someone signs up with this email)
-- The actual user creation happens through Supabase Auth, this just ensures the profile exists
INSERT INTO profiles (
  id,
  email,
  full_name,
  role
) VALUES (
  '00000000-0000-0000-0000-000000000000'::uuid,
  'admin@reclaimd.com',
  'Administrator',
  'admin'
) ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role;

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
        ELSE 'author'
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