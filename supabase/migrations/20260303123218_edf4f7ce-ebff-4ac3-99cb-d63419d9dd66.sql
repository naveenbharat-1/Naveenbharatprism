-- Add a SELECT policy for students table so authenticated users can view student records
CREATE POLICY "Authenticated users can view students"
  ON public.students
  FOR SELECT
  TO authenticated
  USING (true);