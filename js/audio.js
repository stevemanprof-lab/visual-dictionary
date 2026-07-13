/*
=========================================================
AUDIO MODULE
Gestion de la synthèse vocale et des effets sonores
=========================================================
*/

"use strict";

const AudioPlayer = {

    voice: null,
    rate: 1,
    pitch: 1,

    init() {
        // Récupérer les voix disponibles
        if (window.speechSynthesis) {
            window.speechSynthesis.onvoiceschanged = () => {
                this.voice = speechSynthesis.getVoices().find(v => v.lang.startsWith('en')) || null;
            };
        }
    },

    speak(text, lang = 'en-US') {
        if (!window.speechSynthesis) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = this.rate;
        utterance.pitch = this.pitch;
        if (this.voice) utterance.voice = this.voice;
        window.speechSynthesis.speak(utterance);
    },

    playSound(type = 'success') {
        // Effets sonores simples avec Web Audio API
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            if (type === 'success') {
                osc.frequency.value = 800;
                gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);
                osc.start();
                osc.stop(ctx.currentTime + 0.15);
                // Deuxième ton
                setTimeout(() => {
                    const osc2 = ctx.createOscillator();
                    const gain2 = ctx.createGain();
                    osc2.connect(gain2);
                    gain2.connect(ctx.destination);
                    osc2.frequency.value = 1000;
                    gain2.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);
                    osc2.start();
                    osc2.stop(ctx.currentTime + 0.15);
                }, 120);
            } else if (type === 'error') {
                osc.frequency.value = 300;
                gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3);
                osc.start();
                osc.stop(ctx.currentTime + 0.3);
            } else {
                osc.frequency.value = 500;
                gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.1);
                osc.start();
                osc.stop(ctx.currentTime + 0.1);
            }
        } catch(e) { /* silencieux */ }
    }
};

// Initialiser au chargement
AudioPlayer.init();

// Rendre disponible globalement
window.AudioPlayer = AudioPlayer;
