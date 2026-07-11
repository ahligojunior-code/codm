// ==========================================================================
// GESTION DU MENU MOBILE (BURGER MENU)
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const burgerMenu = document.querySelector(".burger-menu");
    const navLinks = document.querySelector(".nav-links");

    burgerMenu.addEventListener("click", () => {
        // Alterne l'affichage du menu
        navLinks.classList.toggle("mobile-open");
    });
});

// GESTION SYSTEME D'ONGLETS ET NAVIGATION SANS RECHARGEMENT
function switchTab(event, tabId) {
    event.preventDefault();
    
    // Désactiver tous les onglets
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });

    // Activer l'onglet demandé
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');

    // Fermer automatiquement le menu mobile après avoir cliqué sur un lien
    const navLinks = document.querySelector(".nav-links");
    navLinks.classList.remove("mobile-open");
}

// ==========================================================================
// 1. FILTRE ZONE ARME / GUNSMITH TIER LIST
// ==========================================================================
const weaponsData = {
    'S': { name: "BP50", img: "https://www.callofduty.com/content/dam/atvi/callofduty/codm/season-2024/s6/hub/s6-weapons-bp50.png", atts: ["Silencieux Monolithique", "Canon Étendu OWC", "Laser Tactique OWC", "Chargeur Rapide 40 c.", "Sans Crosse"] },
    'A': { name: "DR-H", img: "https://via.placeholder.com/600x250/000000/ffffff?text=DR-H+A-Tier", atts: ["Compensateur OWC", "Canon 25 OWC", "Atout Blessure", "Chargeur de 30 c.", "Poignée Granulée"] },
    'B': { name: "M4", img: "https://via.placeholder.com/600x250/000000/ffffff?text=M4+B-Tier", atts: ["Silencieux Léger", "Crosse Combat YKM", "Laser 5mW", "Chargeur 50 c.", "Poignée Caoutchoutée"] }
};

function filterTier(tier) {
    document.querySelectorAll('.tier-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    const weapon = weaponsData[tier];
    document.getElementById('weapon-img').src = weapon.img;
    document.querySelector('.tier-badge').innerText = `TIER ${tier}`;

    const cards = document.querySelectorAll('.attachment-card .att-name');
    cards.forEach((card, index) => {
        card.innerText = weapon.atts[index];
    });
}

// ==========================================================================
// 5. ANALYSEUR DE SMARTPHONE ET CONFIGURATEUR SENSIVITÉ
// ==========================================================================
function analyzeDevice() {
    const model = document.getElementById('phoneModel').value;
    const ram = parseInt(document.getElementById('ramSelect').value);
    const resultBox = document.getElementById('analysisResult');

    if(!model) {
        alert("Veuillez entrer un modèle de smartphone.");
        return;
    }

    resultBox.classList.remove('hidden');
    resultBox.style.marginTop = "1.5rem";

    let graphics = "Moyens (Medium)";
    let fps = "Élevés (60 FPS)";
    let sens = "Standard (Moyenne - 95)";

    if (ram >= 8) {
        graphics = "Très Élevés / Max (Graphismes Compétitifs Bas pour visibilité)";
        fps = "Ultra / Max (90 - 120 FPS)";
        sens = "Haute Précision (Vitesse Standard: 110, Visée: 125, Sniper: 65)";
    } else if (ram <= 4) {
        graphics = "Faibles (Low) - Recommandé pour la fluidité";
        fps = "Moyens / Élevés (45-60 FPS)";
        sens = "Contrôle Stable (Vitesse Standard: 85, Visée: 90, Sniper: 45)";
    }

    resultBox.innerHTML = `
        <div class="glass-card" style="border-color: var(--gold); background: rgba(0,0,0,0.4);">
            <h4 style="color: var(--gold); margin-bottom: 1rem;"><i class="fa-solid fa-square-poll-vertical"></i> Optimisation pour ${model}</h4>
            <p><strong>Graphismes recommandés :</strong> ${graphics}</p>
            <p><strong>Fréquence d'images (FPS) :</strong> <span class="text-neon">${fps}</span></p>
            <hr style="border: 0; border-top: 1px solid #222; margin: 0.8rem 0;">
            <p><strong>Base de Sensibilité Conseillée :</strong></p>
            <ul>
                <li>Sensibilité Standard : ${sens.split(',')[0] || sens}</li>
                <li>Sensibilité Visée (ADS) : ${sens.split(',')[1] || ''}</li>
                <li>Sensibilité Lunette Sniper : ${sens.split(',')[2] || ''}</li>
            </ul>
        </div>
    `;
}

// ==========================================================================
// 7. MODULE DE CHAT EN EN TEMPS RÉEL (SIMULATION)
// ==========================================================================
function sendMessage() {
    const input = document.getElementById('chatInput');
    const msgText = input.value.trim();
    if (msgText === "") return;

    const chatBox = document.getElementById('chatBox');
    const newMsg = document.createElement('div');
    newMsg.className = 'chat-msg';
    newMsg.innerHTML = `<span class="msg-user text-neon">[Moi]:</span> ${msgText}`;
    
    chatBox.appendChild(newMsg);
    input.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
}

// SIMULATION D'AJOUT DE CLANS VIA FORMULAIRE
document.getElementById('clanForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const inputs = this.querySelectorAll('input, select, textarea');
    const name = inputs[0].value;
    const mode = inputs[1].value;
    const level = inputs[2].value;
    const contact = inputs[3].value;
    const desc = inputs[4].value;

    const container = document.getElementById('clansContainer');
    const card = document.createElement('div');
    card.className = 'glass-card clan-card';
    card.innerHTML = `
        <h4 class="text-gold">${name}</h4>
        <p><strong>Mode :</strong> ${mode} | <strong>Recrutement :</strong> ${level}</p>
        <p style="font-size:0.9rem; color:var(--text-muted); margin:0.5rem 0;">${desc}</p>
        <a href="${contact}" target="_blank" class="btn-neon-sm"><i class="fa-brands fa-whatsapp"></i> Rejoindre / Contacter</a>
    `;
    container.prepend(card);
    this.reset();
});