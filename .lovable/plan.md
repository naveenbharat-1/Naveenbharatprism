

## Plan: Full Rebranding "Mahima Academy" → "Naveen Bharat" + Testing

### Scope

Global find-and-replace of "Mahima Academy" with "Naveen Bharat" across **30 source files**, plus updates to `index.html`, `manifest.json`, CSS comments, and test files. Video player polish and storage buckets are already complete from previous phases.

### Files to Modify (Complete List)

**Core Config & HTML:**
| File | Changes |
|------|---------|
| `index.html` | Title, meta tags, OG tags, twitter tags — all "Mahima" → "Naveen Bharat" |
| `public/manifest.json` | `name` → "Naveen Bharat", `short_name` → "NB" |

**Layout Components:**
| File | Changes |
|------|---------|
| `src/components/Layout/Header.tsx` | Logo alt text, brand name span |
| `src/components/Layout/Sidebar.tsx` | Brand name span |
| `src/components/Landing/Footer.tsx` | Brand name, alt text, copyright |
| `src/components/Landing/Hero.tsx` | Any brand references |

**Auth Pages:**
| File | Changes |
|------|---------|
| `src/pages/Login.tsx` | Logo alt, brand span, "Join Mahima Academy today" |
| `src/pages/Signup.tsx` | Logo alt, brand span, "Join Mahima Academy today" |
| `src/pages/AdminLogin.tsx` | Logo alt, brand span |
| `src/pages/AdminRegister.tsx` | Logo alt, brand span |
| `src/pages/ForgotPassword.tsx` | Logo alt, brand references |
| `src/pages/ResetPassword.tsx` | Logo alt, brand span |

**Landing & Dashboard:**
| File | Changes |
|------|---------|
| `src/pages/Index.tsx` | Default hero title, logo alt, brand span |
| `src/pages/BuyCourse.tsx` | `MERCHANT_NAME` constant |
| `src/pages/Dashboard.tsx` | Any brand references |

**Video Player Components (6 files):**
| File | Changes |
|------|---------|
| `src/components/video/MahimaGhostPlayer.tsx` | iframe title, watermark alt texts, watermark text spans, "MA" abbreviation → "NB" |
| `src/components/video/EndScreenOverlay.tsx` | Branding heading, alt text |
| `src/components/video/WhiteLabelVideoPlayer.tsx` | Comments, iframe title, watermark text |
| `src/components/video/ShareModal.tsx` | Share text, alt text |
| `src/components/video/GhostWatermarkPlayer.tsx` | Watermark text |
| `src/components/video/SecureVideoPlayer.tsx` | Watermark text |
| `src/components/video/PremiumVideoPlayer.tsx` | Watermark text |
| `src/components/video/PlyrPlayer.tsx` | iframe title |
| `src/components/video/MahimaPlayer.tsx` | JSDoc comments |
| `src/components/video/UnifiedVideoPlayer.tsx` | Watermark text |
| `src/components/video/PdfViewer.tsx` | Watermark text |

**Admin Pages:**
| File | Changes |
|------|---------|
| `src/pages/Admin.tsx` | Default watermark text, placeholder |
| `src/pages/AdminUpload.tsx` | Default watermark text, logo alt |

**Other:**
| File | Changes |
|------|---------|
| `src/components/lecture/LectureOverview.tsx` | Default description |
| `src/main.tsx` | Comment |
| `src/index.css` | CSS comments (non-functional but consistent) |
| `src/test/components/Login.test.tsx` | Test assertion for alt text |
| `supabase/functions/setup-admin/index.ts` | `full_name` value |
| `memorywork.md` | Document all changes |

**E2E test files** (comments only, low priority):
| File | Changes |
|------|---------|
| `e2e/admin.spec.ts` | Comment |
| `e2e/payment-flow.spec.ts` | Comment |

### What Will NOT Change
- File names (e.g., `MahimaGhostPlayer.tsx` stays as-is — renaming files risks breaking imports across the codebase)
- CSS class names (`.mahima-ghost-player`, `.mahima-watermark`, etc.) — these are internal identifiers, not user-visible
- Database table names or Supabase URLs
- Logo image files — the same logo assets will be used (user has not provided a new logo)

### Execution Order
1. Update `index.html` (title, meta, OG tags)
2. Update `public/manifest.json` (name, short_name)
3. Update all 30 source files in parallel batches (replace "Mahima Academy" → "Naveen Bharat")
4. Update `supabase/functions/setup-admin/index.ts`
5. Update test files
6. Update `memorywork.md` with full changelog

### Testing Note
After rebranding, the user should verify:
- Landing page shows "Naveen Bharat"
- Login/Signup pages show "Naveen Bharat"
- Video player watermark says "Naveen Bharat"
- PWA manifest shows correct name in DevTools
- All functionality remains intact

