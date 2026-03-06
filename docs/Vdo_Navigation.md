## 🎯 Prompt: Implement Robust Tap-to-Toggle Controls for Video Player (Preserving All Previous Fixes)

### Objective
Enhance the video player's interaction logic to provide a seamless tap-to-toggle experience: a **single tap** anywhere on the video area (excluding the control buttons themselves) should **show all controls** if they are hidden, and **hide them** if they are visible. Additionally, the existing **3-second auto-hide** must remain functional, and the toggle must not interfere with other player behaviors (seeking, watermark timing, end screen suppression, etc.). All previously implemented fixes (watermark timing, progress bar stability, custom replay button, etc.) must be preserved and integrated.

---

### 📌 Background & Context
Over the course of many previous fixes, the video player has been enhanced with:
- Watermark (Mahima Academy logo + text) that:
  - Remains hidden for the first 10 seconds of playback.
  - Appears after 10 seconds and follows auto-hide (3 seconds).
  - Locks visible during the last 10 seconds of the video.
  - Covers YouTube infinity symbol and white label.
- Custom replay button that replaces YouTube's end screen.
- Progress bar that seeks accurately on click.
- Settings gear (⚙️) with speed menu (1x, 2x, 3x) and rotation icon (↻) for full‑screen rotate.
- Like, doubt, download, and exit buttons.
- Auto-hide of controls after 3 seconds of inactivity.

However, the **manual toggle behavior** (show/hide on tap) has been reported as inconsistent. This prompt aims to finalize it.

---

### 🔧 Detailed Requirements

#### 1. Tap-to-Toggle Logic
- **Single tap** on the **video area** (i.e., the `<div>` containing the video, but **not** on any control button) should:
  - If controls are currently hidden → make them visible.
  - If controls are currently visible → hide them.
- The tap must be a simple `click`/`touch` event; ignore double-tap (do not treat double-tap as two toggles; a double-tap should just be two single taps, but we may want to debounce? Actually, double-tap is a separate gesture; for now, treat each tap individually – that's acceptable).
- **Important**: Tapping on any control button (play, progress bar handle, settings gear, rotation icon, like, doubt, download, exit button, etc.) should **not** trigger the toggle. Those buttons should perform their own actions and leave the visibility state unchanged.

#### 2. Integration with Auto-Hide
- If controls are visible and there is **no user interaction** (no taps on video, no clicks on controls) for **3 seconds**, they should automatically hide.
- The 3-second timer must reset on any interaction (tap on video or click on a control).
- When auto-hide triggers, the controls fade out smoothly.

#### 3. Watermark Visibility Alignment
- The watermark is considered part of the controls overlay. Therefore:
  - When controls are hidden, the watermark must also be hidden (except during the last 10 seconds when it is locked visible – this overrides auto-hide).
  - When controls are shown, the watermark follows its own timing rules: it may be hidden during first 10 seconds, or visible otherwise.
- Ensure that the "lock visible during last 10 seconds" overrides both auto-hide and manual hide. In other words, during the last 10 seconds, the watermark should remain visible even if the user taps to hide controls, or if auto-hide would normally trigger.

#### 4. Interaction with Other Features
- The tap-to-toggle must not interfere with:
  - Progress bar seeking (clicking on the bar should seek, not toggle).
  - Play/pause button functionality.
  - Settings menu opening/closing.
  - Rotation button action.
  - Like/doubt/download actions.
  - Exit button navigation.
- Ensure that the overlay's visibility state does not reset unexpectedly (e.g., after seeking, the controls should stay in their current state unless the user taps or auto-hide triggers).

#### 5. Technical Implementation Notes
- Use a ref to track the visibility state and a timer for auto-hide.
- Attach a click/touch event listener to the video container (the outermost wrapper). Inside the handler, check if the event target is a control element or descendant of a control container. Use `event.target.closest('.control-class')` or a similar method.
- For auto-hide, set a timeout whenever controls become visible or when an interaction occurs; clear the previous timeout.
- Ensure that when the video ends, the controls (including the custom replay button) appear and stay visible (no auto-hide during replay button display). The watermark during the last 10 seconds should already be locked.

#### 6. Preserve All Previous Fixes
- Watermark timing (first 10s hidden, last 10s locked) must remain.
- Progress bar seeking must be accurate.
- YouTube end screen suppression and custom replay button must work.
- Settings and rotation icons must function.
- Like, doubt, download, exit must work.
- No regression in any previously implemented feature.

---

### 🧪 Testing Checklist (After Implementation)
Test with the student account (`anujkumar75yadav@gmail.com` / `12345678`) on any video:

- [ ] **Initial state**: Play video. For first 10 seconds, watermark hidden; controls may be visible or hidden depending on previous state.
- [ ] **Tap on video (background)** → controls appear (if hidden) or disappear (if visible). Verify.
- [ ] **Tap on play button** → toggles play/pause, controls remain visible (do not hide).
- [ ] **Tap on progress bar** → seeks, controls remain visible.
- [ ] **Tap on settings gear** → opens menu, controls remain visible.
- [ ] **Tap on rotation icon** → rotates, controls remain visible.
- [ ] **No interaction for 3 seconds** → controls auto-hide.
- [ ] During **last 10 seconds** of video, tap to hide controls – watermark should stay visible (locked). Tap to show – all controls appear.
- [ ] When video ends, custom replay button appears; tap on video background should toggle controls (but replay button should remain functional).
- [ ] Double-tap (fast two taps) – each tap toggles; that's acceptable but ensure no double-tap gesture conflict (YouTube's default double-tap to seek 10s is already removed per previous requests, so it's fine).
- [ ] Ensure no console errors.

---

### 📝 Documentation
Update `memorywork.md` with:
- Summary of the new tap-to-toggle logic.
- List of files modified (likely the video player component and any related CSS/JS).
- Confirmation that all previous fixes remain intact.

---

### 🔥 Final Note
This is the final piece to make the video player perfectly intuitive. Execute carefully, ensuring that the toggle logic feels natural and that no other functionality breaks. The user has invested a lot in previous fixes; respect and preserve them.