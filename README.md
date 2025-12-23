# Bladverkstaden

En minimal, statisk webbplats för Bladverkstaden (Malmö). Byggd för snabbhet och enkelhet utan ramverk eller byggsteg.

> **English:** A minimal, static website for Bladverkstaden. Built for speed and simplicity with no frameworks or build steps.

## ✨ Features

- **No Frameworks:** Ren HTML, CSS och Vanilla JS. Inga `npm install` eller byggprocesser krävs.
- **Bilingual (SE/EN):** Fullt stöd för Svenska och Engelska med automatisk språkdetektering och speglad struktur (`/en/`).
- **Order System 2.0:**
    - **Multi-step:** Uppdelad i "Beställning" och "Leverans" för ökad tydlighet.
    - **Notepad UI:** Rent, avskalat gränssnitt för att snabbt mata in produkter.
    - **Persistence:** Innehållet sparas automatiskt i `localStorage` så att inget går förlorat om fliken stängs.
    - **Reveal Flow:** "Vidare"-knappen visar nästa steg istället för att ladda om sidan.
- **Mobile First:** Designad specifikt för mobila skärmar (max-width 767px layout).

## 📂 Struktur / Structure

```text
/
├── index.html            # Startsida (SE)
├── order.html            # Orderformulär (SE)
├── pages/                # Infosidor (Om oss, Historia, Policy) (SE)
├── en/                   # English version (mirrors root structure)
│   ├── index.html
│   ├── order.html
│   └── pages/
├── assets/
│   ├── styles.css        # All styling
│   ├── app.js            # Main logic (Nav, I18N, Order Form)
│   ├── config.js         # Configuration (Keys, Endpoints)
│   └── img/              # Images & SVG
│       └── social/       # Images for Social Grid
└── README.md
```

## 🛠️ Hur man ändrar / How to edit

### Byt bilder i "Instagram-väggen"
Lägg bilder i `assets/img/social/`. Uppdatera sedan `index.html` (och `en/index.html`) där sektionen "Vänner & kunder" finns. Byt ut placeholder-divarna mot `<img src="assets/img/social/DIN_BILD.jpg">`.

### Lägg till produkter i listan
Produkterna är definierade i `assets/app.js` under `I18N` objektet:
- **Svenska:** `I18N.sv.form.defaultProducts`
- **English:** `I18N.en.form.defaultProducts`

### Konfigurera Order-mail
Webbplatsen hanterar beställning på två sätt (inställning i `assets/app.js` via `BV_CONFIG`):
1.  **Mailto (Default):** Öppnar användarens mailklient med en förifylld text. Ingen server behövs.
2.  **API/Webhook:** Om en `orderEndpoint` anges i `config.js` (eller window-objektet) skickas datan som JSON dit.

## 🚀 Publicering / Deployment
Sajten är 100% statisk.
1.  Ladda upp filerna till GitHub / Netlify / Vercel / FTP.
2.  Klar.

För **GitHub Pages**:
- Gå till Settings -> Pages.
- Välj `main` branch och `/` root som source.
