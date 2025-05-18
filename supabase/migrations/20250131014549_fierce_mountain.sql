/*
  # Clean up testimonials table and policies

  This migration ensures we have a single, clean setup for testimonials:
  1. Drops existing policies to prevent conflicts
  2. Creates the table if it doesn't exist
  3. Sets up proper RLS policies
*/

-- First drop existing policies to prevent conflicts
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Anyone can view testimonials" ON testimonials;
  DROP POLICY IF EXISTS "Authenticated users can create testimonials" ON testimonials;
  DROP POLICY IF EXISTS "Users can update own testimonials" ON testimonials;
  DROP POLICY IF EXISTS "Users can delete own testimonials" ON testimonials;
END $$;

-- Create or update the testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_name text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text NOT NULL,
  immigration_status text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Create fresh policies
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