/*
  # Update testimonials table and policies

  1. Changes
    - Safely create testimonials table if it doesn't exist
    - Safely recreate policies using IF NOT EXISTS checks
  2. Security
    - Maintain existing RLS policies:
      - Public read access
      - Authenticated users can create
      - Users can update their own testimonials
      - Users can delete their own testimonials
*/

-- Create table if it doesn't exist
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_name text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text NOT NULL,
  immigration_status text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS if not already enabled
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Safely create policies using DO block with existence checks
DO $$ 
BEGIN
  -- Create view policy if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'testimonials' 
    AND policyname = 'Anyone can view testimonials'
  ) THEN
    CREATE POLICY "Anyone can view testimonials"
      ON testimonials
      FOR SELECT
      TO public
      USING (true);
  END IF;

  -- Create insert policy if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'testimonials' 
    AND policyname = 'Authenticated users can create testimonials'
  ) THEN
    CREATE POLICY "Authenticated users can create testimonials"
      ON testimonials
      FOR INSERT
      TO authenticated
      WITH CHECK (true);
  END IF;

  -- Create update policy if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'testimonials' 
    AND policyname = 'Users can update own testimonials'
  ) THEN
    CREATE POLICY "Users can update own testimonials"
      ON testimonials
      FOR UPDATE
      TO authenticated
      USING (user_name = current_user);
  END IF;

  -- Create delete policy if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'testimonials' 
    AND policyname = 'Users can delete own testimonials'
  ) THEN
    CREATE POLICY "Users can delete own testimonials"
      ON testimonials
      FOR DELETE
      TO authenticated
      USING (user_name = current_user);
  END IF;
END $$;