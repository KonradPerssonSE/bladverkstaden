/* Bladverkstaden — shared vanilla JS */
(function () {
  const htmlEl = document.documentElement;
  const root = htmlEl.dataset.root || "";
  const page = document.body.dataset.page || "";
  const lang = htmlEl.lang || "sv"; // 'sv' or 'en'

  // --- I18N DATA ---
  const I18N = {
    sv: {
      nav: [
        /* Removed Home/Microgreens from menu per request */
        { id: "order", label: "Beställ", href: root + "order.html" },
        { id: "about", label: "Om oss", href: root + "pages/about.html" },
        { id: "history", label: "Historia", href: root + "pages/history.html" },
        { id: "policy", label: "Policy", href: root + "pages/policy.html" }
      ],
      ui: {
        menu: "MENY",
        close: "STÄNG",
        contact: "KONTAKT",
        contactInfo: "KONTAKT & INFO",
        footerNote: "Den här sajten är byggd som statiska sidor (HTML/CSS/JS) – enkel att expandera.",
        copyright: "© Bladverkstaden",
        langSwitchLabel: "Switch to English",
        langSwitchUrl: root + "en/index.html",
        langSwitchText: "EN",
        next: "VIDARE",
        back: "TILLBAKA"
      },
      form: {
        removeRow: "X", // Minimal delete
        product: "Produkt",
        qty: "Antal",
        unit: "Enhet",
        lineNote: "Notering...",
        statusError: "Kontrollera att alla obligatoriska fält (*) är ifyllda.",
        statusOk: "Tack! Vi har tagit emot din beställning/offertförfrågan. Vi återkommer så snart vi kan.",
        statusMail: "Din e-postklient öppnas med ett förifyllt beställningsmail.",
        statusFail: "Kunde inte skicka.",
        units: ["Låda"], // Hardcoded for now
        defaultProducts: ["Rädisa", "Broccoli", "Rödkål", "Koriander", "Senap", "Mizuna", "Kinesisk gräslök", "Mix (blandat)", "Annat"]
      }
    },
    en: {
      nav: [
        /* Removed Home/Microgreens from menu per request */
        { id: "order", label: "Order", href: root + "en/order.html" },
        { id: "about", label: "About", href: root + "en/pages/about.html" },
        { id: "history", label: "History", href: root + "en/pages/history.html" },
        { id: "policy", label: "Policy", href: root + "en/pages/policy.html" }
      ],
      ui: {
        menu: "MENU",
        close: "CLOSE",
        contact: "CONTACT",
        contactInfo: "CONTACT & INFO",
        footerNote: "This site is built with static pages (HTML/CSS/JS) – simple to expand.",
        copyright: "© Bladverkstaden",
        langSwitchLabel: "Byt till Svenska",
        langSwitchUrl: root + "../index.html",
        langSwitchText: "SV",
        next: "PROCEED",
        back: "BACK"
      },
      form: {
        removeRow: "X",
        product: "Product",
        qty: "Qty",
        unit: "Unit",
        lineNote: "Note...",
        statusError: "Please check that all required fields (*) are filled.",
        statusOk: "Thanks! We received your order/request. We will get back to you soon.",
        statusMail: "Your email client will open with a pre-filled draft.",
        statusFail: "Could not send.",
        units: ["Box"],
        defaultProducts: ["Radish", "Broccoli", "Red Cabbage", "Cilantro", "Mustard", "Mizuna", "Chinese Chives", "Mix", "Other"]
      }
    }
  };

  function getSwitchUrl() {
    const currentPath = window.location.pathname;
    let filename = currentPath.split("/").pop() || "index.html";
    if (currentPath.endsWith("/")) filename = "index.html";

    if (lang === "en") {
      if (currentPath.includes("/pages/")) return root + "../pages/" + filename;
      return root + filename;
    } else {
      if (currentPath.includes("/pages/")) return root + "../en/pages/" + filename;
      return root + "en/" + filename;
    }
  }

  const TXT = I18N[lang] || I18N.sv;
  TXT.ui.langSwitchUrl = getSwitchUrl();

  function el(html) {
    const t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  function setAriaCurrent(container) {
    container.querySelectorAll("a[data-nav-id]").forEach(a => {
      if (a.dataset.navId === page) {
        a.setAttribute("aria-current", "page");
      } else {
        a.removeAttribute("aria-current");
      }
    });
  }

  // Header & Menu logic
  const header = document.getElementById("siteHeader");
  if (header) {
    header.appendChild(el(`
      <div class="header" role="banner">
        <a href="${TXT.nav[0].href.replace('order.html', 'index.html')}" class="brand" style="text-decoration:none">
          <div class="mark" aria-hidden="true"><img src="${root}assets/Bladverkstaden-Flower.svg" alt="" style="display:block; width:100%; height:auto;"></div>
          <div class="name">Bladverkstaden</div>
        </a>
        <nav class="navDesktop" aria-label="Menu">
          ${TXT.nav.map(n => `<a data-nav-id="${n.id}" href="${n.href}">${n.label}</a>`).join("")}
          <a href="${TXT.ui.langSwitchUrl}" class="mono" style="margin-left:8px; font-size:14px; border-bottom:1px dashed currentColor" aria-label="${TXT.ui.langSwitchLabel}">${TXT.ui.langSwitchText}</a>
        </nav>
        <button class="menuBtn" id="menuOpen" type="button">☰ ${TXT.ui.menu}</button>
      </div>
    `));
    setAriaCurrent(header);
  }

  const overlay = document.getElementById("menuOverlay");
  if (overlay) {
    overlay.appendChild(el(`
      <div class="menuCard" role="dialog" aria-modal="true" aria-label="Meny">
        <div class="menuTop">
          <div class="brand">
            <div class="mark" aria-hidden="true"><img src="${root}assets/Bladverkstaden-Flower.svg" alt="" style="display:block; width:100%; height:auto;"></div>
            <div class="name">Bladverkstaden</div>
          </div>
          <button class="menuClose" id="menuClose" type="button">✕ ${TXT.ui.close}</button>
        </div>
        <div class="menuLinks">
          ${TXT.nav.map(n => `<a class="btn secondary" data-nav-id="${n.id}" href="${n.href}">${n.label}</a>`).join("")}
          <a class="btn secondary" href="${TXT.ui.langSwitchUrl}" style="margin-top:10px; border:1px dashed var(--ink)">${TXT.ui.langSwitchText} — ${TXT.ui.langSwitchLabel}</a>
        </div>
        <div class="panel paper mono meta" style="margin-top:auto">
          <div><b>${TXT.ui.contact}:</b> <a href="mailto:bladverkstaden@gmail.com">bladverkstaden@gmail.com</a></div>
          <div><b>Telefon:</b> <a href="tel:+46767751826">076 775 18 26</a></div>
          <div><b>Adress:</b> Augustenborgsgatan 18, Malmö</div>
        </div>
      </div>
    `));
    const openBtn = document.getElementById("menuOpen");
    const closeBtn = document.getElementById("menuClose");

    openBtn?.addEventListener("click", () => {
      document.body.dataset.menu = "open";
      closeBtn?.focus();
    });
    closeBtn?.addEventListener("click", () => {
      delete document.body.dataset.menu;
      openBtn?.focus();
    });
    setAriaCurrent(overlay);
  }

  // Footer
  const footer = document.getElementById("siteFooter");
  if (footer) {
    footer.appendChild(el(`
      <div class="footer">
        <div class="grid two">
          <div class="panel">
            <div class="mono meta" style="margin-bottom:12px; font-weight:800">${TXT.ui.menu}</div>
            <nav class="footerNav">
              ${TXT.nav.map(n => `<a href="${n.href}" style="display:block; text-decoration:none; font-weight:600; margin-bottom:8px">${n.label}</a>`).join("")}
            </nav>
          </div>
          <div class="panel paper">
             <div style="margin-bottom:12px;"><img src="${root}assets/Bladverkstaden-Huset.svg" alt="" style="width:40px; height:auto; display:block"></div>
            <div class="mono meta" style="margin-bottom:12px; font-weight:800">${TXT.ui.contactInfo}</div>
            <div class="mono small">
              <a href="mailto:bladverkstaden@gmail.com">bladverkstaden@gmail.com</a><br>
              <a href="tel:+46767751826">076 775 18 26</a><br>Augustenborgsgatan 18, Malmö
            </div>
            <div style="height:14px"></div>
            <p class="mono meta">${TXT.ui.copyright} ${(new Date()).getFullYear()}</p>
          </div>
        </div>
      </div>
    `));
  }

  // Order form logic
  const form = document.getElementById("orderForm");
  if (form) {
    const items = document.getElementById("orderItems");
    const addBtn = document.getElementById("addItem");
    const status = document.getElementById("orderStatus");

    // Form steps
    const step1 = document.getElementById("step1");
    const step2 = document.getElementById("step2");
    const btnNext = document.getElementById("btnNext");
    const btnBack = document.getElementById("btnBack");

    // Fields logic
    const customerType = document.getElementById("customerType");
    const invoiceDetails = document.getElementById("invoiceDetails");

    const PRODUCTS = TXT.form.defaultProducts;

    // --- State Persistence ---
    function saveState() {
      const data = {
        step: step2 && !step2.hidden ? 2 : 1,
        fields: {},
        items: []
      };
      // Save basic inputs
      const formEls = form.elements;
      for (let i = 0; i < formEls.length; i++) {
        const field = formEls[i];
        if (field.name && field.type !== "hidden" && field.type !== "submit" && field.type !== "button") {
          data.fields[field.name] = field.value;
        }
      }
      // Save items
      const itemRows = items.querySelectorAll(".itemRow");
      itemRows.forEach(row => {
        data.items.push({
          product: row.querySelector('[name="product"]').value,
          qty: row.querySelector('[name="qty"]').value,
          lineNote: row.querySelector('[name="lineNote"]').value
        });
      });
      localStorage.setItem("bv_order_state", JSON.stringify(data));
    }

    function loadState() {
      const saved = localStorage.getItem("bv_order_state");
      if (!saved) return;
      try {
        const data = JSON.parse(saved);

        // Restore fields
        for (const [name, val] of Object.entries(data.fields)) {
          const f = form.elements[name];
          if (f) f.value = val;
        }
        // Restore items
        items.innerHTML = "";
        if (data.items && data.items.length > 0) {
          data.items.forEach(it => addRow(it));
        } else {
          addRow();
        }

        // Restore step
        if (data.step === 2) {
          goToStep2();
        }
        checkVisibility();
      } catch (e) {
        console.warn("Could not load state", e);
        addRow();
      }
    }

    function clearState() {
      localStorage.removeItem("bv_order_state");
    }

    form.addEventListener("input", saveState);

    // --- Item Logic (Notepad Style) ---
    function itemRow(data = {}) {
      const opts = PRODUCTS.map(p => `<option value="${p}" ${data.product === p ? "selected" : ""}>${p}</option>`).join("");
      return el(`
        <div class="itemRow notepad">
          <div style="display:grid; grid-template-columns: 2fr 1fr 30px; gap:8px; align-items:center;">
             <select name="product" aria-label="${TXT.form.product}">${opts}</select>
             <input name="qty" type="number" placeholder="#" value="${data.qty || ""}" aria-label="${TXT.form.qty}" style="text-align:center" />
             <button class="btn secondary inline mono" type="button" data-remove style="padding:0; height:40px; border:none; color:red; font-size:20px;">×</button>
          </div>
          <div style="margin-top:6px;">
             <input name="lineNote" placeholder="${TXT.form.lineNote}" value="${data.lineNote || ""}" class="small" style="border:none; border-bottom:1px dashed #ccc; padding:4px 0; border-radius:0;" />
          </div>
        </div>
      `);
    }

    function addRow(data) {
      const row = itemRow(data);
      row.querySelector("[data-remove]").addEventListener("click", () => {
        row.remove();
        saveState();
      });
      items.appendChild(row);
    }

    addBtn?.addEventListener("click", () => { addRow(); saveState(); });


    // --- Steps Logic ---
    function checkVisibility() {
      // Show Invoice details if NOT Private
      if (customerType.value.toLowerCase().includes("privat")) {
        invoiceDetails.hidden = true;
      } else {
        invoiceDetails.hidden = false;
      }
    }

    customerType?.addEventListener("change", () => {
      checkVisibility();
      saveState();
    });

    function goToStep2() {
      // Validate Step 1
      const req = step1.querySelectorAll("[required]");
      let valid = true;
      req.forEach(r => {
        if (!r.value) { r.style.borderColor = "red"; valid = false; }
        else r.style.borderColor = "";
      });

      // Also check at least 1 item
      if (items.children.length === 0) {
        setStatus("!", TXT.form.statusError);
        return;
      }

      if (valid) {
        // REVEAL LOGIC: Keep Step 1, Show Step 2, Hide "Next" button
        step2.hidden = false;
        status.hidden = true;
        if (btnNext) btnNext.hidden = true;

        // Actually, let's just scroll to step 2
        step2.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        setStatus("!", TXT.form.statusError);
      }
    }

    // No goToStep1 needed for Reveal logic (Step 1 is always there)

    btnNext?.addEventListener("click", goToStep2);
    // btnBack?.addEventListener("click", goToStep1);


    // --- Submit Logic ---
    function getValue(name) { return (form.elements[name]?.value || "").trim(); }

    function collectItems() {
      const out = [];
      items.querySelectorAll(".itemRow").forEach(r => {
        const product = r.querySelector('select[name="product"]').value;
        const qty = (r.querySelector('input[name="qty"]').value || "").trim();
        const lineNote = (r.querySelector('input[name="lineNote"]').value || "").trim();
        if (qty) {
          out.push({ product, qty, unit: "Box", lineNote });
        }
      });
      return out;
    }

    function setStatus(kind, msg) {
      status.hidden = false;
      status.innerHTML = `<div class="badge mono">${kind.toUpperCase()}</div><div style="height:10px"></div><div>${msg}</div>`;
      status.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function buildPlainText(payload) {
      const lines = ["ORDER (" + lang.toUpperCase() + ")", ""];
      lines.push(`Who: ${payload.firstName} ${payload.lastName} (${payload.customerType})`);
      lines.push(`Email: ${payload.email}`);
      lines.push(`Phone: ${payload.phone}`);
      lines.push("");
      if (payload.company) lines.push(`Company: ${payload.company} (Org: ${payload.orgNr})`);
      if (payload.invoiceEmail) lines.push(`Invoice Email: ${payload.invoiceEmail}`);
      lines.push("");
      lines.push("ITEMS:");
      payload.items.forEach(it => lines.push(`- ${it.qty} x ${it.product} ${it.lineNote ? "(" + it.lineNote + ")" : ""}`));
      lines.push("");
      lines.push(`Delivery: ${payload.deliveryAddress} (${payload.deliveryWhen})`);
      if (payload.notes) lines.push("Notes:\n" + payload.notes);
      return lines.join("\n");
    }

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const payload = {
        lang,
        customerType: getValue("customerType"),
        firstName: getValue("firstName"),
        lastName: getValue("lastName"),
        email: getValue("email"),
        phone: getValue("phone"),
        company: getValue("company"),
        orgNr: getValue("orgNr"),
        invoiceEmail: getValue("invoiceEmail"),
        deliveryAddress: getValue("deliveryAddress"),
        deliveryWhen: getValue("deliveryWhen"),
        recurring: getValue("recurring"),
        items: collectItems(),
        notes: getValue("notes"),
        sentAt: new Date().toISOString()
      };

      if (payload.items.length === 0) {
        setStatus("!", "List is empty.");
        return;
      }

      // ... existing send logic ...
      const endpoint = (window.BV_CONFIG && window.BV_CONFIG.orderEndpoint) ? window.BV_CONFIG.orderEndpoint.trim() : "";
      const toEmail = (window.BV_CONFIG && window.BV_CONFIG.orderToEmail) ? window.BV_CONFIG.orderToEmail : "bladverkstaden@gmail.com";
      const subjPrefix = (window.BV_CONFIG && window.BV_CONFIG.orderSubjectPrefix) ? window.BV_CONFIG.orderSubjectPrefix : "Order";

      try {
        if (endpoint) {
          await fetch(endpoint, { method: "POST", body: JSON.stringify(payload) });
          setStatus("OK", TXT.form.statusOk);
          clearState();
          form.reset();
          items.innerHTML = "";
          addRow();
          localStorage.removeItem("bv_order_state");
          // Reset UI
          step2.hidden = true;
          // btnNext.hidden = false;
          window.scrollTo(0, 0);
          return;
        }
        // mailto
        const subject = encodeURIComponent(`${subjPrefix} - ${payload.firstName} ${payload.lastName}`);
        const body = encodeURIComponent(buildPlainText(payload));
        window.location.href = `mailto:${encodeURIComponent(toEmail)}?subject=${subject}&body=${body}`;
        setStatus("OK", TXT.form.statusMail);
        clearState(); // Assume sent
      } catch (err) {
        setStatus("ERR", TXT.form.statusFail);
      }
    });

    // Init
    loadState(); // Auto load on startup
  }

  if (window.lucide) window.lucide.createIcons();
})();