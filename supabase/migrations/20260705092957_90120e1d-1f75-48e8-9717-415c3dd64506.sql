
CREATE TABLE public.recovery_plus_waitlist (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  product TEXT NOT NULL DEFAULT 'Recovery Plus',
  notified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX recovery_plus_waitlist_email_idx ON public.recovery_plus_waitlist (email);
CREATE INDEX recovery_plus_waitlist_created_at_idx ON public.recovery_plus_waitlist (created_at DESC);

GRANT INSERT ON public.recovery_plus_waitlist TO anon, authenticated;
GRANT ALL ON public.recovery_plus_waitlist TO service_role;

ALTER TABLE public.recovery_plus_waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can join waitlist"
  ON public.recovery_plus_waitlist
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
