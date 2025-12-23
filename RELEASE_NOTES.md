# Release Notes — Bladverkstaden v1.0

## 🚀 Overview
This release marks the completion of the "Phase 3" overhaul. The site is now a fully functional, bilingual (Swedish/English) static web application with a robust order system and a refined "Brutalist / No-Nonsense" aesthetic.

## ✨ Key Features

### 1. New Order System
-   **Multi-Step Flow:** A seamless "Reveal" interface splits the order process into **Step 1 (Order)** and **Step 2 (Delivery)** without page reloads.
-   **Smart Persistence:** Form data is saved to `localStorage` automatically. Users can browse away or close the tab and return to their draft.
-   **Notepad UI:** A custom, stripped-back interaction design for adding products that mimics a chef's handwritten prep list.
-   **Smart Logic:**
    -   Hides "Invoice Details" for Private customers.
    -   Validates fields before revealing the next step.
    -   Supports `mailto:` fallback for server-less operation.

### 2. Internationalization (i18n)
-   **Full English Support:** Complete mirror of the site structure under `/en/`.
-   **Auto-Detection:** Smart language switching in the header/footer that keeps you on the equivalent page (e.g., `sv/pages/about.html` <-> `en/pages/about.html`).

### 3. Design Overhaul
-   **Mobile-First:** Strict mobile layout (max-width 767px) for an app-like feel on all devices.
-   **Typography:** Prominent **Nunito** headers and **IBM Plex Mono** details.
-   **Visuals:**
    -   Removal of standard borders in favor of whitespace (The "Paper" metaphor).
    -   SVG Logos for crisp rendering.
    -   "Ghost" and "Bold" button hierarchy.

### 4. Content
-   **Pages:** Home, Order, Microgreens (Article), About, History, Policy.
-   **Social Wall:** Instagram-style grid on the homepage (ready for images).

---

## 🛠 Handover Notes
There are a few content tasks remaining for the site owner:

1.  **Social Images:** Upload real photos to `assets/img/social/`. The filename doesn't matter, but you need to update the HTML in `index.html` (lines ~180) to point to them instead of the current placeholder `div`s.
2.  **About/History/Policy:** The text in `pages/history.html` and `pages/policy.html` (and their English counterparts) contains placeholders (e.g., "Insert real text here"). These should be updated with the actual company story.

## 📦 Deployment
The site is built as purely static files.
-   **Push to main:** Auto-deploys via GitHub Pages (if configured).
-   **No Build Step:** No NPM, no Webpack, no build script required. Just edit and save.
