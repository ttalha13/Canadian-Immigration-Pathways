/*
  # Create testimonials table and policies

  1. New Tables
    - `testimonials`
      - `id` (uuid, primary key)
      - `user_name` (text)
      - `rating` (integer, 1-5)
      - `comment` (text)
      - `immigration_status` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on testimonials table
    - Add policies for:
      - Public read access
      - Authenticated users can create testimonials
      - Users can update their own testimonials
      - Users can delete their own testimonials
*/

-- Create testimonials table if it doesn't exist
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_name text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text NOT NULL,
  immigration_status text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Safely create policies using DO block
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