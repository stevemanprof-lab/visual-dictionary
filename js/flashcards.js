/*
=========================================================
FLASHCARDS MODULE
Kids Visual Dictionary
=========================================================
*/

"use strict";

const Flashcards = {

    words: [],
    index: 0,
    autoPlay: null,

    init() {

        this.words = [...Database.words];

        this.createInterface();

        this.showCard();

    },

    createInterface() {

        const container = document.getElementById("flashcardContainer");

        if(!container) return;

        container.innerHTML = `

        <div class="flashcard-toolbar">

            <button id="fcPrevious">⬅ Previous</button>

            <button id="fcShuffle">🔀 Shuffle</button>

            <button id="fcRandom">🎲 Random</button>

            <button id="fcSpeak">🔊 Listen</button>

            <button id="fcAuto">▶ Auto</button>

            <button id="fcNext">Next ➜</button>

        </div>

        <div class="flashcard" id="flashCard">

            <div class="flash-front">

                <img id="fcImage">

                <h2 id="fcWord"></h2>

            </div>

            <div class="flash-back">

                <h2 id="fcWordBack"></h2>

                <p id="fcSentence"></p>

                <button id="fcRepeat">

                    🔊 Repeat

                </button>

            </div>

        </div>

        <div class="flash-info">

            <span id="fcCounter"></span>

        </div>

        `;

        this.cache();

        this.events();

    },

    cache() {

        this.card = document.getElementById("flashCard");

        this.image = document.getElementById("fcImage");

        this.word = document.getElementById("fcWord");

        this.wordBack = document.getElementById("fcWordBack");

        this.sentence = document.getElementById("fcSentence");

        this.counter = document.getElementById("fcCounter");

    },

    events() {

        this.card.onclick = ()=>{

            this.flip();

        };

        document.getElementById("fcSpeak").onclick=()=>{

            this.speak();

        };

        document.getElementById("fcRepeat").onclick=()=>{

            this.speak();

        };

        document.getElementById("fcNext").onclick=()=>{

            this.next();

        };

        document.getElementById("fcPrevious").onclick=()=>{

            this.previous();

        };

        document.getElementById("fcRandom").onclick=()=>{

            this.random();

        };

        document.getElementById("fcShuffle").onclick=()=>{

            this.shuffle();

        };

        document.getElementById("fcAuto").onclick=()=>{

            this.toggleAuto();

        };

    },

    showCard(){

        const item=this.words[this.index];

        Utils.loadImage(

            this.image,

            item.image

        );

        this.word.textContent=item.word;

        this.wordBack.textContent=item.word;

        this.sentence.textContent=item.sentence;

        this.counter.textContent=

            `${this.index+1} / ${this.words.length}`;

        this.card.classList.remove("flip");

    },

    flip(){

        this.card.classList.toggle("flip");

    },

    next(){

        this.index++;

        if(this.index>=this.words.length){

            this.index=0;

        }

        this.showCard();

    },

    previous(){

        this.index--;

        if(this.index<0){

            this.index=this.words.length-1;

        }

        this.showCard();

    },

    random(){

        this.index=Math.floor(

            Math.random()*this.words.length

        );

        this.showCard();

    },

    shuffle(){

        this.words=Utils.shuffle(this.words);

        this.index=0;

        this.showCard();

        Utils.showToast("Cards shuffled");

    },

    speak(){

        const item=this.words[this.index];

        Utils.speak(item.word);

    },

    toggleAuto(){

        const button=document.getElementById("fcAuto");

        if(this.autoPlay){

            clearInterval(this.autoPlay);

            this.autoPlay=null;

            button.innerHTML="▶ Auto";

            return;

        }

        button.innerHTML="⏸ Stop";

        this.autoPlay=setInterval(()=>{

            this.next();

            this.speak();

        },4000);

    }

};

/* ------------------------------------- */

document.addEventListener(

    "click",

    e=>{

        if(

            e.target.dataset.page==="flashcardPage"

        ){

            setTimeout(()=>{

                Flashcards.init();

            },100);

        }

    }

);

/* ------------------------------------- */

document.addEventListener(

    "keydown",

    e=>{

        const page=document.getElementById(

            "flashcardPage"

        );

        if(!page.classList.contains("active"))

            return;

        switch(e.key){

            case "ArrowRight":

                Flashcards.next();

                break;

            case "ArrowLeft":

                Flashcards.previous();

                break;

            case " ":

                e.preventDefault();

                Flashcards.flip();

                break;

            case "Enter":

                Flashcards.speak();

                break;

        }

    }

);
