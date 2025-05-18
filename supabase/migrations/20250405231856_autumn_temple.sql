/*
  # Create contact messages table and policies

  1. New Tables
    - `contact_messages`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `province` (text)
      - `phone_number` (text)
      - `message` (text)
      - `created_at` (timestamp)
  2. Security
    - Enable RLS
    - Add policies for:
      - Public insert access
      - User-specific read access
      - Admin-only management access
*/

-- Create extension if it doesn't exist
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_tables 
    WHERE schemaname = 'public' 
    AND tablename = 'contact_messages'
  ) THEN
    CREATE TABLE contact_messages (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
      name text NOT NULL,
      email text NOT NULL,
      province text NOT NULL,
      phone_number text NOT NULL,
      message text NOT NULL,
      created_at timestamptz DEFAULT CURRENT_TIMESTAMP
    );
  END IF;
END $$;

-- Enable RLS
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can insert contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Users can read own messages" ON contact_messages;
DROP POLICY IF EXISTS "Admins can read all messages" ON contact_messages;
DROP POLICY IF EXISTS "Admins can update messages" ON contact_messages;
DROP POLICY IF EXISTS "Admins can delete messages" ON contact_messages;

-- Create new policies
CREATE POLICY "Anyone can insert contact messages"
  ON contact_messages
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can read own messages"
  ON contact_messages
  FOR SELECT
  TO authenticated
  USING (email = auth.email()::text);

CREATE POLICY "Admins can read all messages"
  ON contact_messages
  FOR SELECT
  TO authenticated
  USING (auth.email() = 'abutalha7778@gmail.com'::text);

CREATE POLICY "Admins can update messages"
  ON contact_messages
  FOR UPDATE
  TO authenticated
  USING (auth.email() = 'abutalha7778@gmail.com'::text);

CREATE POLICY "Admins can delete messages"
  ON contact_messages
  FOR DELETE
  TO authenticated
  USING (auth.email() = 'abutalha7778@gmail.com'::text);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON contact_messages(email);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);