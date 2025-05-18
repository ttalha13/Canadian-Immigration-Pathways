/*
  # Delete all testimonials

  1. Changes
    - Delete all existing testimonials
    - Keep table structure and policies intact
    
  2. Security
    - Maintain existing RLS policies
    - Keep table structure for future testimonials
*/

-- Delete all testimonials while keeping the table structure
TRUNCATE TABLE testimonials;