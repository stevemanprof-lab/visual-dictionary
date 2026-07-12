// js/database.js
// Vocabulary database

const Database = {
  categories: {
    animals: [
      { word: "cat", image: "assets/animals/cat.png" },
      { word: "dog", image: "assets/animals/dog.png" }
    ],
    food: [
      { word: "apple", image: "assets/food/apple.png" },
      { word: "bread", image: "assets/food/bread.png" }
    ]
  },

  getCategory(name) {
    return this.categories[name] || [];
  },

  search(word) {
    for (const cat in this.categories) {
      const found = this.categories[cat].find(item => item.word === word);
      if (found) return found;
    }
    return null;
  },

  randomWord(category) {
    const list = this.getCategory(category);
    return list[Math.floor(Math.random() * list.length)];
  }
};
