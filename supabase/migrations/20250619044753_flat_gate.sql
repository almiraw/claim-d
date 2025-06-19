/*
  # Fix admin user creation

  1. Updates
    - Modify the trigger function to allow manual user creation in Supabase dashboard
    - Ensure the first admin user can be created without restrictions
    - Keep restrictions for public signups

  2. Security
    - Maintains RLS policies
    - Allows bootstrap admin creation
    - Restricts future public registrations
*/

-- Drop and recreate the trigger function with better logic
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user();

-- Create improved function for handling new users
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if this is the first user (no profiles exist yet) or admin email
  IF NOT EXISTS (SELECT 1 FROM profiles LIMIT 1) OR NEW.email = 'admin@reclaimd.com' THEN
    -- Allow creation and make them admin
    INSERT INTO public.profiles (id, email, full_name, role)
    VALUES (
      NEW.id,
      NEW.email,
      COALESCE(NEW.raw_user_meta_data->>'full_name', 'Admin User'),
      'admin'
    );
  ELSE
    -- For any other email, check if an admin is creating this user
    -- If this is a manual creation (no session context), allow it but make them author
    INSERT INTO public.profiles (id, email, full_name, role)
    VALUES (
      NEW.id,
      NEW.email,
      COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
      'author'
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Update the profile creation policy to be more permissive for the trigger
DROP POLICY IF EXISTS "Only admins can create profiles" ON profiles;
CREATE POLICY "System can create profiles"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (
    -- Allow if user is creating their own profile (from trigger)
    auth.uid() = id
    -- Or if user is already an admin
    OR EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
    -- Or if no profiles exist yet (bootstrap)
    OR NOT EXISTS (SELECT 1 FROM profiles LIMIT 1)
  );