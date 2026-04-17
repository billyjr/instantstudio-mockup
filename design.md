# Instant Studio Design System

**Status:** Draft  
**Owner:** Engineering + Design  
**Last Updated:** 2026-04-16

## Purpose

This document defines the official front-end design system for Instant Studio.

Build products that feel premium, fast, calm, clear, and consistent.

## Core Design Philosophy

Every Instant Studio interface should feel:

- Precise
- Premium
- Calm
- Fast
- Creative
- Product-grade
- Minimal, but not sterile
- Branded, but not loud

Design should communicate confidence through restraint.

## Brand Identity

### Logo System

Allowed logo forms only:

- `brand-logo`
- `brandmark`

Use brand-logo in navigation and product shells. Use brandmark for favicon or tight spaces.

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
}
```

## Typography

| Role | Typeface | Usage |
|---|---|---|
| Display | Hubot Sans Semi-Condensed | Headlines |
| Body | DM Sans | UI text |
| Functional | DM Mono | Labels / metadata |

## Layout System

Use intentional widths:
- marketing: 1200px
- product: 1440–1600px

Spacing scale:
`4, 6, 8, 12, 16, 24, 32, 40, 64`

## Surface & Depth

Prefer soft ring borders:

```css
box-shadow: 0 0 0 1px rgba(0,0,0,0.08);
```

Levels:
- Flat
- Ring
- Card
- Feature Panel

## Components

### Primary Button

```css
background: var(--color-brand-primary);
color: var(--color-brand-secondary);
border-radius: 8px;
font-weight: 500;
```

### Inputs

- radius 8px
- clean surface
- visible focus state

## Product Shell

Default app shell:
- Left Sidebar
- Center Workbench
- Right Output Area

## Interaction

Hover should be subtle.  
Focus should always be visible.  
Loading should be calm.

## Never Do

- random colors
- unapproved fonts
- logo misuse
- heavy borders
- excessive shadows
- inconsistent spacing
- unreadable contrast

## Rails + Tailwind Guidance

Recommended partials:

- `app/views/shared/_sidebar.html.erb`
- `app/views/shared/_workbench.html.erb`
- `app/views/shared/_gallery.html.erb`

## Final Principle

If it feels clearer, calmer, sharper, and easier to use, it is probably right.
