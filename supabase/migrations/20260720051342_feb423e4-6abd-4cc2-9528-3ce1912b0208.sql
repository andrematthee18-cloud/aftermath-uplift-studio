
CREATE TABLE public.account_deletion_requests (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name text NOT NULL,
  email text NOT NULL,
  reason text NOT NULL,
  product text NOT NULL DEFAULT 'Recovery Plus',
  status text NOT NULL DEFAULT 'pending',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  completed_at timestamp with time zone
);

GRANT INSERT ON public.account_deletion_requests TO anon, authenticated;
GRANT ALL ON public.account_deletion_requests TO service_role;

ALTER TABLE public.account_deletion_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit deletion request"
ON public.account_deletion_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (true);
