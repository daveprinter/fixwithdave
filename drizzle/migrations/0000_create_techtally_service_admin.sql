CREATE TABLE public.techtally_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_key TEXT UNIQUE,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  image_data TEXT NOT NULL DEFAULT '',
  image_alt TEXT NOT NULL DEFAULT '',
  items TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  highlight TEXT,
  tag TEXT,
  price_usd NUMERIC(12,2),
  show_price BOOLEAN NOT NULL DEFAULT false,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.techtally_services TO anon, authenticated;
GRANT ALL ON public.techtally_services TO service_role;
ALTER TABLE public.techtally_services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read visible TechTally services"
  ON public.techtally_services
  FOR SELECT
  TO anon, authenticated
  USING (is_visible = true);

CREATE TABLE public.techtally_admin_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code_name TEXT NOT NULL UNIQUE,
  salt TEXT NOT NULL,
  code_hash TEXT NOT NULL,
  iterations INTEGER NOT NULL DEFAULT 210000,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT ALL ON public.techtally_admin_codes TO service_role;
ALTER TABLE public.techtally_admin_codes ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.techtally_admin_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_key TEXT NOT NULL,
  attempted_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT ALL ON public.techtally_admin_attempts TO service_role;
ALTER TABLE public.techtally_admin_attempts ENABLE ROW LEVEL SECURITY;