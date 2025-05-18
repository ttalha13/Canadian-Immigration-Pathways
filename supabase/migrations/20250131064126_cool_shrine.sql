-- Create function to call edge function
CREATE OR REPLACE FUNCTION notify_contact_submission()
RETURNS TRIGGER AS $$
BEGIN
  -- Call the edge function
  PERFORM
    net.http_post(
      url := 'https://xtxuuaqnbvhzyzdxgrsd.functions.supabase.co/contact-notification',
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