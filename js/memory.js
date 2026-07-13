/*
=========================================================
MEMORY GAME
Retourner les paires image-mot
=========================================================
*/

"use strict";

const Memory = {

    cards: [],
    firstCard: null,
    secondCard: null,
    lockBoard: false,
    matches: 0,

    init() {
        const container = document.getElementById('memoryContainer');
        if (!container) return;
        this.matches = 0;
        // Sélectionner 6 mots (12 cartes)
        const selected = Utils.shuffle(Database.words).slice(0, 6);
        // Créer les paires : chaque mot aura une carte image et une carte mot
        let deck = [];
        selected.forEach(word => {
            deck.push({ type: 'image', word: word.word, image: word.image, id: word.id });
            deck.push({ type: 'word', word: word.word, image: word.image, id: word.id });
        });
        this.cards = Utils.shuffle(deck);
        this.render(container);
    },

    render(container) {
        container.innerHTML = `
            <div class="game-toolbar">
                <button id="memoryReset">🔄 Nouveau</button>
                <button id="memorySpeak">🔊 Écouter</button>
            </div>
            <div class="memory-grid" id="memoryGrid"></div>
            <div style="text-align:center;margin-top:20px;font-size:1.5rem;" id="memoryFeedback"></div>
        `;

        const grid = document.getElementById('memoryGrid');
        this.cards.forEach((card, index) => {
            const div = document.createElement('div');
            div.className = 'memory-card';
            div.dataset.index = index;
            div.dataset.id = card.id;
            div.dataset.type = card.type;
            // Contenu : pour l'instant caché (dos)
            div.innerHTML = `<span style="font-size:3rem;">❓</span>`;
            div.addEventListener('click', () => this.flipCard(div, card));
            grid.appendChild(div);
        });

        document.getElementById('memoryReset').onclick = () => this.init();
        document.getElementById('memorySpeak').onclick = () => {
            Utils.speak('Retourne les cartes et trouve les paires', 'fr-FR');
        };
        document.getElementById('memoryFeedback').textContent = '';
    },

    flipCard(element, card) {
        if (this.lockBoard) return;
        if (element === this.firstCard) return;
        if (this.matches === this.cards.length / 2) return;

        // Afficher le contenu
        if (card.type === 'image') {
            element.innerHTML = `<img src="${card.image}" alt="${card.word}" style="width:80%;height:80%;object-fit:contain;">`;
        } else {
            element.innerHTML = `<span style="font-size:2rem;font-weight:bold;">${card.word}</span>`;
        }
        element.style.background = '#E3F2FD';

        if (!this.firstCard) {
            this.firstCard = { element, card };
            return;
        }

        this.secondCard = { element, card };
        this.lockBoard = true;

        // Vérifier la paire
        const isMatch = (this.firstCard.card.id === this.secondCard.card.id) &&
                       (this.firstCard.card.type !== this.secondCard.card.type);

        if (isMatch) {
            this.matches++;
            // Marquer comme trouvées
            this.firstCard.element.style.background = '#A5D6A7';
            this.secondCard.element.style.background = '#A5D6A7';
            Utils.speak(this.firstCard.card.word, 'en-US');
            Utils.success();
            Progress.markWordLearned(this.firstCard.card.id);
            this.firstCard = null;
            this.secondCard = null;
            this.lockBoard = false;
            const feedback = document.getElementById('memoryFeedback');
            feedback.textContent = `✅ ${this.matches} / ${this.cards.length / 2}`;
            if (this.matches === this.cards.length / 2) {
                feedback.textContent = '🎉 Bravo ! Tu as trouvé toutes les paires !';
                Utils.createConfetti();
                Utils.speak('Félicitations !', 'fr-FR');
                setTimeout(() => this.init(), 3000);
            }
        } else {
            // Pas de correspondance
            Utils.errorSound();
            setTimeout(() => {
                this.firstCard.element.innerHTML = `<span style="font-size:3rem;">❓</span>`;
                this.firstCard.element.style.background = '';
                this.secondCard.element.innerHTML = `<span style="font-size:3rem;">❓</span>`;
                this.secondCard.element.style.background = '';
                this.firstCard = null;
                this.secondCard = null;
                this.lockBoard = false;
            }, 800);
        }
    }
};

// Initialisation automatique
document.addEventListener('click', e => {
    if (e.target.dataset.page === 'memoryPage') {
        setTimeout(() => Memory.init(), 150);
    }
});

window.Memory = Memory;
