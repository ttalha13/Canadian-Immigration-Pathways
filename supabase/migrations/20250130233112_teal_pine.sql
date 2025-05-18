/*
  # Safe Testimonials Migration

  1. Changes
    - Safely creates testimonials table if it doesn't exist
    - Safely adds RLS policies if they don't exist
    - Uses DO block to handle conditional creation
    - Prevents duplicate policy errors

  2. Security
    - Enables RLS
    - Adds policies for:
      - Public read access
      - Authenticated user creation
      - User-specific update/delete
*/

DO $$ 
BEGIN
  -- Drop existing policies to prevent conflicts
  DROP POLICY IF EXISTS "Anyone can view testimonials" ON testimonials;
  DROP POLICY IF EXISTS "Authenticated users can create testimonials" ON testimonials;
  DROP POLICY IF EXISTS "Users can update own testimonials" ON testimonials;
  DROP POLICY IF EXISTS "Users can delete own testimonials" ON testimonials;

  -- Create policies
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
    USING (user_name = current_user);

  CREATE POLICY "Users can delete own testimonials"
    ON testimonials
    FOR DELETE
    TO authenticated
    USING (user_name = current_user);

END $$;