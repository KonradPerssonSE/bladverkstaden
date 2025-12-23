/* Bladverkstaden — shared vanilla JS */
(function(){
  const root = document.documentElement.dataset.root || "";
  const page = document.body.dataset.page || "";

  const NAV = [
    { id:"home",    label:"Start",      href: root + "index.html" },
    { id:"order",   label:"Beställ",    href: root + "order.html" },
    { id:"about",   label:"Om oss",     href: root + "pages/about.html" },
    { id:"history", label:"Historia",   href: root + "pages/history.html" },
    { id:"policy",  label:"Policy",     href: root + "pages/policy.html" }
  ];

  function el(html){
    const t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  function setAriaCurrent(container){
    container.querySelectorAll("a[data-nav-id]").forEach(a=>{
      if(a.dataset.navId === page){
        a.setAttribute("aria-current","page");
      }else{
        a.removeAttribute("aria-current");
      }
    });
  }

  // Header
  const header = document.getElementById("siteHeader");
  if(header){
    header.appendChild(el(`
      <div class="header" role="banner">
        <div class="brand">
          <div class="mark" aria-hidden="true">✿</div>
          <div class="name">Bladverkstaden</div>
        </div>

        <nav class="navDesktop" aria-label="Huvudmeny (desktop)">
          ${NAV.map(n => `<a data-nav-id="${n.id}" href="${n.href}">${n.label}</a>`).join("")}
        </nav>

        <button class="menuBtn" id="menuOpen" type="button" aria-haspopup="dialog" aria-controls="menuOverlay">
          ☰ MENY
        </button>
      </div>
    `));
    setAriaCurrent(header);
  }

  // Mobile menu overlay
  const overlay = document.getElementById("menuOverlay");
  if(overlay){
    overlay.appendChild(el(`
      <div class="menuCard" role="dialog" aria-modal="true" aria-label="Meny">
        <div class="menuTop">
          <div class="brand">
            <div class="mark" aria-hidden="true">✿</div>
            <div class="name">Bladverkstaden</div>
          </div>
          <button class="menuClose" id="menuClose" type="button">✕ STÄNG</button>
        </div>

        <div class="menuLinks">
          ${NAV.map(n => `<a class="btn secondary" data-nav-id="${n.id}" href="${n.href}">${n.label}</a>`).join("")}
        </div>

        <div class="panel paper mono meta" style="margin-top:auto">
          <div><b>Kontakt:</b> <a href="mailto:${(window.BV_CONFIG && window.BV_CONFIG.orderToEmail) ? window.BV_CONFIG.orderToEmail : "bladverkstaden@gmail.com"}">bladverkstaden@gmail.com</a></div>
          <div><b>Telefon:</b> <a href="tel:+46767751826">076 775 18 26</a></div>
          <div><b>Adress:</b> Augustenborgsgatan 18, Malmö</div>
        </div>
      </div>
    `));

    const openBtn = document.getElementById("menuOpen");
    const closeBtn = document.getElementById("menuClose");

    function openMenu(){
      document.body.dataset.menu = "open";
      closeBtn?.focus();
    }
    function closeMenu(){
      delete document.body.dataset.menu;
      openBtn?.focus();
    }

    openBtn?.addEventListener("click", openMenu);
    closeBtn?.addEventListener("click", closeMenu);
    overlay.addEventListener("click", (e)=>{
      if(e.target === overlay) closeMenu();
    });
    window.addEventListener("keydown",(e)=>{
      if(e.key === "Escape" && document.body.dataset.menu === "open") closeMenu();
    });

    setAriaCurrent(overlay);
  }

  // Footer
  const footer = document.getElementById("siteFooter");
  if(footer){
    footer.appendChild(el(`
      <div class="footer">
        <div class="footerGrid">
          <div class="panel">
            <div class="kicker mono">Kontakt</div>
            <div style="height:10px"></div>
            <div class="mono small"><b>E-post</b><br><a href="mailto:bladverkstaden@gmail.com">bladverkstaden@gmail.com</a></div>
            <div style="height:10px"></div>
            <div class="mono small"><b>Telefon</b><br><a href="tel:+46767751826">076 775 18 26</a></div>
            <div style="height:10px"></div>
            <div class="mono small"><b>Adress</b><br>Augustenborgsgatan 18, Malmö</div>
          </div>
          <div class="panel paper">
            <div class="kicker mono">Notering</div>
            <div style="height:10px"></div>
            <p class="small">Den här sajten är byggd som statiska sidor (HTML/CSS/JS) – enkel att expandera med fler informationssidor.</p>
            <p class="mono meta">© Bladverkstaden</p>
          </div>
        </div>
      </div>
    `));
  }

  // Order form logic (if present)
  const form = document.getElementById("orderForm");
  if(form){
    const items = document.getElementById("orderItems");
    const addBtn = document.getElementById("addItem");
    const status = document.getElementById("orderStatus");

    const DEFAULT_PRODUCTS = [
      "Rädisa","Broccoli","Rödkål","Koriander","Senap","Mizuna","Kinesisk gräslök","Mix (blandat)","Annat"
    ];

    function itemRow(){
      const opts = DEFAULT_PRODUCTS.map(p => `<option value="${p}">${p}</option>`).join("");
      return el(`
        <div class="itemRow">
          <div>
            <label class="mono meta">Produkt</label>
            <select name="product">${opts}</select>
          </div>
          <div>
            <label class="mono meta">Antal</label>
            <input name="qty" inputmode="numeric" placeholder="t.ex. 10" />
          </div>
          <div>
            <label class="mono meta">Enhet</label>
            <select name="unit">
              <option value="låda">låda</option>
              <option value="bricka">bricka</option>
              <option value="kg">kg</option>
              <option value="st">st</option>
            </select>
          </div>
          <div style="grid-column:1 / -1">
            <label class="mono meta">Rad-notis</label>
            <input name="lineNote" placeholder="valfritt (t.ex. 'extra färsk', 'utan etikett', osv)" />
          </div>
          <button class="btn secondary inline mono" type="button" data-remove>TA BORT RAD</button>
        </div>
      `);
    }

    function addRow(){
      const row = itemRow();
      row.querySelector("[data-remove]").addEventListener("click", ()=> row.remove());
      items.appendChild(row);
    }

    addBtn?.addEventListener("click", addRow);
    if(items && items.children.length === 0) addRow();

    function getValue(name){ return (form.elements[name]?.value || "").trim(); }

    function collectItems(){
      const out = [];
      items.querySelectorAll(".itemRow").forEach(r=>{
        const product = r.querySelector('select[name="product"]').value;
        const qty = (r.querySelector('input[name="qty"]').value || "").trim();
        const unit = r.querySelector('select[name="unit"]').value;
        const lineNote = (r.querySelector('input[name="lineNote"]').value || "").trim();
        if(product || qty || lineNote){
          out.push({ product, qty, unit, lineNote });
        }
      });
      return out;
    }

    function setStatus(kind, msg){
      status.hidden = false;
      status.innerHTML = `<div class="badge mono">${kind.toUpperCase()}</div><div style="height:10px"></div><div>${msg}</div>`;
      status.scrollIntoView({ behavior:"smooth", block:"start" });
    }

    function buildPlainText(payload){
      const lines = [];
      lines.push("NY BESTÄLLNING / OFFERTFÖRFRÅGAN");
      lines.push("");
      lines.push(`Kundtyp: ${payload.customerType}`);
      lines.push(`Företag: ${payload.company || "-"}`);
      lines.push(`Kontakt: ${payload.contactName}`);
      lines.push(`E-post: ${payload.email}`);
      lines.push(`Telefon: ${payload.phone || "-"}`);
      lines.push("");
      lines.push(`Leveransadress: ${payload.deliveryAddress || "-"}`);
      lines.push(`Önskad leverans: ${payload.deliveryWhen || "-"}`);
      lines.push(`Återkommande: ${payload.recurring || "-"}`);
      lines.push("");
      lines.push("RADER:");
      payload.items.forEach((it, idx)=>{
        lines.push(`${idx+1}. ${it.product} — ${it.qty || "?"} ${it.unit || ""}${it.lineNote ? " ("+it.lineNote+")" : ""}`);
      });
      lines.push("");
      if(payload.notes) lines.push("ÖVRIGT:\n" + payload.notes);
      return lines.join("\n");
    }

    async function postJSON(url, data){
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if(!res.ok){
        const txt = await res.text().catch(()=> "");
        throw new Error(`HTTP ${res.status} ${res.statusText}${txt ? " — " + txt.slice(0, 180) : ""}`);
      }
      return res;
    }

    form.addEventListener("submit", async (e)=>{
      e.preventDefault();
      const payload = {
        customerType: getValue("customerType"),
        company: getValue("company"),
        orgNr: getValue("orgNr"),
        contactName: getValue("contactName"),
        email: getValue("email"),
        phone: getValue("phone"),
        deliveryAddress: getValue("deliveryAddress"),
        deliveryWhen: getValue("deliveryWhen"),
        recurring: getValue("recurring"),
        items: collectItems(),
        notes: getValue("notes"),
        sentAt: new Date().toISOString(),
        source: window.location.href
      };

      if(!payload.contactName || !payload.email || payload.items.length === 0){
        setStatus("fel", "Fyll i kontakt (namn + e-post) och minst en rad i listan.");
        return;
      }

      const endpoint = (window.BV_CONFIG && window.BV_CONFIG.orderEndpoint) ? window.BV_CONFIG.orderEndpoint.trim() : "";
      const toEmail  = (window.BV_CONFIG && window.BV_CONFIG.orderToEmail) ? window.BV_CONFIG.orderToEmail : "bladverkstaden@gmail.com";
      const subjPrefix = (window.BV_CONFIG && window.BV_CONFIG.orderSubjectPrefix) ? window.BV_CONFIG.orderSubjectPrefix : "Beställning";

      try{
        if(endpoint){
          await postJSON(endpoint, payload);
          setStatus("klart", "Tack! Vi har tagit emot din beställning/offertförfrågan. Vi återkommer så snart vi kan.");
          form.reset();
          items.innerHTML = "";
          addRow();
          return;
        }

        // Fallback: mailto (no backend)
        const subject = encodeURIComponent(`${subjPrefix} — ${payload.company || payload.contactName}`);
        const body = encodeURIComponent(buildPlainText(payload));
        window.location.href = `mailto:${encodeURIComponent(toEmail)}?subject=${subject}&body=${body}`;
        setStatus("notis", "Din e-postklient öppnas med ett förifyllt beställningsmail.");
      }catch(err){
        setStatus("fel", "Kunde inte skicka. " + (err?.message || "Okänt fel") + "<br><br>Tips: använd fallback via e-post, eller sätt en <span class='mono'>orderEndpoint</span> i <span class='mono'>assets/config.js</span>.");
      }
    });
  }
})();