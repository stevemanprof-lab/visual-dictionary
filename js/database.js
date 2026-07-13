/*
=========================================================
KIDS VISUAL DICTIONARY
DATABASE ENGINE
Version 1.1 - FIXED: every category now has words
=========================================================
*/

const Database = {

    categories: [

        { id: "animals", name: "Animals", icon: "🐶" },
        { id: "food", name: "Food", icon: "🍎" },
        { id: "body", name: "Body", icon: "🖐" },
        { id: "school", name: "School", icon: "🎒" },
        { id: "house", name: "House", icon: "🏠" },
        { id: "family", name: "Family", icon: "👨‍👩‍👧" },
        { id: "clothes", name: "Clothes", icon: "👕" },
        { id: "transport", name: "Transport", icon: "🚗" },
        { id: "nature", name: "Nature", icon: "🌳" },
        { id: "weather", name: "Weather", icon: "☀" },
        { id: "sports", name: "Sports", icon: "⚽" },
        { id: "jobs", name: "Jobs", icon: "👨‍⚕️" }

    ],

    words: [

        { id:1, category:"animals", word:"dog", sentence:"This is a dog.", image:"assets/animals/dog.webp" },
        { id:2, category:"animals", word:"cat", sentence:"This is a cat.", image:"assets/animals/cat.webp" },
        { id:3, category:"animals", word:"elephant", sentence:"This is an elephant.", image:"assets/animals/elephant.webp" },
        { id:4, category:"animals", word:"lion", sentence:"This is a lion.", image:"assets/animals/lion.webp" },
        { id:5, category:"animals", word:"monkey", sentence:"This is a monkey.", image:"assets/animals/monkey.webp" },

        { id:6, category:"food", word:"apple", sentence:"This is an apple.", image:"assets/food/apple.png" },
        { id:7, category:"food", word:"banana", sentence:"This is a banana.", image:"assets/food/banana.webp" },
        { id:8, category:"food", word:"bread", sentence:"This is bread.", image:"assets/food/bread.jpg" },
        { id:9, category:"food", word:"milk", sentence:"This is milk.", image:"assets/food/milk.webp" },

        { id:10, category:"school", word:"book", sentence:"This is a book.", image:"assets/school/book.jpg" },
        { id:11, category:"school", word:"pen", sentence:"This is a pen.", image:"assets/school/pen.jpg" },
        { id:12, category:"school", word:"pencil", sentence:"This is a pencil.", image:"assets/school/pencil.webp" },
        { id:13, category:"school", word:"bag", sentence:"This is a school bag.", image:"assets/school/bag.webp" },

        { id:14, category:"body", word:"head", sentence:"This is my head.", image:"assets/body/head.webp" },
        { id:15, category:"body", word:"hand", sentence:"This is my hand.", image:"assets/body/hand.webp" },
        { id:16, category:"body", word:"eye", sentence:"This is my eye.", image:"assets/body/eye.webp" },

        { id:17, category:"house", word:"chair", sentence:"This is a chair.", image:"assets/house/chair.webp" },
        { id:18, category:"house", word:"table", sentence:"This is a table.", image:"assets/house/table.webp" },

        { id:19, category:"transport", word:"car", sentence:"This is a car.", image:"assets/transport/car.webp" },
        { id:20, category:"transport", word:"bus", sentence:"This is a bus.", image:"assets/transport/bus.webp" },

        { id:21, category:"family", word:"mother", sentence:"This is my mother.", image:"assets/family/mother.webp" },
        { id:22, category:"family", word:"father", sentence:"This is my father.", image:"assets/family/father.webp" },
        { id:23, category:"family", word:"sister", sentence:"This is my sister.", image:"assets/family/sister.webp" },

        { id:24, category:"clothes", word:"shirt", sentence:"This is a shirt.", image:"assets/clothes/shirt.webp" },
        { id:25, category:"clothes", word:"shoes", sentence:"These are shoes.", image:"assets/clothes/shoes.webp" },
        { id:26, category:"clothes", word:"hat", sentence:"This is a hat.", image:"assets/clothes/hat.webp" },

        { id:27, category:"nature", word:"tree", sentence:"This is a tree.", image:"assets/nature/tree.webp" },
        { id:28, category:"nature", word:"flower", sentence:"This is a flower.", image:"assets/nature/flower.webp" },
        { id:29, category:"nature", word:"river", sentence:"This is a river.", image:"assets/nature/river.webp" },

        { id:30, category:"weather", word:"sun", sentence:"The sun is bright.", image:"assets/weather/sun.webp" },
        { id:31, category:"weather", word:"rain", sentence:"It is raining.", image:"assets/weather/rain.webp" },
        { id:32, category:"weather", word:"cloud", sentence:"I see a cloud.", image:"assets/weather/cloud.webp" },

        { id:33, category:"sports", word:"ball", sentence:"This is a ball.", image:"assets/sports/ball.webp" },
        { id:34, category:"sports", word:"bike", sentence:"This is a bike.", image:"assets/sports/bike.webp" },

        { id:35, category:"jobs", word:"doctor", sentence:"She is a doctor.", image:"assets/jobs/doctor.webp" },
        { id:36, category:"jobs", word:"teacher", sentence:"He is a teacher.", image:"assets/jobs/teacher.webp" }

    ],

    currentIndex:0,

    currentCategory:"all"

};

/* =====================================================
UTILITY FUNCTIONS
=====================================================*/

function getCurrentWord(){

    return Database.words[Database.currentIndex];

}

function nextWord(){

    Database.currentIndex++;

    if(Database.currentIndex>=Database.words.length){

        Database.currentIndex=0;

    }

    return getCurrentWord();

}

function previousWord(){

    Database.currentIndex--;

    if(Database.currentIndex<0){

        Database.currentIndex=Database.words.length-1;

    }

    return getCurrentWord();

}

function getWordById(id){

    return Database.words.find(w=>w.id===id);

}

function searchWords(text){

    text=text.toLowerCase();

    return Database.words.filter(word=>

        word.word.toLowerCase().includes(text)

    );

}

function getWordsByCategory(category){

    if(category==="all"){

        return Database.words;

    }

    return Database.words.filter(

        word=>word.category===category

    );

}

function getRandomWord(){

    return Database.words[

        Math.floor(

            Math.random()*Database.words.length

        )

    ];

}

function getRandomWords(number){

    const copy=[...Database.words];

    copy.sort(()=>Math.random()-0.5);

    return copy.slice(0,number);

}

function populateCategories(){

    const select=document.getElementById("categorySelect");

    if(!select) return;

    Database.categories.forEach(cat=>{

        const option=document.createElement("option");

        option.value=cat.id;

        option.textContent=`${cat.icon} ${cat.name}`;

        select.appendChild(option);

    });

}

function setCategory(category){

    Database.currentCategory=category;

    Database.currentIndex=0;

}

function vocabularySize(){

    return Database.words.length;

}

function categoryCount(){

    return Database.categories.length;

}

console.log(

    "Vocabulary loaded:",

    vocabularySize(),

    "words in",

    categoryCount(),

    "categories."

);
