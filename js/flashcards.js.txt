// js/flashcards.js
// Flashcard game

document.addEventListener("DOMContentLoaded", () => {
  const flashcards = document.getElementById("flashcards");
  flashcards.innerHTML = "<h2>Flashcards</h2>";

  const card = document.createElement("div");
  card.className = "flashcard";
  card.innerHTML = `
    <div class="flashcard-inner">
      <div class="flashcard-front">🐱</div>
      <div class="flashcard-back">Cat</div>
    </div>
  `;
  card.onclick = () => card.classList.toggle("flip");
  flashcards.appendChild(card);
});
