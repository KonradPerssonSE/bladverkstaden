# Project Context

## Overview
Bladverkstaden is a minimal static website built for simplicity and ease of maintenance. It serves as an informative site and ordering platform, utilizing standard web technologies without the need for complex build tools or frameworks.

## Tech Stack & Conventions
- **Structure:** Static HTML files (`index.html`, `order.html`, etc.).
- **Styling:** Vanilla CSS located in `assets/styles.css`.
- **Logic:** Vanilla JavaScript in `assets/app.js` handles navigation and form logic.
- **Config:** `assets/config.js` for basic settings like API endpoints and email addresses.
- **Deployment:** designed for GitHub Pages (or any static host).

## Development History
- **Initial Setup:** Created as a pure static site because the author like it so, plain by the book HTML and utilizing web API's, Bleeding edge CSS and vanilla JS.
- **Order System:** Implemented a flexible order form that supports both simple `mailto:` links and JSON payloads to a webhook (e.g., Make.com, Zapier).

## Architecture Decisions
- **No Framework:** React/Vue/Angular were avoided to ensure the site remains lightweight and editable by anyone with basic HTML knowledge.
- **Client-side Logic:** All dynamic behavior (forms, mobile menu) is handled in the browser.
- **Order Handling:** The order form gathers data into a JSON object. If an `orderEndpoint` is configured, it POSTs date there; otherwise, it falls back to a formatted email client link.

## Current Status & Next Steps
- **Active Tasks:** [Insert current focus here]
- **Known Issues:** [Insert any known bugs or limitations here]
