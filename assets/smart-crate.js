/* Smart Crate Logic (Vanilla JS) */
(function () {
    // --- Data (Hardcoded for demo) ---
    const PRODUCTS = [
        { id: 1, name: 'Pea Shoots', price: 65, color: '#4ade80', isBestSeller: true },
        { id: 2, name: 'Solros', price: 65, color: '#facc15', isBestSeller: true },
        { id: 3, name: 'Rädisa (Spicy)', price: 65, color: '#f87171', isBestSeller: false },
        { id: 4, name: 'Broccoli', price: 65, color: '#059669', isBestSeller: false },
        { id: 5, name: 'Röd Amarant', price: 75, color: '#f43f5e', isBestSeller: false },
        { id: 6, name: 'Koriander', price: 75, color: '#16a34a', isBestSeller: false },
    ];

    const CRATE_SIZE = 8;
    let cart = []; // Array of product objects

    // DOM Elements
    const grid = document.getElementById('product-grid');
    const container = document.getElementById('crate-container');
    const statusText = document.getElementById('crate-status-text');
    const totalText = document.getElementById('crate-total-text');
    const toast = document.getElementById('toast');
    const modal = document.getElementById('smart-fill-modal');

    // --- Init ---
    function init() {
        renderProducts();
        updateUI();

        // Expose functions globally for HTML onclicks
        window.addToCart = addToCart;
        window.attemptCheckout = attemptCheckout;
        window.smartFill = smartFill;
        window.closeModal = closeModal;
        window.removeItem = removeItem;
        window.duplicateItem = duplicateItem;
    }

    // --- Render ---
    function renderProducts() {
        grid.innerHTML = PRODUCTS.map(p => `
            <div class="panel" style="display:flex; flex-direction:column; gap:12px;">
                <div style="display:flex; justify-content:space-between; align-items:start;">
                    <div>
                        ${p.isBestSeller ? '<div class="badge mono" style="font-size:10px; margin-bottom:4px;">POPULÄR</div>' : ''}
                        <h3>${p.name}</h3>
                        <div class="mono small">${p.price} kr / st</div>
                    </div>
                    <div style="width:24px; height:24px; border-radius:50%; background:${p.color}; border:2px solid var(--ink);"></div>
                </div>
                
                <div class="actions" style="margin-top:auto;">
                    <button class="btn secondary" onclick="addToCart(${p.id}, 1)">+1</button>
                    <button class="btn" onclick="addToCart(${p.id}, 8)">+ Hel låda</button>
                </div>
            </div>
        `).join('');
    }

    function renderCrates() {
        const totalItems = cart.length;
        const totalCrates = Math.max(1, Math.ceil(totalItems / CRATE_SIZE));

        let html = '';

        for (let i = 0; i < totalCrates; i++) {
            const itemsInThisCrate = cart.slice(i * CRATE_SIZE, (i + 1) * CRATE_SIZE);
            const isFull = itemsInThisCrate.length === CRATE_SIZE;

            // Crate Visual
            html += `
                <div>
                   <div class="mono meta" style="margin-bottom:4px; display:flex; justify-content:space-between;">
                        <span>LÅDA #${i + 1}</span>
                        <span>${itemsInThisCrate.length}/${CRATE_SIZE}</span>
                   </div>
                   <div class="visual-crate">
                       <div class="visual-grid">
            `;

            // Slots
            for (let s = 0; s < CRATE_SIZE; s++) {
                const globalIndex = (i * CRATE_SIZE) + s;
                if (s < itemsInThisCrate.length) {
                    const item = itemsInThisCrate[s];
                    // On click we could remove?
                    html += `<div class="slot filled" style="background:${item.color}; border-color:var(--ink);" 
                        onclick="removeItem(${globalIndex})" title="${item.name}"></div>`;
                } else {
                    html += `<div class="slot"></div>`;
                }
            }
            html += `</div></div></div>`; // Close grid, crate, wrapper
        }
        container.innerHTML = html;

        // Auto scroll to end if a new crate was added
        requestAnimationFrame(() => {
            // Simple logic: if we just added, scroll to right
            container.scrollLeft = container.scrollWidth;
        });
    }

    // --- Logic ---
    function addToCart(id, qty) {
        const product = PRODUCTS.find(p => p.id === id);
        for (let i = 0; i < qty; i++) cart.push(product);

        updateUI();

        if (qty === 8) showToast("Hel låda tillagd!");
        else if (cart.length > 0 && cart.length % 8 === 0) showToast("Lådan fylld! ✨");
    }

    function removeItem(index) {
        cart.splice(index, 1);
        updateUI();
    }

    function duplicateItem(index) {
        if (index < 0 || index >= cart.length) return;
        cart.splice(index + 1, 0, cart[index]);
        updateUI();
    }

    function updateUI() {
        totalText.innerText = cart.length + " st";

        const remainder = cart.length % CRATE_SIZE;
        const missing = remainder === 0 ? 0 : CRATE_SIZE - remainder;

        if (cart.length === 0) {
            statusText.innerText = "Tomt...";
        } else if (missing === 0) {
            statusText.innerText = "Redo för leverans! ✅";
        } else {
            statusText.innerText = `${missing} platser kvar...`;
        }

        renderCrates();
    }

    function attemptCheckout() {
        if (cart.length === 0) {
            showToast("Lägg till något först!");
            return;
        }

        const remainder = cart.length % CRATE_SIZE;
        if (remainder === 0) {
            // Success -> Reuse the "Review Modal" logic from app.js?
            // Since this is standard App.js, we can try to find valid fields
            // But this page doesn't have the form. 
            // We'll just build a MAILTO string here manually for the demo.
            doCheckout();
        } else {
            showSmartFillModal(remainder);
        }
    }

    // --- Smart Fill ---
    function showSmartFillModal(remainder) {
        const missing = CRATE_SIZE - remainder;
        document.getElementById('modal-slot-count').innerText = missing;

        // Render visual holes
        let html = '';
        for (let i = 0; i < missing; i++) {
            html += `<div class="slot" style="border:2px dashed red;"></div>`;
        }
        document.getElementById('modal-visual').innerHTML = html;
        document.getElementById('modal-visual').style.gridTemplateColumns = `repeat(${Math.min(4, missing)}, 1fr)`;

        modal.hidden = false;
    }

    function closeModal() {
        modal.hidden = true;
    }

    function smartFill(type) {
        const remainder = cart.length % CRATE_SIZE;
        const missing = CRATE_SIZE - remainder;

        if (type === 'bestseller') {
            const best = PRODUCTS.find(p => p.isBestSeller);
            addToCart(best.id, missing);
        } else if (type === 'double') {
            const last = cart[cart.length - 1];
            addToCart(last.id, missing);
        }
        closeModal();
        showToast("Smart Fill! 🧠");

        // checkout?
        setTimeout(doCheckout, 1000);
    }

    function showToast(msg) {
        toast.innerText = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
    }

    function doCheckout() {
        // Generate summary
        const summary = cart.reduce((acc, curr) => {
            acc[curr.name] = (acc[curr.name] || 0) + 1;
            return acc;
        }, {});

        let txt = "ORDER (SMART CRATE):\n";
        Object.entries(summary).forEach(([name, qty]) => {
            txt += `- ${qty}x ${name}\n`;
        });
        txt += `\nTOTALT: ${cart.length} st (${Math.ceil(cart.length / 8)} lådor)`;

        const mailto = `mailto:bladverkstaden@gmail.com?subject=SmartCrate&body=${encodeURIComponent(txt)}`;

        // Show in a simpler alert style since we don't have the full UI here
        // Or inject a simple modal
        const modalHtml = `
            <div class="panel" style="background:var(--bg); max-width:400px; width:100%; margin:auto; box-shadow: 10px 10px 0 rgba(0,0,0,0.2);">
                <h2>Redo att skicka!</h2>
                <textarea class="paperArea mono" style="width:100%; height:150px;" readonly>${txt}</textarea>
                <div class="actions">
                    <a href="${mailto}" class="btn">Öppna Mail</a>
                    <button class="btn secondary" onclick="location.reload()">Börja om</button>
                </div>
            </div>
        `;

        // Reuse modal overlay
        modal.innerHTML = modalHtml;
        modal.hidden = false;
    }

    // Run
    // Wait for DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
