/*
  # Update testimonials table policies

  1. Changes
    - Safely recreate testimonials table if it doesn't exist
    - Drop existing policies to prevent conflicts
    - Create new policies with proper auth.email() checks
    
  2. Security
    - Enable RLS
    - Add policies for:
      - Public read access
      - Authenticated user creation
      - User-specific update/delete based on email
*/

-- First, ensure the table exists
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

-- Safely handle policies using DO block
DO $$ 
BEGIN
  -- Drop existing policies to prevent conflicts
  DROP POLICY IF EXISTS "Anyone can view testimonials" ON testimonials;
  DROP POLICY IF EXISTS "Authenticated users can create testimonials" ON testimonials;
  DROP POLICY IF EXISTS "Users can update own testimonials" ON testimonials;
  DROP POLICY IF EXISTS "Users can delete own testimonials" ON testimonials;

  -- Create new policies
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
END $$;