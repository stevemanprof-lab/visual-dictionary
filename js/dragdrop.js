/*
=========================================================
DRAG & DROP GAME
Kids Visual Dictionary
NEW FILE - #dragContainer existed in index.html but no
script ever populated it, so this page was blank.
=========================================================
*/

"use strict";

const DragDrop = {

    round: [],

    score: 0,

    total: 0,

    matched: 0,

    init(){

        this.words = [...Database.words];

        this.score = 0;

        this.total = 0;

        this.nextRound();

    },

    nextRound(){

        this.total++;

        this.round = Utils.shuffle(this.words).slice(0,4);

        this.matched = 0;

        this.render();

    },

    render(){

        const container = document.getElementById("dragContainer");

        if(!container) return;

        const zones = this.round.map(w => `
            <div class="drop-zone" data-word="${w.word}">
                <img src="${w.image}" alt="${w.word}"
                    style="width:70px;height:70px;object-fit:contain;pointer-events:none;">
            </div>
        `).join("");

        const chips = Utils.shuffle(this.round).map(w => `
            <div class="draggable" draggable="true" data-word="${w.word}">
                ${w.word}
            </div>
        `).join("");

        container.innerHTML = `
        <div class="score-panel">
            <div class="score-box"><h3>Matched</h3><h2 id="dragScore">0 / ${this.round.length}</h2></div>
            <div class="score-box"><h3>Round</h3><h2 id="dragCount">${this.total}</h2></div>
        </div>
        <h2 class="quiz-title">Drag each word to its picture</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:20px;margin:25px 0;">
            ${zones}
        </div>
        <div style="display:flex;flex-wrap:wrap;justify-content:center;">
            ${chips}
        </div>
        `;

        this.bind();

    },

    bind(){

        const chips = document.querySelectorAll("#dragContainer .draggable");

        const zones = document.querySelectorAll("#dragContainer .drop-zone");

        chips.forEach(chip=>{

            chip.addEventListener("dragstart", e=>{

                e.dataTransfer.setData("text/plain", chip.dataset.word);

            });

            /* touch/mobile fallback: tap chip, then tap zone */
            chip.addEventListener("click", ()=>{

                document.querySelectorAll("#dragContainer .draggable")
                    .forEach(c=>c.classList.remove("selected-chip"));

                chip.classList.add("selected-chip");

                chip.style.outline = "3px solid var(--primary)";

            });

        });

        zones.forEach(zone=>{

            zone.addEventListener("dragover", e=>{

                e.preventDefault();

            });

            zone.addEventListener("drop", e=>{

                e.preventDefault();

                const word = e.dataTransfer.getData("text/plain");

                this.tryMatch(word, zone);

            });

            zone.addEventListener("click", ()=>{

                const selected = document.querySelector("#dragContainer .draggable.selected-chip");

                if(selected){

                    this.tryMatch(selected.dataset.word, zone);

                }

            });

        });

    },

    tryMatch(word, zone){

        if(zone.dataset.word !== word || zone.classList.contains("correct-answer")) return;

        const chip = document.querySelector(`#dragContainer .draggable[data-word="${word}"]`);

        zone.classList.add("correct-answer");

        zone.innerHTML += `<div style="font-weight:bold;margin-top:6px;">${word}</div>`;

        if(chip) chip.remove();

        this.matched++;

        Utils.success();

        document.getElementById("dragScore").textContent =
            `${this.matched} / ${this.round.length}`;

        if(this.matched === this.round.length){

            let learned = Utils.load("learned", []);

            this.round.forEach(w=>{

                if(!learned.includes(w.id)) learned.push(w.id);

            });

            Utils.save("learned", learned);

            App.updateProgress();

            Utils.showToast("Great job!");

            setTimeout(()=>this.nextRound(), 1500);

        }

    }

};

document.addEventListener("click", e=>{

    if(e.target.dataset.page === "dragPage"){

        setTimeout(()=>DragDrop.init(), 100);

    }

});
