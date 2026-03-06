-- Phase 1: Create missing storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES
  ('content', 'content', true),
  ('comment-images', 'comment-images', true),
  ('course-videos', 'course-videos', false),
  ('course-materials', 'course-materials', false),
  ('receipts', 'receipts', false)
ON CONFLICT (id) DO NOTHING;

-- RLS for content bucket (public read, admin write)
CREATE POLICY "Anyone can view content files" ON storage.objects
  FOR SELECT USING (bucket_id = 'content');
CREATE POLICY "Admins can upload content files" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'content' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete content files" ON storage.objects
  FOR DELETE USING (bucket_id = 'content' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update content files" ON storage.objects
  FOR UPDATE USING (bucket_id = 'content' AND public.has_role(auth.uid(), 'admin'));

-- RLS for comment-images (authenticated upload, public read)
CREATE POLICY "Anyone can view comment images" ON storage.objects
  FOR SELECT USING (bucket_id = 'comment-images');
CREATE POLICY "Authenticated can upload comment images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'comment-images' AND auth.role() = 'authenticated');
CREATE POLICY "Users can delete own comment images" ON storage.objects
  FOR DELETE USING (bucket_id = 'comment-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- RLS for course-videos (admin upload, enrolled students via signed URLs)
CREATE POLICY "Admins can manage course videos" ON storage.objects
  FOR ALL USING (bucket_id = 'course-videos' AND public.has_role(auth.uid(), 'admin'));

-- RLS for course-materials (admin upload, enrolled students via signed URLs)
CREATE POLICY "Admins can manage course materials" ON storage.objects
  FOR ALL USING (bucket_id = 'course-materials' AND public.has_role(auth.uid(), 'admin'));

-- RLS for receipts (user uploads own, admin views all)
CREATE POLICY "Users can upload receipts" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'receipts' AND auth.role() = 'authenticated');
CREATE POLICY "Users can view own receipts" ON storage.objects
  FOR SELECT USING (bucket_id = 'receipts' AND (auth.uid()::text = (storage.foldername(name))[1] OR public.has_role(auth.uid(), 'admin')));
CREATE POLICY "Admins can delete receipts" ON storage.objects
  FOR DELETE USING (bucket_id = 'receipts' AND public.has_role(auth.uid(), 'admin'));