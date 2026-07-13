/*
=========================================================
PROGRESS / BADGES
Kids Visual Dictionary
NEW FILE - this was referenced in index.html but never
existed, which is why the badges counter on the Progress
page was permanently stuck at 0.
=========================================================
*/

"use strict";

const Progress = {

    milestones: [5, 10, 15, 20, 25, 30, 36],

    update(){

        const learned = Utils.load("learned", []);

        const badges = this.milestones.filter(
            m => learned.length >= m
        ).length;

        Utils.save("badges", badges);

        const el = document.getElementById("badgesEarned");

        if(el){

            el.textContent = badges;

        }

        return badges;

    }

};

window.addEventListener("load", ()=>{

    Progress.update();

});
