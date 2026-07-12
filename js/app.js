/*
=========================================================
KIDS VISUAL DICTIONARY
MAIN APPLICATION
=========================================================
*/

"use strict";

const App = {

    currentWords: [],

    currentIndex: 0,

    currentCategory: "all",

    currentWord: null,

    init() {

        this.cache();

        this.populateCategories();

        this.bindEvents();

        this.currentWords = Database.words;

        this.showWord(0);

        this.updateProgress();

        console.log("Visual Dictionary Loaded");

    },

    cache() {

        this.lessonImage = document.getElementById("lessonImage");

        this.lessonWord = document.getElementById("lessonWord");

        this.lessonSentence = document.getElementById("lessonSentence");

        this.categorySelect = document.getElementById("categorySelect");

        this.searchInput = document.getElementById("searchWord");

        this.nextButton = document.getElementById("nextButton");

        this.speakButton = document.getElementById("speakButton");

    },

    bindEvents() {

        /* ===========================
           PAGE NAVIGATION
        ============================ */

        document.querySelectorAll("[data-page]").forEach(button => {

            button.addEventListener("click", () => {

                Utils.showPage(button.dataset.page);

            });

        });

        document.querySelectorAll(".backButton").forEach(button => {

            button.addEventListener("click", () => {

                Utils.showPage("homePage");

            });

        });

        /* ===========================
           NEXT WORD
        ============================ */

        this.nextButton.addEventListener("click", () => {

            this.next();

        });

        /* ===========================
           SPEAK
        ============================ */

        this.speakButton.addEventListener("click", () => {

            if (this.currentWord) {

                Utils.speak(this.currentWord.word);

            }

        });

        /* ===========================
           CATEGORY
        ============================ */

        this.categorySelect.addEventListener("change", e => {

            this.changeCategory(e.target.value);

        });

        /* ===========================
           SEARCH
        ============================ */

        this.searchInput.addEventListener("input", e => {

            this.search(e.target.value);

        });

    },

    populateCategories() {

        Database.categories.forEach(category => {

            const option = document.createElement("option");

            option.value = category.id;

            option.textContent =
                `${category.icon} ${category.name}`;

            this.categorySelect.appendChild(option);

        });

    },

    changeCategory(category) {

        this.currentCategory = category;

        if (category === "all") {

            this.currentWords = Database.words;

        } else {

            this.currentWords = Database.words.filter(

                word => word.category === category

            );

        }

        this.currentIndex = 0;

        this.showWord(0);

    },

    search(text) {

        text = text.trim().toLowerCase();

        if (text === "") {

            this.changeCategory(this.currentCategory);

            return;

        }

        this.currentWords = Database.words.filter(word =>

            word.word.toLowerCase().includes(text)

        );

        this.currentIndex = 0;

        this.showWord(0);

    },

    showWord(index) {

        if (!this.currentWords.length) {

            this.lessonWord.textContent = "No word found";

            this.lessonSentence.textContent = "";

            this.lessonImage.src = "";

            return;

        }

        this.currentIndex = index;

        this.currentWord = this.currentWords[index];

        this.lessonWord.textContent =
            this.currentWord.word;

        this.lessonSentence.textContent =
            this.currentWord.sentence;

        Utils.loadImage(

            this.lessonImage,

            this.currentWord.image

        );

    },

    next() {

        this.currentIndex++;

        if (this.currentIndex >= this.currentWords.length) {

            this.currentIndex = 0;

        }

        this.showWord(this.currentIndex);

        Utils.speak(this.currentWord.word);

    },

    previous() {

        this.currentIndex--;

        if (this.currentIndex < 0) {

            this.currentIndex =
                this.currentWords.length - 1;

        }

        this.showWord(this.currentIndex);

    },

    randomWord() {

        this.currentIndex = Math.floor(

            Math.random() *

            this.currentWords.length

        );

        this.showWord(this.currentIndex);

    },

    markLearned() {

        let learned = Utils.load(

            "learned",

            []

        );

        if (

            !learned.includes(

                this.currentWord.id

            )

        ) {

            learned.push(

                this.currentWord.id

            );

            Utils.save(

                "learned",

                learned

            );

        }

        this.updateProgress();

    },

    updateProgress() {

        const learned =

            Utils.load(

                "learned",

                []

            );

        const percent = Math.round(

            learned.length *

            100 /

            Database.words.length

        );

        const circle =

            document.getElementById(

                "progressCircle"

            );

        if (circle) {

            circle.textContent =

                percent + "%";

        }

        const words =

            document.getElementById(

                "wordsLearned"

            );

        if (words) {

            words.textContent =

                learned.length;

        }

    }

};

/* ======================================
   CLICK IMAGE TO LISTEN
====================================== */

document.addEventListener(

    "click",

    e => {

        if (

            e.target.id ===

            "lessonImage"

        ) {

            if (

                App.currentWord

            ) {

                Utils.speak(

                    App.currentWord.word

                );

            }

        }

    }

);

/* ======================================
   DOUBLE CLICK = NEXT
====================================== */

document.addEventListener(

    "dblclick",

    e => {

        if (

            e.target.id ===

            "lessonImage"

        ) {

            App.next();

        }

    }

);

/* ======================================
   KEYBOARD SHORTCUTS
====================================== */

document.addEventListener(

    "keydown",

    e => {

        switch (e.key) {

            case "ArrowRight":

                App.next();

                break;

            case "ArrowLeft":

                App.previous();

                break;

            case " ":

                e.preventDefault();

                if (App.currentWord) {

                    Utils.speak(

                        App.currentWord.word

                    );

                }

                break;

        }

    }

);

/* ======================================
   START
====================================== */

window.addEventListener(

    "DOMContentLoaded",

    () => {

        App.init();

    }

);
