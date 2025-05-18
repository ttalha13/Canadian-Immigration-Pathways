-- Drop the previous function and trigger
DROP FUNCTION IF EXISTS notify_contact_submission() CASCADE;

-- Ensure the contact_messages table exists with correct structure
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  province text NOT NULL,
  phone_number text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Recreate policies
DO $$ 
BEGIN
  -- Drop existing policies
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
    USING (auth.email() = 'abutalha7778@gmail.com');

  CREATE POLICY "Admins can update messages"
    ON contact_messages
    FOR UPDATE
    TO authenticated
    USING (auth.email() = 'abutalha7778@gmail.com');

  CREATE POLICY "Admins can delete messages"
    ON contact_messages
    FOR DELETE
    TO authenticated
    USING (auth.email() = 'abutalha7778@gmail.com');
END $$;