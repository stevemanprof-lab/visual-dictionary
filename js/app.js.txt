// js/app.js
// Main app logic

document.addEventListener("DOMContentLoaded", () => {
  Utils.navigate("learn");
  renderLearnSection();
});

function renderLearnSection() {
  const learn = document.getElementById("learn");
  learn.innerHTML = "<h2>Learn Words</h2>";

  for (const cat in Database.categories) {
    const catDiv = document.createElement("div");
    catDiv.innerHTML = `<h3>${cat}</h3>`;
    Database.categories[cat].forEach(item => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `<img src="${item.image}" alt="${item.word}" width="100"><p>${item.word}</p>`;
      card.onclick = () => Utils.speak(item.word);
      catDiv.appendChild(card);
    });
    learn.appendChild(catDiv);
  }
}
