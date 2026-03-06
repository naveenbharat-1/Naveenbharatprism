
-- Create doubts table for student Q&A
CREATE TABLE public.doubts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  lesson_id uuid REFERENCES public.lessons(id) ON DELETE CASCADE,
  question text NOT NULL,
  image_url text,
  resolved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.doubts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can create own doubts" ON public.doubts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own doubts" ON public.doubts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own doubts" ON public.doubts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all doubts" ON public.doubts
  FOR ALL USING (public.has_role(auth.uid(), 'admin'::app_role));
