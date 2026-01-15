# Bladverkstaden

A minimal, static website for Bladverkstaden (Malmö). Built for speed, simplicity, and ease of maintenance with **no frameworks** or build steps.

## ✨ Features

- **No Frameworks:** Pure HTML5, CSS3, and Vanilla JS. No `npm install` or build processes required.
- **Design System V3:** A custom "Paper & Ink" aesthetic featuring:
  - **Typography:** Berkshire Swash (Display), Nunito (UI), Montserrat (Body), IBM Plex Mono (Data).
  - **Palette:** Floral White, Pitch Black, and organic accents (Lawngreen, Yellow).
  - **Mobile-First:** Strictly optimized for mobile screens (max-width 480px layout).
- **Order System:**
  - **Multi-step Flow:** Split into "Order" and "Delivery" details.
  - **Notepad UI:** A stripped-back interface for quickly adding products.
  - **Persistence:** Form data is automatically saved to `localStorage`.
  - **Reveal Flow:** Seamless step transitions without page reloads.
- **Bilingual (SE/EN):** Support for Swedish and English (currently SV only live for v1.0).

## 📂 Structure

```text
/
├── index.html            # Home (SV) - Currently live
├── order.html            # Order Form (SV) - Currently live
├── pages/                # Content pages (Hidden for v1.0)
├── en/                   # English version (Hidden for v1.0)
├── assets/
│   ├── styles.css        # Global CSS (Design System V3)
│   ├── app.js            # Main logic (Nav, I18N, Order Form)
│   ├── config.js         # Configuration (Keys, Endpoints)
│   └── img/              # Images & SVG
└── README.md
```

## 🛠️ How to Edit

### Managing Content
- **Images:** Add social media images to `assets/img/social/` and update `index.html`.
- **Products:** Edit the product list in `assets/app.js` under `I18N.sv.form.defaultProducts`.

### Order Configuration
The site handles orders in two ways (configured in `assets/app.js` via `BV_CONFIG`):
1.  **Mailto (Default):** Opens the user's email client with pre-filled text. No server required.
2.  **API/Webhook:** If an `orderEndpoint` is set in `config.js`, data is sent as JSON via POST.

## 🚀 Deployment

The site is 100% static and hosted on **GitHub Pages**.
- **Source:** `main` branch, `/` root.
- **Domain:** [bladverkstaden.se](https://bladverkstaden.se)

## 🗺️ Roadmap

### v1.0 Launch (Current Status)
- [x] Initial Release with Minimal Scope (`index.html` & `order.html`)
- [x] DNS Setup pointing to GitHub Pages
- [x] **Visual Overhaul (v1.1):** Implemented Design System V3 (New Fonts, Colors, Layout)

### Upcoming Milestones
- [ ] **Content Expansion (v1.5):**
    - Unhide sections: "What is Microgreens", "Cultivation", "Friends & Customers".
    - Update text and images for restored sections.
    - Re-enable Menu and Footer navigation.
- [ ] **Order Form Refinement:** Minor updates based on initial usage.
- [ ] **English Launch:** Finalize and publish the English version (`/en/`).
- [ ] **v2.0 Release:** Full site launch with all pages (About, History, Policy) active.
