CREATE TABLE public.techtally_admin_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  token_hash TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT ALL ON public.techtally_admin_sessions TO service_role;
ALTER TABLE public.techtally_admin_sessions ENABLE ROW LEVEL SECURITY;