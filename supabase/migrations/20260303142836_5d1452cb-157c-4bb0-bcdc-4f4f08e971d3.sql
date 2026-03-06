-- Fix profiles_public view: recreate with SECURITY INVOKER to inherit profiles RLS
DROP VIEW IF EXISTS public.profiles_public;

CREATE VIEW public.profiles_public
  WITH (security_invoker = true)
AS
  SELECT id, full_name, avatar_url
  FROM public.profiles;

-- Grant access to authenticated and anon roles
GRANT SELECT ON public.profiles_public TO authenticated;
GRANT SELECT ON public.profiles_public TO anon;