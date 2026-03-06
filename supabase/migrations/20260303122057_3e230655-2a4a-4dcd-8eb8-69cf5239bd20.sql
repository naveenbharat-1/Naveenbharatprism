-- The Block public access policy drop succeeded in the previous migration.
-- profiles_public is a view - it uses security_invoker, no separate RLS needed.
-- Verify the policy was dropped by re-running the drop (idempotent):
DROP POLICY IF EXISTS "Block public access" ON public.profiles;