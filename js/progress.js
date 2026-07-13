/*
=========================================================
PROGRESS MODULE
Suivi des mots appris, étoiles, badges
=========================================================
*/

"use strict";

const Progress = {

    learned: [],
    stars: 0,
    badges: 0,

    load() {
        this.learned = Utils.load('learned', []);
        this.stars = Utils.load('stars', 0);
        this.badges = Utils.load('badges', 0);
        this.updateUI();
    },

    save() {
        Utils.save('learned', this.learned);
        Utils.save('stars', this.stars);
        Utils.save('badges', this.badges);
    },

    markWordLearned(wordId) {
        if (!this.learned.includes(wordId)) {
            this.learned.push(wordId);
            this.stars += 1;
            // Badge tous les 5 mots
            if (this.learned.length % 5 === 0) {
                this.badges += 1;
                Utils.showToast(`🏆 Badge débloqué ! (${this.badges})`);
            }
            this.save();
            this.updateUI();
            Utils.success(); // confettis + son
        }
    },

    getProgress() {
        const total = Database.words.length;
        const done = this.learned.length;
        return {
            percent: Math.round((done / total) * 100),
            done: done,
            total: total,
            stars: this.stars,
            badges: this.badges
        };
    },

    updateUI() {
        const circle = document.getElementById('progressCircle');
        if (circle) {
            const p = this.getProgress();
            circle.textContent = p.percent + '%';
        }
        const wordsEl = document.getElementById('wordsLearned');
        if (wordsEl) {
            wordsEl.textContent = this.learned.length;
        }
        const starsEl = document.getElementById('starsEarned');
        if (starsEl) {
            starsEl.textContent = this.stars;
        }
        const badgesEl = document.getElementById('badgesEarned');
        if (badgesEl) {
            badgesEl.textContent = this.badges;
        }
    },

    reset() {
        this.learned = [];
        this.stars = 0;
        this.badges = 0;
        this.save();
        this.updateUI();
        Utils.showToast('Progression réinitialisée');
    }
};

// Chargement initial
Progress.load();

// Rendre global
window.Progress = Progress;
