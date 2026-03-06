## 🚀 PROMPT: End-to-End Verification & Security Audit – Admin, Student, & Hacker Perspectives







### Objective



Conduct a comprehensive verification of the entire website from three distinct viewpoints: **Admin**, **Student**, and **Hacker (Security)**. Identify any functional bugs, UI/UX inconsistencies, performance issues, and security vulnerabilities. After identification, fix all issues and ensure the platform runs flawlessly. Use the provided test accounts and document every step.







---







### 🔐 Test Accounts



- **Admin**: `naveenbharatprism@gmail.com` / `Ceomahima26`



- **Student**: `anujkumar75yadav@gmail.com` / `12345678`







---







## 📋 Phase 1: Landing Page & General Access (Highest Priority)



- [ ] Open the website in a fresh browser (incognito). Does the landing page load without errors?  



- [ ] If blank, check console for errors – fix immediately.  



- [ ] Verify all public pages (landing, about, contact) load correctly.  



- [ ] Test responsiveness on mobile, tablet, and desktop.  



- [ ] Check that all fonts, images, and styles load properly.







---







## 👑 Phase 2: Admin Panel Walkthrough







### 2.1 Login & Dashboard



- [ ] Log in as admin – does dashboard load with correct stats (students, revenue, courses)?  



- [ ] Verify no console errors.







### 2.2 Course Management



- [ ] Navigate to **Courses** → select a course (e.g., "Target Bio 360 Botany").  



- [ ] Click into a chapter (e.g., "Cell The Unit of Life").  



- [ ] Click **"+ Sub-Folder"** – does a modal/form appear? Create a subfolder "Test Sub".  



- [ ] Navigate into the new subfolder.  



- [ ] Click **"Upload"** – does upload form open? Upload a test PDF, a YouTube link, and a DPP.  



- [ ] After upload, verify the content appears in the list.  



- [ ] Edit a lecture: change title, update video link, add an attachment (e.g., a Word doc).  



- [ ] Delete a lecture – confirm deletion.  



- [ ] Check that no page goes blank at any step.







### 2.3 Library Section



- [ ] Go to **Library** tab.  



- [ ] Are all uploaded materials visible (from all courses)?  



- [ ] Can you filter by type (PDF, video, DPP)?  



- [ ] Add a new library item directly (if allowed).  



- [ ] Edit and delete an item.







### 2.4 Content Upload Enhancements



- [ ] While adding a lecture, can you attach multiple file types: PDF, DOCX, XLS, PPT, image, external link?  



- [ ] Verify that attachments are stored and retrievable.







### 2.5 Course Thumbnail



- [ ] Edit a course – upload a new thumbnail image. Does it save and display correctly on the student side?







### 2.6 Users & Payments



- [ ] Navigate to **Users** – check student list.  



- [ ] View student `anujkumar75yadav@gmail.com` – verify enrolled courses.  



- [ ] Check **Payments** – if any test payments exist, ensure they show correctly.







### 2.7 Schedule & Social (if applicable)



- [ ] Test any schedule/social features for errors.







---







## 🧑‍🎓 Phase 3: Student Panel Walkthrough







### 3.1 Login & Dashboard



- [ ] Log in as student – does dashboard show enrolled courses?  



- [ ] No console errors.







### 3.2 Course Navigation



- [ ] Click into a course (e.g., "Target Bio 360 Botany").  



- [ ] Verify breadcrumbs: `All Classes > Subject > Course > Chapter` (or similar).  



- [ ] Check lecture counts – they should be real numbers (not 0/0).  



- [ ] Click into a chapter.







### 3.3 Video Player – Full Test



- [ ] Play a video.  



  - [ ] **First 10 seconds**: No watermark visible.  



  - [ ] **After 10 seconds**: Watermark appears (Mahima text with grey background, logo covering infinity symbol).  



  - [ ] Tap on video – controls appear; tap again – hide.  



  - [ ] Auto‑hide after 3 seconds works.  



  - [ ] Click progress bar – video seeks accurately.  



  - [ ] Click settings gear – speed menu opens (1x, 2x, 3x); speed changes work.  



  - [ ] Click rotation icon – video rotates 90° and goes full‑screen; second click exits.  



  - [ ] Click like button – count increments; can't like twice.  



  - [ ] Click doubts – modal opens; post a doubt (text + image if possible).  



  - [ ] Click download PDF – downloads the attached class PDF.  



  - [ ] Below player, verify attachment icons (PDF, Notes, DPP) appear; click one – opens in full‑page PDF viewer.  



  - [ ] Exit button (top-left) – navigates back.







- [ ] **End of video**:  



  - [ ] When video ends, YouTube end screen does NOT appear.  



  - [ ] Custom replay button appears (matches reference image).  



  - [ ] Watermark remains covering YouTube branding during transition.  



  - [ ] Click replay – video restarts.







### 3.4 PDF Viewer



- [ ] Open any PDF from lecture attachments – should open in **full‑page viewer** (no Google Drive redirect).  



- [ ] Test full‑screen toggle (if present).







### 3.5 PWA Installation



- [ ] On mobile (or desktop with "Install App" prompt), install the website as an app.  



- [ ] Open the installed app – verify it launches in standalone mode (no browser UI).  



- [ ] Login persists after closing and reopening.







---







## 🕵️ Phase 4: Hacker / Security Perspective







### 4.1 Authentication & Session



- [ ] Try to access admin pages (`/admin/dashboard`) without logging in – should redirect to login.  



- [ ] Try to access another student's data by manipulating URL (e.g., `/profile/another-user-id`) – should return 403 or redirect.  



- [ ] Check for session fixation – log in, note session cookie, log out, try to reuse cookie.







### 4.2 API Security



- [ ] Open browser DevTools → Network tab.  



- [ ] Look for API calls to Supabase – inspect request headers (should include auth token).  



- [ ] Try to replay an API request with altered `user_id` – should be rejected.  



- [ ] Check if any endpoints expose sensitive data without proper authorization.







### 4.3 RLS Policies



- [ ] Verify that `profiles` table has strict RLS:  



  - [ ] No `USING(true)` on INSERT/UPDATE/DELETE.  



  - [ ] Read access limited to own profile or public fields only.  



- [ ] Attempt to directly query Supabase (e.g., from browser console) using anon key – should be blocked for protected tables.







### 4.4 File Upload Security



- [ ] Try to upload a malicious file (e.g., .html with script, .exe) – should be rejected or sanitized.  



- [ ] Check that uploaded files are served with correct content-type and not executable.







### 4.5 Input Validation



- [ ] Test for XSS: enter `<script>alert('xss')</script>` in comment/doubt fields – should be escaped.  



- [ ] Test for SQL injection by adding special characters in search fields – no errors.







### 4.6 Dependencies & Vulnerabilities



- [ ] Run `npm audit` – address any moderate or high severity vulnerabilities (if any).  



- [ ] Ensure no outdated packages with known exploits.







---







## 🔍 Phase 5: General UI/UX & Performance







- [ ] Check mobile hamburger menu on landing page – opens/closes smoothly.  



- [ ] All buttons have proper hover/focus states.  



- [ ] Page load times are acceptable; lazy loading works for images.  



- [ ] No broken links or 404s.  



- [ ] Console errors: zero (except expected warnings like "React Router future flag" – can be ignored).  



- [ ] Test on multiple browsers (Chrome, Firefox, Edge) – consistent behavior.







---







## 📝 Phase 6: Documentation & Reporting







- [ ] Create/update `memorywork.md` with:  



  - List of all fixes applied.  



  - Summary of verification results (✅/❌ for each checklist item).  



  - Any remaining issues or known limitations.  



  - Screenshots of key working features (video player, admin panel, etc.).







---







## 🚨 Immediate Action Items (If Any Fails)







- If the landing page is blank – **fix first** before proceeding.



- If any video player feature fails – debug and correct immediately.



- If any admin upload leads to blank page – trace route/component and fix.



- If any security vulnerability is found – patch and retest.







---







## ✅ Final Deliverable







After completing all steps, provide a **detailed report** in the chat, summarizing:



- All passed checks.



- Any issues encountered and how they were fixed.



- Confirmation that the website is now fully functional, secure, and polished.







**Let's execute this audit with precision and deliver a flawless platform.**Verify the landing page and dashboard both load correctly now — test with student account anujkumar75yadav@gmail.com and admin account naveenbharatprism@gmail.com## ✅ Verification To-Do List



Use this checklist to track the completion of each verification task from the end-to-end audit.  

Mark each item with **✓** if done, **✗** if not done or failed, and add notes as needed.



---



### 📌 Phase 1: Landing Page & General Access

- [ ] Open website in incognito – landing page loads without errors

- [ ] If blank, check console and fix immediately

- [ ] All public pages (landing, about, contact) load correctly

- [ ] Responsive on mobile, tablet, desktop

- [ ] Fonts, images, styles load properly



---



### 👑 Phase 2: Admin Panel Walkthrough



#### 2.1 Login & Dashboard

- [ ] Log in as admin – dashboard loads with correct stats

- [ ] No console errors



#### 2.2 Course Management

- [ ] Navigate to Courses → select a course (e.g., "Target Bio 360 Botany")

- [ ] Click into a chapter (e.g., "Cell The Unit of Life")

- [ ] Click "+ Sub-Folder" – modal/form appears, create "Test Sub"

- [ ] Navigate into new subfolder

- [ ] Click "Upload" – upload form opens; upload test PDF, YouTube link, DPP

- [ ] Uploaded content appears in list

- [ ] Edit a lecture: change title, update video link, add attachment (e.g., Word doc)

- [ ] Delete a lecture – confirmation and removal works

- [ ] No blank pages at any step



#### 2.3 Library Section

- [ ] Library tab loads with all uploaded materials

- [ ] Filter by type (PDF, video, DPP) works

- [ ] Add new library item (if allowed)

- [ ] Edit and delete library item



#### 2.4 Content Upload Enhancements

- [ ] When adding lecture, can attach multiple file types (PDF, DOCX, XLS, PPT, image, external link)

- [ ] Attachments stored and retrievable



#### 2.5 Course Thumbnail

- [ ] Edit course – upload new thumbnail; saves and displays on student side



#### 2.6 Users & Payments

- [ ] Navigate to Users – student list visible

- [ ] View student `anujkumar75yadav@gmail.com` – enrolled courses correct

- [ ] Payments tab – any test payments show correctly (if applicable)



#### 2.7 Schedule & Social (if applicable)

- [ ] Schedule/social features work without errors



---



### 🧑‍🎓 Phase 3: Student Panel Walkthrough



#### 3.1 Login & Dashboard

- [ ] Log in as student – dashboard shows enrolled courses

- [ ] No console errors



#### 3.2 Course Navigation

- [ ] Click into a course (e.g., "Target Bio 360 Botany")

- [ ] Breadcrumbs: `All Classes > Subject > Course > Chapter` (correct format)

- [ ] Lecture counts are real (not 0/0)

- [ ] Click into a chapter



#### 3.3 Video Player – Full Test

- [ ] Play a video

- [ ] **First 10 seconds**: No watermark visible

- [ ] **After 10 seconds**: Watermark appears (text with grey background, logo covers infinity symbol)

- [ ] Tap video – controls appear; tap again – hide

- [ ] Auto‑hide after 3 seconds works

- [ ] Click progress bar – video seeks accurately

- [ ] Click settings gear – speed menu (1x,2x,3x) opens; speed changes work

- [ ] Click rotation icon – rotates 90° + fullscreen; second click exits

- [ ] Click like button – count increments (one like per user)

- [ ] Click doubts – modal opens; post a doubt (text + optional image)

- [ ] Click download PDF – downloads attached class PDF

- [ ] Below player – attachment icons (PDF, Notes, DPP) appear

- [ ] Click attachment icon – opens in full‑page PDF viewer

- [ ] Exit button (top‑left) – navigates back

- [ ] **End of video**: No YouTube end screen

- [ ] Custom replay button appears (matches reference)

- [ ] Watermark remains covering YouTube branding during transition

- [ ] Click replay – video restarts



#### 3.4 PDF Viewer

- [ ] Open any PDF from lecture attachments – full‑page viewer (no Drive redirect)

- [ ] Full‑screen toggle works (if present)



#### 3.5 PWA Installation

- [ ] Install website as app on mobile/desktop

- [ ] Launches in standalone mode (no browser UI)

- [ ] Login persists after closing and reopening app



---



### 🕵️ Phase 4: Hacker / Security Perspective



#### 4.1 Authentication & Session

- [ ] Access admin pages without login – redirects to login

- [ ] Try to access another user's profile via URL – 403 or redirect

- [ ] Session cookie cannot be reused after logout



#### 4.2 API Security

- [ ] Inspect network requests – auth token present

- [ ] Replay API request with altered `user_id` – rejected

- [ ] No endpoints expose sensitive data without auth



#### 4.3 RLS Policies

- [ ] `profiles` table: no `USING(true)` on INSERT/UPDATE/DELETE

- [ ] Read access limited to own profile or public fields only

- [ ] Direct query from browser console with anon key fails for protected tables



#### 4.4 File Upload Security

- [ ] Upload malicious file (e.g., .html with script) – rejected

- [ ] Uploaded files served with correct content‑type, not executable



#### 4.5 Input Validation

- [ ] XSS attempt in comment/doubt fields – escaped

- [ ] SQL injection characters in search – no errors



#### 4.6 Dependencies & Vulnerabilities

- [ ] Run `npm audit` – address moderate/high severity issues

- [ ] No outdated packages with known exploits



---



### 🔍 Phase 5: General UI/UX & Performance

- [ ] Mobile hamburger menu on landing page opens/closes smoothly

- [ ] Buttons have hover/focus states

- [ ] Page load times acceptable; lazy loading works

- [ ] No broken links or 404s

- [ ] Console errors: zero (ignore expected React Router future flag warnings)

- [ ] Consistent behavior across Chrome, Firefox, Edge



---



### 📝 Phase 6: Documentation & Reporting

- [ ] Update `memorywork.md` with:

  - List of all fixes applied

  - Summary of verification results (✅/❌ for each item above)

  - Any remaining issues or limitations

  - Screenshots of key working features (optional)



---



### 🚨 Immediate Action Items (If Any Fails)

- [ ] If landing page blank – fix first

- [ ] If any video player feature fails – debug and correct

- [ ] If any admin upload leads to blank page – fix route/component

- [ ] If security vulnerability found – patch and retest



---



**Instructions:** After testing, replace each `[ ]` with `[✓]` for done, or `[✗]` for not done / failed. Add notes below any failed items to describe the issue. This list should be appended to your `memorywork.md` as part of the verification report.