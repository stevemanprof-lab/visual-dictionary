/*
=========================================================
KIDS VISUAL DICTIONARY
DATABASE ENGINE
Version 2.0 – avec images Pixabay (CC0)
=========================================================
*/

const Database = {

    categories: [
        { id: "animals",   name: "Animals",   icon: "🐶" },
        { id: "food",      name: "Food",      icon: "🍎" },
        { id: "body",      name: "Body",      icon: "🖐" },
        { id: "school",    name: "School",    icon: "🎒" },
        { id: "house",     name: "House",     icon: "🏠" },
        { id: "family",    name: "Family",    icon: "👨‍👩‍👧" },
        { id: "clothes",   name: "Clothes",   icon: "👕" },
        { id: "transport", name: "Transport", icon: "🚗" },
        { id: "nature",    name: "Nature",    icon: "🌳" },
        { id: "weather",   name: "Weather",   icon: "☀" },
        { id: "sports",    name: "Sports",    icon: "⚽" },
        { id: "jobs",      name: "Jobs",      icon: "👨‍⚕️" }
    ],

    words: [

        // ----- ANIMAUX -----
        {
            id: 1,
            category: "animals",
            word: "dog",
            sentence: "This is a dog.",
            image: "https://cdn.pixabay.com/photo/2021/02/16/14/52/dog-6023099_640.jpg",
            audio: ""
        },
        {
            id: 2,
            category: "animals",
            word: "cat",
            sentence: "This is a cat.",
            image: "https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_640.jpg",
            audio: ""
        },
        {
            id: 3,
            category: "animals",
            word: "elephant",
            sentence: "This is an elephant.",
            image: "https://cdn.pixabay.com/photo/2017/03/31/18/17/elephant-2191843_640.jpg",
            audio: ""
        },
        {
            id: 4,
            category: "animals",
            word: "lion",
            sentence: "This is a lion.",
            image: "https://cdn.pixabay.com/photo/2016/04/25/18/20/lion-1353058_640.jpg",
            audio: ""
        },
        {
            id: 5,
            category: "animals",
            word: "monkey",
            sentence: "This is a monkey.",
            image: "https://cdn.pixabay.com/photo/2017/10/15/16/14/monkey-2854215_640.jpg",
            audio: ""
        },

        // ----- NOURRITURE -----
        {
            id: 6,
            category: "food",
            word: "apple",
            sentence: "This is an apple.",
            image: "https://cdn.pixabay.com/photo/2016/11/18/15/58/apple-1835484_640.jpg",
            audio: ""
        },
        {
            id: 7,
            category: "food",
            word: "banana",
            sentence: "This is a banana.",
            image: "https://cdn.pixabay.com/photo/2016/11/10/20/33/banana-1814822_640.jpg",
            audio: ""
        },
        {
            id: 8,
            category: "food",
            word: "bread",
            sentence: "This is bread.",
            image: "https://cdn.pixabay.com/photo/2016/07/24/14/48/bread-1538761_640.jpg",
            audio: ""
        },
        {
            id: 9,
            category: "food",
            word: "milk",
            sentence: "This is milk.",
            image: "https://cdn.pixabay.com/photo/2016/11/29/16/33/milk-1863775_640.jpg",
            audio: ""
        },

        // ----- ÉCOLE -----
        {
            id: 10,
            category: "school",
            word: "book",
            sentence: "This is a book.",
            image: "https://cdn.pixabay.com/photo/2014/09/05/18/22/old-books-436498_640.jpg",
            audio: ""
        },
        {
            id: 11,
            category: "school",
            word: "pen",
            sentence: "This is a pen.",
            image: "https://cdn.pixabay.com/photo/2016/08/08/09/39/pen-1577297_640.jpg",
            audio: ""
        },
        {
            id: 12,
            category: "school",
            word: "pencil",
            sentence: "This is a pencil.",
            image: "https://cdn.pixabay.com/photo/2016/03/15/16/58/pencil-1257729_640.jpg",
            audio: ""
        },
        {
            id: 13,
            category: "school",
            word: "bag",
            sentence: "This is a school bag.",
            image: "https://cdn.pixabay.com/photo/2016/11/29/08/49/backpack-1868713_640.jpg",
            audio: ""
        },

        // ----- CORPS -----
        {
            id: 14,
            category: "body",
            word: "head",
            sentence: "This is my head.",
            image: "https://cdn.pixabay.com/photo/2017/03/19/20/06/human-2157820_640.jpg",
            audio: ""
        },
        {
            id: 15,
            category: "body",
            word: "hand",
            sentence: "This is my hand.",
            image: "https://cdn.pixabay.com/photo/2016/12/06/14/40/fingers-1886691_640.jpg",
            audio: ""
        },
        {
            id: 16,
            category: "body",
            word: "eye",
            sentence: "This is my eye.",
            image: "https://cdn.pixabay.com/photo/2017/05/21/22/01/eye-2330961_640.jpg",
            audio: ""
        },

        // ----- MAISON -----
        {
            id: 17,
            category: "house",
            word: "chair",
            sentence: "This is a chair.",
            image: "https://cdn.pixabay.com/photo/2016/11/29/11/03/chair-1869190_640.jpg",
            audio: ""
        },
        {
            id: 18,
            category: "house",
            word: "table",
            sentence: "This is a table.",
            image: "https://cdn.pixabay.com/photo/2017/07/24/16/58/table-2535626_640.jpg",
            audio: ""
        },

        // ----- TRANSPORT -----
        {
            id: 19,
            category: "transport",
            word: "car",
            sentence: "This is a car.",
            image: "https://cdn.pixabay.com/photo/2017/07/09/12/22/car-2486537_640.jpg",
            audio: ""
        },
        {
            id: 20,
            category: "transport",
            word: "bus",
            sentence: "This is a bus.",
            image: "https://cdn.pixabay.com/photo/2016/01/23/00/54/bus-1156553_640.jpg",
            audio: ""
        }

    ],

    currentIndex: 0,
    currentCategory: "all"

};

/* =====================================================
UTILITY FUNCTIONS
=====================================================*/

function getCurrentWord() {
    return Database.words[Database.currentIndex];
}

function nextWord() {
    Database.currentIndex++;
    if (Database.currentIndex >= Database.words.length) {
        Database.currentIndex = 0;
    }
    return getCurrentWord();
}

function previousWord() {
    Database.currentIndex--;
    if (Database.currentIndex < 0) {
        Database.currentIndex = Database.words.length - 1;
    }
    return getCurrentWord();
}

function getWordById(id) {
    return Database.words.find(w => w.id === id);
}

function searchWords(text) {
    text = text.toLowerCase();
    return Database.words.filter(word =>
        word.word.toLowerCase().includes(text)
    );
}

function getWordsByCategory(category) {
    if (category === "all") {
        return Database.words;
    }
    return Database.words.filter(
        word => word.category === category
    );
}

function getRandomWord() {
    return Database.words[
        Math.floor(
            Math.random() * Database.words.length
        )
    ];
}

function getRandomWords(number) {
    const copy = [...Database.words];
    copy.sort(() => Math.random() - 0.5);
    return copy.slice(0, number);
}

function populateCategories() {
    const select = document.getElementById("categorySelect");
    if (!select) return;
    Database.categories.forEach(cat => {
        const option = document.createElement("option");
        option.value = cat.id;
        option.textContent = `${cat.icon} ${cat.name}`;
        select.appendChild(option);
    });
}

function setCategory(category) {
    Database.currentCategory = category;
    Database.currentIndex = 0;
}

function vocabularySize() {
    return Database.words.length;
}

function categoryCount() {
    return Database.categories.length;
}

console.log(
    "✅ Vocabulary loaded:",
    vocabularySize(),
    "words in",
    categoryCount(),
    "categories."
);
