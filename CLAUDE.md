@AGENTS.md

# CLAUDE.md — KashKick OTT Prototype

## Project Purpose
Pixel-accurate UX research prototype for KashKick's OTT Game Wall redesign. Used for moderated user testing via Playbook UX with 8–10 participants (mix of KashKick power users and new users). A moderator handles all scoring, ratings, and note-taking. The prototype itself has no scoring or rating components of any kind — it only needs to look and feel like a real app.

## Stack
- Framework: Next.js 14 (App Router)
- Styling: Tailwind CSS
- Language: TypeScript
- Hosting: Vercel

## Viewport
- Base breakpoint: 390px mobile-first — the only breakpoint that matters right now
- Never stretch layouts to fill desktop width
- Use Tailwind base classes only — no md: or lg: prefixes unless explicitly asked

## Routes

### /game-wall — Version A (OTT Layout)
Covers Tasks 2, 3, 4, and 5 in the Playbook study script:
- Task 2: Participants react to category section titles
- Task 3: First impression — participants describe what they see and scroll freely
- Task 4: Game selection — participants find and select a game
- Task 5: Progress check — participants find where they would track a game they started

### /version-b — Version B (Comparison Layout)
Covers Tasks 6 and 7 in the Playbook study script:
- Task 6: First impression and comparison with Version A
- Task 7: Participants find their previously selected game in this version

## Playbook URL Mapping
Tasks 2, 3, 4, 5 → your-url.vercel.app/game-wall
Tasks 6, 7       → your-url.vercel.app/version-b

## Component Rules
- Horizontal scroll rows: overflow-x auto, scroll-snap-type x mandatory on the row, scroll-snap-align start on each card
- Touch targets: minimum 44x44px on all interactive elements
- No scoring UI, rating scales, or feedback components of any kind
- No placeholder or lorem ipsum — all text must match Figma exactly
- No loading states, skeletons, or error states unless they appear in the Figma
- Do not add any UI that is not present in the Figma designs

## File Structure
app/
  game-wall/page.tsx    — Version A, Tasks 2 3 4 5
  version-b/page.tsx    — Version B, Tasks 6 7
  layout.tsx            — Root layout
CLAUDE.md               — This file

## Dev Badges
Add during development, remove before study goes live:
- /game-wall → small green badge top-right corner: "Version A"
- /version-b → small green badge top-right corner: "Version B"

## What Claude Code Should Always Do
- Match Figma frames exactly — spacing, font sizes, colors, border radius, everything
- Keep all layouts at 390px base width
- Use Tailwind utility classes only — no custom CSS unless Tailwind cannot achieve it
- Never add features, interactions, or content not present in the Figma
- Never add scoring, rating, or feedback UI under any circumstance
