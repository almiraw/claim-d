/*
  # Fix profiles RLS policies

  1. Security Updates
    - Add INSERT policy for authenticated users to create their own profiles
    - Ensure users can only create profiles with their own auth.uid()
    
  2. Changes
    - Add policy allowing authenticated users to insert their own profile data
*/

-- Allow authenticated users to insert their own profile
CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);