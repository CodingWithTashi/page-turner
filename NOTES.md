# Research Notes — PageTurner

## API Selection

Candidates evaluated:

| API | Verdict | Reason |
|---|---|---|
| OpenWeatherMap | Rejected | Requires geolocation permission; complex setup for a book portal |
| Dictionary API | Rejected | Less relevant — defines words, not useful for a reading community |
| API Ninjas Quotes | **Chosen** | Free tier, CORS-friendly, header-based auth, relevant to reading theme |

**Chosen endpoint:** `https://api.api-ninjas.com/v1/quotes?category=happiness`
**Response shape:** `[{ quote: "...", author: "...", category: "..." }]`
**Auth:** `X-Api-Key` request header

The quote widget includes an error fallback so the page never breaks if the
API key is missing or the request fails.

---

## Design Research

**Decisions:**
- Heading font: `Georgia, serif` (system — no external request, literary feel)
- Body font: `system-ui` (fast, OS-native, clean)
- Accent: `#C2410C` (burnt orange) — warm, editorial, avoids default blue-purple web palettes
- Background: `#FAFAF7` (warm off-white) — softer than pure white, easier on the eyes
- Surface: `#FFFFFF` — cards and form shells pop against the warm background

---

## CSS Architecture

- Single file (`css/style.css`) — appropriate scale for a 3-page static site
- CSS custom properties used for the entire colour, typography, radius, and shadow system
- Mobile-first: base styles target narrow viewports; `@media (min-width: ...)` enhances upward
- **Complex responsive component:** the genre filter bar on `library.html` undergoes
  a drastic layout change at `1024px`:
  - Mobile: horizontal-scroll pill bar (rounded buttons, `overflow-x: auto`)
  - Desktop: flat underline tab strip (`border-bottom` on active, no border-radius)
  This is handled entirely in CSS — zero JavaScript involved.

---

## JavaScript Architecture

Four small, focused files — one concern per file:

| File | Responsibility |
|---|---|
| `nav.js` | Sets `.active` on the current page's nav link using `pathname` |
| `widget.js` | Fetches quote from API, handles loading state and error fallback |
| `gallery.js` | Book data array, card template, dual-filter render logic |
| `form.js` | Per-field validation rules, error display/clear, submit handler |

**Dual-filter pattern in `gallery.js`:**
Two module-level variables (`activeGenre`, `searchQuery`) are updated independently
by their respective event listeners. A single `filterBooks()` function reads both
variables and applies them together with `Array.filter()` + a chained AND condition.
This keeps all render logic in one place and avoids duplication.

**No frameworks, no build tools, no third-party libraries used.**

---

## Git Commit Plan

| # | Branch | Message |
|---|---|---|
| 1 | `main` | `init: add project pitch and user persona to README` |
| 2 | `main` | `docs: add NOTES.md with API research and design decisions` |
| 3 | `feat/structure` | `feat: add base HTML boilerplate for all 3 pages` |
| 4 | `feat/styles` | `feat: add CSS variables, reset, typography, and base layout` |
| 5 | `feat/styles` | `feat: add responsive navbar with active state highlighting` |
| 6 | `feat/gallery` | `feat: add book data array and render cards to DOM` |
| 7 | `feat/gallery` | `feat: add real-time search and genre tab filter` |
| 8 | `feat/widget` | `feat: integrate API Ninjas quote widget with loading state and fallback` |
| 9 | `feat/form` | `feat: build community join form with all four fields` |
| 10 | `feat/form` | `feat: add custom JS validation with inline errors and success state` |
| 11 | `feat/polish` | `feat: add card hover animations and responsive breakpoint polish` |
| 12 | `main` | `chore: deploy to Netlify and update README with live URL` |

---

## Deployment Notes

- Platform: Netlify
- Build command: _(none — pure static site)_
- Publish directory: `/` (repo root)
- Add `API_KEY` value to `js/widget.js` before final deploy
- Test all three pages on mobile viewport (375px) before submitting
