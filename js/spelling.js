/*
=========================================================
SPELLING GAME
Kids Visual Dictionary
NEW FILE - #spellingContainer existed in index.html but no
script ever populated it, so this page was blank.
=========================================================
*/

"use strict";

const Spelling = {

    words: [],

    index: 0,

    score: 0,

    init(){

        this.words = Utils.shuffle(Database.words);

        this.index = 0;

        this.score = 0;

        this.render();

    },

    render(){

        const container = document.getElementById("spellingContainer");

        if(!container) return;

        container.innerHTML = `
        <div class="score-panel">
            <div class="score-box"><h3>Score</h3><h2 id="spellScore">0</h2></div>
            <div class="score-box"><h3>Word</h3><h2 id="spellCount">1 / ${this.words.length}</h2></div>
        </div>
        <div class="spelling-word">
            <img id="spellImage">
            <button id="spellSpeak">🔊 Listen</button>
        </div>
        <input class="spelling-input" id="spellInput"
            type="text" autocomplete="off" placeholder="Type the word...">
        <div style="text-align:center;">
            <button id="spellCheck">Check</button>
        </div>
        `;

        this.showWord();

        document.getElementById("spellSpeak").onclick = ()=>{

            Utils.speak(this.current.word);

        };

        document.getElementById("spellCheck").onclick = ()=>this.check();

        document.getElementById("spellInput").addEventListener("keydown", e=>{

            if(e.key === "Enter") this.check();

        });

    },

    showWord(){

        this.current = this.words[this.index];

        Utils.loadImage(

            document.getElementById("spellImage"),

            this.current.image

        );

        document.getElementById("spellCount").textContent =
            `${this.index+1} / ${this.words.length}`;

        const input = document.getElementById("spellInput");

        input.value = "";

        input.classList.remove("correct-answer","wrong-answer");

        input.focus();

        Utils.speak(this.current.word);

    },

    check(){

        const input = document.getElementById("spellInput");

        const guess = input.value.trim().toLowerCase();

        if(guess === this.current.word.toLowerCase()){

            input.classList.add("correct-answer");

            this.score++;

            document.getElementById("spellScore").textContent = this.score;

            Utils.success();

            Utils.showToast("Correct!");

            let learned = Utils.load("learned", []);

            if(!learned.includes(this.current.id)){

                learned.push(this.current.id);

                Utils.save("learned", learned);

            }

            App.updateProgress();

        }
        else{

            input.classList.add("wrong-answer");

            Utils.errorSound();

            Utils.showToast(`Correct word: ${this.current.word}`);

        }

        setTimeout(()=>{

            this.index++;

            if(this.index >= this.words.length){

                this.index = 0;

            }

            this.showWord();

        },1400);

    }

};

document.addEventListener("click", e=>{

    if(e.target.dataset.page === "spellingPage"){

        setTimeout(()=>Spelling.init(), 100);

    }

});
