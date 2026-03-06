-- Add SELECT policy for authenticated users to view attendance
CREATE POLICY "Authenticated users can view attendance"
ON public.attendance
FOR SELECT
TO authenticated
USING (auth.role() = 'authenticated');

-- Add SELECT policy for authenticated users to view students
CREATE POLICY "Authenticated users can view students"
ON public.students
FOR SELECT
TO authenticated
USING (auth.role() = 'authenticated');