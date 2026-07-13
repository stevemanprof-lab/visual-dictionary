/*
=========================================================
MEMORY GAME
Kids Visual Dictionary
NEW FILE - #memoryContainer existed in index.html but no
script ever populated it, so this page was blank.
=========================================================
*/

"use strict";

const Memory = {

    flipped: [],

    matches: 0,

    pairs: 6,

    locked: false,

    init(){

        const words = Utils.shuffle(Database.words).slice(0, this.pairs);

        this.cards = Utils.shuffle(

            words.flatMap(w => [
                { word: w.word, image: w.image, id: w.id },
                { word: w.word, image: w.image, id: w.id }
            ])

        ).map((c,i)=>({ ...c, cardId: i }));

        this.flipped = [];

        this.matches = 0;

        this.locked = false;

        this.render();

    },

    render(){

        const container = document.getElementById("memoryContainer");

        if(!container) return;

        container.innerHTML = `
        <div class="score-panel">
            <div class="score-box"><h3>Pairs found</h3><h2 id="memScore">0 / ${this.pairs}</h2></div>
        </div>
        <div class="memory-grid" id="memGrid"></div>
        `;

        const grid = document.getElementById("memGrid");

        this.cards.forEach(card=>{

            const el = document.createElement("div");

            el.className = "memory-card";

            el.dataset.cardId = card.cardId;

            el.textContent = "❓";

            el.addEventListener("click", ()=>this.flip(card, el));

            grid.appendChild(el);

        });

    },

    flip(card, el){

        if(this.locked) return;

        if(el.classList.contains("revealed")) return;

        if(this.flipped.some(f=>f.card.cardId===card.cardId)) return;

        el.textContent = card.word;

        el.classList.add("revealed");

        this.flipped.push({ card, el });

        if(this.flipped.length === 2){

            this.locked = true;

            const [a,b] = this.flipped;

            if(a.card.id === b.card.id){

                a.el.classList.add("correct-answer");

                b.el.classList.add("correct-answer");

                this.matches++;

                Utils.success();

                document.getElementById("memScore").textContent =
                    `${this.matches} / ${this.pairs}`;

                this.flipped = [];

                this.locked = false;

                if(this.matches === this.pairs){

                    Utils.showToast("You matched them all!");

                }

            }
            else{

                Utils.errorSound();

                setTimeout(()=>{

                    a.el.textContent = "❓";

                    b.el.textContent = "❓";

                    a.el.classList.remove("revealed");

                    b.el.classList.remove("revealed");

                    this.flipped = [];

                    this.locked = false;

                },900);

            }

        }

    }

};

document.addEventListener("click", e=>{

    if(e.target.dataset.page === "memoryPage"){

        setTimeout(()=>Memory.init(), 100);

    }

});
