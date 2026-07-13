/*
=========================================================
KIDS VISUAL DICTIONARY
UTILITY FUNCTIONS – VERSION ROBUSTE
=========================================================
*/

"use strict";

// ===== SÉLECTEURS =====
const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

// ===== ALÉATOIRE =====
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomItem(array) {
    return array[random(0, array.length - 1)];
}
function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// ===== NAVIGATION =====
function showPage(pageId) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    const page = document.getElementById(pageId);
    if (page) {
        page.classList.add("active");
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
}

// ===== TOAST =====
function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => toast.classList.remove("show"), 2500);
}

// ===== SYNTHÈSE VOCALE =====
function speak(text, lang = "en-US") {
    if (!window.speechSynthesis) return;
    speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = lang;
    utter.rate = 1;
    const voices = speechSynthesis.getVoices();
    if (voices.length) {
        utter.voice = voices.find(v => v.lang.startsWith(lang.split('-')[0])) || voices[0];
    }
    speechSynthesis.speak(utter);
}

// ===== CHARGEMENT DES IMAGES =====
function loadImage(imgElement, path) {
    imgElement.src = path;
    imgElement.onerror = function () {
        this.src = "assets/icons/image-not-found.png";
    };
}

// ===== STOCKAGE LOCAL =====
function save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
function load(key, defaultValue) {
    const data = localStorage.getItem(key);
    if (!data) return defaultValue;
    try { return JSON.parse(data); } catch { return defaultValue; }
}

// ===== PROGRESSION =====
function increaseStars() {
    let stars = load("stars", 0);
    stars++;
    save("stars", stars);
    const el = document.getElementById("starsEarned");
    if (el) el.textContent = stars;
}
function increaseWords() {
    let words = load("words", 0);
    words++;
    save("words", words);
    const el = document.getElementById("wordsLearned");
    if (el) el.textContent = words;
}

// ===== CONFETTIS =====
function createConfetti() {
    const container = document.getElementById("confettiContainer");
    if (!container) return;
    const colors = ["#4FC3F7", "#66BB6A", "#FFD54F", "#EF5350", "#AB47BC"];
    for (let i = 0; i < 80; i++) {
        const piece = document.createElement("div");
        piece.className = "confetti";
        piece.style.left = random(0, 100) + "vw";
        piece.style.background = randomItem(colors);
        piece.style.animationDelay = (Math.random() * 1.5) + "s";
        piece.style.transform = `rotate(${random(0, 360)}deg)`;
        container.appendChild(piece);
        setTimeout(() => piece.remove(), 4000);
    }
}

// ===== ÉTOILES VOLANTES =====
function createStar(x, y) {
    const star = document.createElement("div");
    star.className = "star";
    star.innerHTML = "⭐";
    star.style.left = x + "px";
    star.style.top = y + "px";
    document.body.appendChild(star);
    setTimeout(() => star.remove(), 1500);
}

// ===== ÉCRAN DE CHARGEMENT – FORCÉ =====
function hideLoading() {
    const loading = document.getElementById("loadingScreen");
    if (!loading) return;
    const fill = document.getElementById("loadingFill");
    if (fill) {
        let width = 0;
        const timer = setInterval(() => {
            width += 5;
            fill.style.width = width + "%";
            if (width >= 100) {
                clearInterval(timer);
                setTimeout(() => { loading.style.display = "none"; }, 300);
            }
        }, 25);
    } else {
        loading.style.display = "none";
    }
}

// ===== FILTRES =====
function filterWords(text) {
    text = text.toLowerCase();
    return Database.words.filter(item => item.word.toLowerCase().includes(text));
}
function categoryWords(category) {
    if (category === "all") return Database.words;
    return Database.words.filter(item => item.category === category);
}

// ===== SCORE =====
function addScore(points) {
    let score = load("score", 0);
    score += points;
    save("score", score);
    return score;
}

// ===== EFFETS SONORES =====
function beep(freq = 500, time = 120) {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = freq;
        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + time / 1000);
        osc.stop(ctx.currentTime + time / 1000);
    } catch (e) { /* silencieux */ }
}
function success() {
    beep(700, 120);
    setTimeout(() => beep(900, 120), 120);
    createConfetti();
}
function errorSound() {
    beep(200, 250);
}

// ============================================================
//  FORCER LA DISPARITION DE L'ÉCRAN DE CHARGEMENT
// ============================================================

// 1. Dès que le DOM est prêt
document.addEventListener("DOMContentLoaded", function () {
    hideLoading();
});

// 2. Sécurité : si après 2,5 secondes il est encore visible, on le cache de force
setTimeout(function () {
    const loading = document.getElementById("loadingScreen");
    if (loading && loading.style.display !== "none") {
        loading.style.display = "none";
        console.warn("⚠️ Écran de chargement forcé à disparaître (timeout)");
    }
}, 2500);

// ============================================================
//  EXPOSER LES FONCTIONS GLOBALEMENT
// ============================================================
window.Utils = {
    showPage,
    showToast,
    speak,
    loadImage,
    createConfetti,
    createStar,
    shuffle,
    random,
    randomItem,
    filterWords,
    categoryWords,
    addScore,
    success,
    errorSound,
    save,
    load,
    hideLoading
};

console.log("✅ utils.js chargé – écran de chargement va disparaître");
