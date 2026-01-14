# Bladverkstaden Agent Guidelines

This document provides instructions for AI agents and developers working on the **Bladverkstaden** repository.

## 1. Project Overview

Bladverkstaden is a **minimal static website** for a microgreens business in Malmö.

- **Philosophy:** "No Framework". Pure HTML/CSS/JS. Keep it simple, lightweight, and maintainable by anyone with basic web skills.
- **Architecture:** Static HTML files, shared CSS/JS in `assets/`, client-side logic only.
- **Deployment:** GitHub Pages.

## 2. Tech Stack

- **HTML5:** Semantic structure.
- **CSS3:** Vanilla CSS, CSS Variables (`:root`), Flexbox/Grid.
- **JavaScript:** Vanilla ES6+, no bundlers, no external dependencies (except Lucide icons via CDN).
- **Assets:** SVGs for graphics, WebP/JPG for photos.

## 3. Development Environment

Since there is no build system (npm/webpack), you can run the site directly.

### Running Locally

Use a simple HTTP server to serve the files locally (avoids CORS issues with modules/fetch).

```bash
# Python 3
python3 -m http.server 8000

# Open in browser
# http://localhost:8000
```

### Build Commands

**None.** There is no compile step.

- Do **not** try to run `npm install` or `npm build`.
- Do **not** add a `package.json` unless explicitly requested for a specific tool (e.g., Playwright).

### Linting & Formatting

- **Standard:** Use standard Prettier defaults if formatting is needed (2 spaces indent).
- **Linting:** rely on your internal knowledge of valid HTML/CSS/JS.

## 4. Testing

There are no automated tests.

- **Manual Verification:** Open the modified page in a browser. Check the console for errors.
- **Critical Flows to Test Manually:**
  1. **Navigation:** Menu opens/closes, links work.
  2. **Order Form:** Add items, change quantity, fill fields, "Review & Send" generates correct mailto link/payload.
  3. **Responsiveness:** Check mobile (<680px) and desktop layouts.
  4. **Language Switch:** Toggling between SV (default) and EN works and preserves path context if possible.

## 5. Code Style & Conventions

### General

- **Indentation:** 2 spaces.
- **Encoding:** UTF-8.
- **Comments:** Use sparingly. If needed: Explain _why_, not _what_. Use `// --- Section ---` to divide large files.

### HTML (`.html`)

- **Structure:** `<!doctype html>`, semantic tags (`header`, `main`, `footer`, `section`, `article`).
- **Data Attributes:** Use `data-` attributes for JS hooks (e.g., `data-page="home"`, `data-root="../"`).
- **Classes:** Use utility classes (`grid`, `two`, `panel`, `paper`) combined with semantic classes.

### CSS (`assets/styles.css`)

- **Mobile-First:** Write all styles for mobile first, make sure they work with at least a 390px wide screen, respect the narrow viewport on mobile and don't add extra horizontal paddings and margins to create cards/sections, instead use white space to divide sections. This site focuses on mobile resolutions from 390px to 679px ONLY, for any desktop overrides as sparingly exception use `@media (min-width: 680px)`.
- **Variables:** Use `--camelCase` variables defined in `:root` (e.g., `--ink`, `--bg`, `--gap`).
- **Naming:** Mixed convention exists, but prefer **camelCase** for component classes (`menuOverlay`, `navDesktop`) and **kebab-case** for modifiers/utilities (`input-error`, `btn`).
- **Reset:** Minimal reset included at the top of the file.

### JavaScript (`assets/app.js`)

- **Encapsulation:** Wrap code in an IIFE to avoid polluting global scope.
  ```javascript
  (function () {
    // code here
  })();
  ```
- **Naming:** `camelCase` for variables and functions.
- **Selectors:** Use `document.getElementById` for specific elements, `querySelector` for classes.
- **State:** Use `localStorage` for persisting form state (`bv_order_state`).
- **I18N:** Store translations in the `I18N` object within the file.
- **DOM:** Use `document.createElement('template')` helper (function `el(html)`) for creating complex nodes from strings.

### File Structure

- `index.html` (SV Home)
- `order.html` (SV Order)
- `pages/*.html` (SV Content pages)
- `en/*.html` (EN Home & mirrored pages)
- `assets/`
  - `styles.css` (Global styles)
  - `app.js` (Global logic)
  - `config.js` (Environment config)
  - `img/` (Images)

## 6. Common Tasks

### Adding a New Page

1. Duplicate a simple existing page (e.g., `pages/policy.html`).
2. Update `<title>`, `<meta name="description">`, and `data-page` attribute on `<body>`.
3. Ensure `data-root` is correct (`""` for root, `"../"` for `pages/`).
4. Update navigation in `assets/app.js` (`I18N` object) if it needs to appear in the menu.

### Updating the Order Form

1. Edit `assets/app.js`.
2. Update `TXT.form.defaultProducts` for product list changes.
3. Update `collectItems()` or `buildPlainText()` if data structure changes.

## 7. Rules & Safety

- **No breaking changes:** Ensure the site remains usable without JS (content should be visible, though interactive parts like the menu might degrade).
- **Browser Support:** Target modern browsers (Chrome latest).
- **Dependencies:** **DO NOT** add React, Vue, jQuery, or Bootstrap. Keep it vanilla.
