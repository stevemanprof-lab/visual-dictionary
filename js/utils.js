// js/utils.js
// Helper functions: navigation, storage, toast, confetti, speech

const Utils = {
  navigate(sectionId) {
    document.querySelectorAll("main section").forEach(sec => sec.style.display = "none");
    const target = document.getElementById(sectionId);
    if (target) target.style.display = "block";
  },

  showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  },

  launchConfetti() {
    // Simple confetti effect
    console.log("🎉 Confetti launched!");
  },

  speak(text) {
    const utter = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utter);
  },

  saveProgress(data) {
    localStorage.setItem("progress", JSON.stringify(data));
  },

  loadProgress() {
    return JSON.parse(localStorage.getItem("progress")) || {};
  }
};
