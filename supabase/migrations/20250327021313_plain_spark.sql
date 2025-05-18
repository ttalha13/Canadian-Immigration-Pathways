/*
  # Set up contact form notifications

  1. Changes
    - Create contact_messages table if it doesn't exist
    - Add trigger for email notifications
    - Set up RLS policies
  
  2. Security
    - Enable RLS
    - Add policies for public submissions
    - Add admin-only access policies
*/

-- Create contact_messages table if it doesn't exist
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

-- Create policies
DO $$ 
BEGIN
  -- Drop existing policies to prevent conflicts
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

-- Create function to call edge function
CREATE OR REPLACE FUNCTION notify_contact_submission()
RETURNS TRIGGER AS $$
BEGIN
  -- Call the edge function
  PERFORM
    net.http_post(
      url := current_setting('app.settings.edge_function_url') || '/contact-notification',
      headers := '{"Content-Type": "application/json", "Authorization": "Bearer ' || current_setting('request.jwt.claim.sub', true) || '"}',
      body := json_build_object('record', row_to_json(NEW))::text
    );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger
DROP TRIGGER IF EXISTS contact_notification_trigger ON contact_messages;
CREATE TRIGGER contact_notification_trigger
  AFTER INSERT ON contact_messages
  FOR EACH ROW
  EXECUTE FUNCTION notify_contact_submission();