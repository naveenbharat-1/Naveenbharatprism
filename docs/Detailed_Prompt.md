## 🔄 Logical Workflow Sequence for Project Implementation

Based on the provided task list and our extensive conversation history, I've reorganized the 13 points into a **logical, dependency‑aware sequence**. This ensures that foundational fixes (security, data integrity) are completed before feature enhancements, and that testing occurs after implementation. Each step builds on the previous one.

---

### 📅 Execution Order (Step‑by‑Step)

#### **Phase 1: Security & Infrastructure Hardening**
1. **Fix RLS Security Issues** (combines points 5 & 8)  
   - Run SQL migrations to remove permissive `USING(true)` policies on the `profiles` table for `INSERT/UPDATE/DELETE`.  
   - Add controlled read access policy for `profiles_public` (or a public view).  
   - *Why first?* This protects user data and ensures subsequent features respect access rules.

2. **Enable Leaked Password Protection** (point 12)  
   - In Supabase Dashboard → Authentication → Password Security, turn on **HaveIBeenPwned** integration.  
   - This blocks compromised passwords, enhancing login security immediately.

#### **Phase 2: Core Functionality Fixes**
3. **Fix Real Progress Tracking** (point 11)  
   - In `LessonView.tsx`, replace the hardcoded `completedLessons = 1` with a real query from the `user_progress` table (filtered by `user_id` and `course_id`).  
   - This ensures the sidebar progress bar shows accurate data for each student.

4. **Implement Video Player Polish Plan** (point 6)  
   - Watermark timing: hidden first 10 seconds, locked visible last 10 seconds.  
   - End screen suppression enhancement (ensure no YouTube suggestions).  
   - Fix progress bar flicker (make seeking instant and smooth).  
   - *Why now?* Progress tracking is fixed, so video player can rely on correct lesson data.

5. **Add Watermark Animations** (point 9)  
   - Subtle fade‑in animation when watermark first appears at 10 seconds.  
   - Pulsing border effect during the last 10 seconds to draw attention to Mahima Academy branding.  
   - These visual refinements build on the timing logic from step 4.

6. **Fix `manifest.json` Name** (part of point 10)  
   - Change the app name from any placeholder to **"Mahima Academy"** in the PWA manifest.  
   - Ensures the installed app displays the correct name.

#### **Phase 3: Admin & Upload Verification**
7. **Test Admin Upload Flow** (point 3)  
   - Log in as admin, select a course, drill into chapters, create a sub‑folder, and upload content (PDF, video).  
   - Verify that the upload does **not** lead to blank pages and that content appears correctly.  
   - *Why now?* Admin functionality should be validated after core backend fixes.

#### **Phase 4: Comprehensive Testing**
8. **Test Mobile Hamburger Menu** (point 1)  
   - Resize browser to small viewport; ensure menu opens/closes smoothly.

9. **Test Video Player End‑to‑End (First Pass)** (point 2)  
   - Play a video; verify watermark appears after 10 seconds, seek using progress bar, and check end screen suppression.  
   - This is a baseline test before final polish.

10. **Test Video Player with New Polish** (point 7)  
    - After implementing steps 4‑5, repeat the test: confirm watermark hides first 10s, locks last 10s, seek works, and no YouTube end screen.

11. **Test Student Panel End‑to‑End** (point 13)  
    - Log in as student `anujkumar75yadav@gmail.com`.  
    - Open a course, verify progress bar shows real data (from step 3).  
    - Play a video and confirm watermark timing (from step 4‑5).

#### **Phase 5: Finalization & Documentation**
12. **Update `memorywork.md`** (point 10)  
    - Document all changes: list modified files, SQL migrations, and a summary of fixes.  
    - Include the full audit checklist report (the to‑do list we just executed).

13. **Remix Project (Optional)** (point 4)  
    - If desired, create a copy of the project via Lovable's remix feature for backup or experimentation.

---

### ✅ Why This Order?
- **Security first** prevents data leaks and ensures all subsequent actions respect access rules.  
- **Progress tracking** is a data‑dependent feature; fixing it early avoids inconsistencies in student views.  
- **Video player enhancements** are then applied, building on stable data.  
- **Admin upload test** validates that content can be added correctly after backend fixes.  
- **Testing** is done iteratively, catching regressions early.  
- **Documentation** wraps up the process.

This sequence ensures a smooth, error‑free rollout of all improvements.