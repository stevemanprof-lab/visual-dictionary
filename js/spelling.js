/*
=========================================================
SPELLING GAME
Voir l'image, taper le mot
=========================================================
*/

"use strict";

const Spelling = {

    words: [],
    current: null,
    score: 0,

    init() {
        const container = document.getElementById('spellingContainer');
        if (!container) return;
        this.words = Utils.shuffle([...Database.words]);
        this.score = 0;
        this.render(container);
        this.nextWord();
    },

    render(container) {
        container.innerHTML = `
            <div class="game-toolbar">
                <button id="spellingReset">🔄 Nouveau</button>
                <button id="spellingSpeak">🔊 Écouter</button>
            </div>
            <div class="spelling-word">
                <img id="spellingImage" src="" alt="Mot" style="width:200px;height:200px;object-fit:contain;margin:auto;">
                <input type="text" id="spellingInput" class="spelling-input" placeholder="Tape le mot..." autofocus>
                <div style="margin-top:15px;font-size:1.5rem;" id="spellingFeedback"></div>
                <div style="margin-top:10px;font-size:1.2rem;">Score: <span id="spellingScore">0</span></div>
            </div>
        `;

        document.getElementById('spellingReset').onclick = () => this.init();
        document.getElementById('spellingSpeak').onclick = () => {
            if (this.current) {
                Utils.speak(this.current.word, 'en-US');
            }
        };

        const input = document.getElementById('spellingInput');
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.checkAnswer();
            }
        });
        // Cliquer sur l'image pour écouter
        document.getElementById('spellingImage').addEventListener('click', () => {
            if (this.current) Utils.speak(this.current.word, 'en-US');
        });
    },

    nextWord() {
        if (this.words.length === 0) {
            // Fin du jeu
            const feedback = document.getElementById('spellingFeedback');
            feedback.textContent = '🎉 Félicitations ! Tu as fini !';
            feedback.style.color = '#4CAF50';
            Utils.createConfetti();
            Utils.speak('Bravo !', 'fr-FR');
            document.getElementById('spellingInput').disabled = true;
            return;
        }
        this.current = this.words.pop();
        const img = document.getElementById('spellingImage');
        Utils.loadImage(img, this.current.image);
        const input = document.getElementById('spellingInput');
        input.value = '';
        input.disabled = false;
        input.focus();
        const feedback = document.getElementById('spellingFeedback');
        feedback.textContent = '✏️ Tape le mot en anglais';
        feedback.style.color = '#333';
        document.getElementById('spellingScore').textContent = this.score;
        // Jouer automatiquement le son
        Utils.speak(this.current.word, 'en-US');
    },

    checkAnswer() {
        if (!this.current) return;
        const input = document.getElementById('spellingInput');
        const userAnswer = input.value.trim().toLowerCase();
        const correct = this.current.word.toLowerCase();
        const feedback = document.getElementById('spellingFeedback');

        if (userAnswer === correct) {
            feedback.textContent = '✅ Correct !';
            feedback.style.color = '#4CAF50';
            this.score++;
            document.getElementById('spellingScore').textContent = this.score;
            Utils.success();
            Progress.markWordLearned(this.current.id);
            // Passer au mot suivant après un délai
            input.disabled = true;
            setTimeout(() => this.nextWord(), 1200);
        } else {
            feedback.textContent = `❌ Non, c'est "${this.current.word}". Essaie encore !`;
            feedback.style.color = '#EF5350';
            Utils.errorSound();
            input.value = '';
            input.focus();
            // Donner un indice : écouter le mot
            Utils.speak(this.current.word, 'en-US');
        }
    }
};

// Initialisation automatique
document.addEventListener('click', e => {
    if (e.target.dataset.page === 'spellingPage') {
        setTimeout(() => Spelling.init(), 150);
    }
});

window.Spelling = Spelling;
