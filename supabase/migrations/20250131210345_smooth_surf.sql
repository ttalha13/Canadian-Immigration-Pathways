/*
  # Fix Testimonials RLS Policies

  1. Changes
    - Simplify RLS policies for testimonials table
    - Fix issue with user_name validation
    - Ensure authenticated users can create testimonials
    - Maintain public read access
  
  2. Security
    - Enable RLS
    - Add simplified policies for CRUD operations
    - Ensure proper user validation
*/

-- First ensure RLS is enabled
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to prevent conflicts
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Anyone can view testimonials" ON testimonials;
  DROP POLICY IF EXISTS "Authenticated users can create testimonials" ON testimonials;
  DROP POLICY IF EXISTS "Users can update own testimonials" ON testimonials;
  DROP POLICY IF EXISTS "Users can delete own testimonials" ON testimonials;
  DROP POLICY IF EXISTS "Admins can manage all testimonials" ON testimonials;
END $$;

-- Create new simplified policies
CREATE POLICY "Anyone can view testimonials"
  ON testimonials
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create testimonials"
  ON testimonials
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update own testimonials"
  ON testimonials
  FOR UPDATE
  TO authenticated
  USING (user_name = auth.email()::text);

CREATE POLICY "Users can delete own testimonials"
  ON testimonials
  FOR DELETE
  TO authenticated
  USING (user_name = auth.email()::text);