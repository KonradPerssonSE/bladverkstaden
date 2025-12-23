# Bladverkstaden (static site)

Minimal statisk sajt (no framework, no build): ren HTML/CSS/vanilla JS.

## Struktur

- `index.html` — startsida
- `order.html` — beställnings-/offertformulär
- `pages/` — statiska infosidor (om oss, historia, policy)
- `assets/styles.css` — gemensam styling
- `assets/app.js` — gemensam navigation + orderform-logik
- `assets/config.js` — enkel konfig (endpoint, mottagar-mail)

## Publicera på GitHub Pages

1. Lägg filerna i ett repo.
2. Settings → Pages → Deploy from a branch (main / root).
3. Klart.

## Orderform: hur skickas beställningen?

**Default:** Om `orderEndpoint` är tomt öppnas ett förifyllt `mailto:` till `orderToEmail`.

**Rekommenderat:** Sätt `orderEndpoint` till en webhook som skickar mail åt er.

Exempel-tjänster (enklast först):
- Make.com / Zapier / Pipedream webhook → skicka mail
- Typeform (om ni vill gå den vägen) → ersätt order.html med inbäddning eller webhook
- Brevo (via en liten serverless proxy, eftersom API-nyckel inte ska ligga i frontend)

Payload som skickas är JSON och innehåller:
- kundinfo
- leveransinfo
- lista (items)
- notes
