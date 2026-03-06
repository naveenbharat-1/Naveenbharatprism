1. Test the mobile hamburger menu on the landing page by resizing the browser to a small viewport width
2. Test the video player end-to-end: play a video, verify watermark appears after 10s, seek using progress bar, check end screen suppression
3. Test admin upload flow: select a course, drill into chapters, create a sub-folder, and upload content
4. I want to remix my project to create a copy of it
5. Also fix the RLS security issues: tighten profiles table policies to remove permissive USING(true) on INSERT/UPDATE/DELETE, and add controlled read access policy for profiles_public
6. Implement the video player polish plan: watermark timing logic (hidden for first 10s, locked visible in last 10s), end screen suppression enhancement, progress bar flicker fix, and document in memorywork.md
7. Test the video player end-to-end: play a video, verify watermark hides for first 10 seconds then appears, verify it stays locked visible in last 10 seconds, seek using progress bar, and confirm no YouTube end screen appears
8. Fix the RLS security issues: run SQL migrations to remove permissive USING(true) policies on the profiles table INSERT/UPDATE/DELETE, and add a controlled read policy for profiles_public view
9. Add a subtle fade-in animation when the watermark first appears at the 10 second mark, and a pulsing border effect during the last 10 seconds to draw attention to the Mahima Academy branding
10. Approved. Please implement all fixes: run the SQL migration to secure profiles_public with RLS, fix manifest.json name to Mahima Academy, replace the hardcoded completedLessons=1 in LessonView.tsx with a real query from user_progress table, and update memorywork.md with the full audit checklist report
11. Fix the real progress tracking in LessonView.tsx: replace the hardcoded completedLessons=1 with a real query from the user_progress table where user_id matches the logged-in user and course_id matches, then show accurate X/Y completed lessons in the sidebar progress bar
12. Enable leaked password protection in Supabase Dashboard → Authentication → Password Security → turn on Haveibeenpwned integration to block compromised passwords
13. Test the student panel end-to-end: log in as anujkumar75yadav@gmail.com, open a course, verify progress bar shows real data, play a video and confirm watermark timing works