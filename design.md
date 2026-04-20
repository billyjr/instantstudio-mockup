# Instant Studio Product UI Guide

**Status:** Active Implementation  
**Owner:** Engineering + Design  
**Last Updated:** 2026-04-20

## Purpose

This document reflects the current product UI language implemented in this repository.

It is no longer only a baseline design-system note. It now describes the working patterns used by the Instant Studio product shell, the Image Anything workbench, the outputs gallery, and mobile modal behavior.

Build interfaces that feel:

- premium
- fast
- calm
- production-ready
- dense where useful
- brand-forward without being loud

## Current Design Direction

The current implementation leans more productized than the original draft system.

The intended experience is:

- A compact left navigation rail with an expandable and collapsible state
- A fixed-width creation workbench optimized for form input
- A flexible right output surface optimized for browsing media
- A stronger gallery/product-app feel than a neutral design-system demo

## Brand Identity

### Logo System

Approved forms in the current product shell:

- `brand-logo` for expanded navigation
- `brandmark` for collapsed navigation and compact surfaces

Current behavior:

- Expanded desktop sidebar shows the wordmark
- Collapsed desktop sidebar shows only the brandmark
- Mobile navigation drawer shows the expanded brand treatment

### Color Tokens

```css
:root {
  --color-brand-primary: #FF623D;
  --color-brand-secondary: #4A1114;
  --color-brand-accent: #D135FF;
  --color-ink: #2B2829;
  --color-ink-lite: #A09A9B;
  --color-paper: #F1EEE7;
  --color-paper-lite: #FAF8F4;
  --color-orange-50: #F7E9E3;
  --color-orange-150: #F7E2D4;
  --color-orange-250: #FFC7A8;
  --color-orange-300: #FF9771;
}
```

Usage notes:

- `brand-primary` drives the main CTA surface
- `brand-secondary` is used for active navigation, headings, and stronger emphasis
- `paper` and `paper-lite` define the overall workspace tone
- `ink` and `ink-lite` maintain the calm editorial contrast used across the product shell

## Typography

| Role | Typeface | Usage |
|---|---|---|
| Display | Hubot Sans Semi-Condensed | Product headlines, modal titles |
| Body | DM Sans | UI copy, labels, controls |
| Functional | DM Mono | Metadata, chips, micro labels |

Typography guidance:

- Display type is used sparingly and for hierarchy, not everywhere
- Functional type is reserved for metadata, status labels, and technical microcopy
- UI copy should remain clear and quiet rather than overly styled

## Layout System

### App Shell

The current shell is full-width and fills the viewport.

Current structure:

- Left Sidebar
- Center Workbench
- Right Outputs Panel

Current sizing behavior:

- Sidebar is fixed-width on desktop
- Workbench is fixed-width on desktop
- Outputs panel fills remaining horizontal space
- The overall shell is no longer constrained to a `1440–1600px` max width

### Current Desktop Width Targets

- Sidebar expanded: `240px`
- Sidebar collapsed: `52px`
- Workbench panel: `400px`
- Outputs panel: flexible remainder

### Mobile Shell Behavior

On mobile:

- The sidebar becomes a slide-in drawer
- The app switches between `Create` and `Outputs` using a top segmented control
- Heights should use `100dvh` as the preferred viewport unit with `100vh` fallback

## Spacing

Preferred spacing scale remains:

`4, 6, 8, 12, 16, 24, 32, 40, 64`

Current implementation note:

- Desktop spacing stays relatively calm
- Mobile spacing has been intentionally tightened in the workbench to preserve usable screen height for controls and the Generate CTA

## Surfaces And Depth

Preferred default ring treatment:

```css
box-shadow: 0 0 0 1px rgba(0,0,0,0.08);
```

Current depth model:

- Flat: paper backgrounds and quiet surfaces
- Ring: inputs, sidebar surfaces, lightweight cards
- Card: modal panels and gallery cards where clearer separation helps
- Immersive: black media-stage backgrounds for sample preview modals

Implementation note:

- The outputs gallery now uses real borders in some cases instead of only ring shadows
- This is acceptable in the current gallery product surface as long as borders stay light

## Navigation

### Sidebar

The sidebar is now a product control surface, not just a static navigation list.

Rules:

- Navigation labels show in expanded mode
- Labels hide in collapsed mode
- Collapsed navigation uses square icon buttons
- User metadata hides in collapsed mode and only the avatar remains
- The collapse/expand toggle swaps between left/right square icons instead of rotating a single icon

### Navigation Icons

The current implementation uses Flaticon UIcons Thin Rounded (`fi-tr-*`) icon font classes for product navigation and actions.

This replaces the older mixed SVG approach.

Guidance:

- Keep icon style consistent inside the product shell
- Prefer the `tr` icon family for sidebar and action controls
- Keep icon sizes restrained and aligned to a square visual box

## Workbench

The Image Anything workbench is intentionally compact and form-driven.

Current rules:

- Fixed width on desktop
- White surface against a paper-toned shell
- Inputs use clean borders, 8px-ish radius, and visible focus states
- Aspect Ratio and Resolution are stacked vertically and each fills full width
- The Generate action sits in a sticky footer region inside the workbench

### Primary Button

Current primary button guidance remains:

```css
background: var(--color-brand-primary);
color: var(--color-brand-secondary);
border-radius: 8px;
font-weight: 500;
```

### Inputs

Rules:

- clean white surface
- visible border
- visible focus state
- restrained radius
- avoid ornamental styling

## Outputs Panel

The outputs surface has evolved from a simple gallery into a media-browsing panel closer to a lightweight photo-management experience.

Current behavior:

- Uses justified rows rather than masonry columns
- Final row does not stretch to fill the entire width
- Cards preserve image ratio
- Hover reveals controls and metadata
- Clicking a sample opens a full preview modal

Design intent:

- Browsing should feel fast and visual
- Images should dominate the experience
- Metadata should appear only when useful
- The gallery can feel slightly more product-like than the neutral shell around it

## Modal Patterns

### Generation Dialog

Use for:

- confirmations
- queue summaries
- small informational flows

Style:

- centered card
- paper-toned gradient surface
- subtle borders
- concise metadata blocks

### Sample Preview Dialog

Desktop:

- black immersive image stage on the left
- fixed `350px` light metadata panel on the right

Mobile:

- full-screen media viewer
- top toolbar floating over the image
- bottom drawer for metadata
- drawer stays partially revealed by default and expands upward

## Mobile Implementation Guidance

Mobile behavior in this project is opinionated and should be preserved.

Rules:

- Prefer `100dvh` with `100vh` fallback for viewport-sized surfaces
- Respect `env(safe-area-inset-top)` and `env(safe-area-inset-bottom)`
- Avoid relying purely on desktop simulator behavior when validating sticky/footer layouts
- The Create tab should keep the Generate CTA visible without excessive bottom spacing
- The sample preview modal should visually anchor to the true device viewport, not a stale `100vh`

## Interaction

Current interaction principles:

- Hover should still be subtle
- Focus must remain visible and keyboard friendly
- Dense UI is acceptable if alignment remains precise
- Toggle and drawer behaviors should feel immediate rather than ornamental
- Motion should support clarity, not decoration

## Never Do

- random colors
- inconsistent icon families inside the same control surface
- heavy borders or loud shadows
- unreadable contrast
- oversized spacing that wastes vertical mobile space
- desktop-only viewport assumptions for mobile overlays or sticky footers

## Implementation Notes

Current implementation relies on:

- Tailwind utility classes in markup
- custom CSS for shell behavior, responsive layout, and modal patterns
- icon font classes from Flaticon Thin Rounded
- vanilla JS for gallery layout, sidebar state, and modal population

## Final Principle

If the interface feels sharper, more usable, more aligned, and more product-ready while still keeping the Instant Studio brand tone, it is probably right.
