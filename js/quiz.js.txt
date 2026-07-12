// js/quiz.js
// Simple quiz game

document.addEventListener("DOMContentLoaded", () => {
  const quiz = document.getElementById("quiz");
  quiz.innerHTML = "<h2>Quiz</h2>";

  const question = Database.randomWord("animals");
  quiz.innerHTML += `<p class="quiz-question">What is this?</p><img src="${question.image}" width="100">`;

  const optionsDiv = document.createElement("div");
  optionsDiv.className = "quiz-options";

  const options = ["cat", "dog", "apple"];
  options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => {
      if (opt === question.word) {
        Utils.showToast("Correct!");
        Progress.addStar("student1", "animals");
      } else {
        Utils.showToast("Try again!");
      }
    };
    optionsDiv.appendChild(btn);
  });

  quiz.appendChild(optionsDiv);
});
