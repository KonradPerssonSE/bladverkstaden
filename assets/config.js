// Bladverkstaden — config (safe defaults)
// Tips: peka orderEndpoint till en enkel webhook (Make/Zapier/Pipedream) eller en egen liten API-proxy (t.ex. Cloudflare Worker).
window.BV_CONFIG = {
  // Exempel: "https://your-webhook.example.com/bladverkstaden-order"
  orderEndpoint: "",

  // Fallback / mottagare (används även i menyn och mailto fallback)
  orderToEmail: "bladverkstaden@gmail.com",

  // Ämnesrad prefix
  orderSubjectPrefix: "Bladverkstaden — beställning/offert"
};