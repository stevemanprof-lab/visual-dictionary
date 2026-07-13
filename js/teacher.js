/*
=========================================================
TEACHER AREA
Kids Visual Dictionary
NEW FILE - this was referenced in index.html but never
existed, which is why the 👨‍🏫 button did nothing.
=========================================================
*/

"use strict";

const Teacher = {

    password: "teacher123",

    unlocked: false,

    init(){

        const openBtn = document.getElementById("teacherBtn");

        const modal = document.getElementById("teacherModal");

        const loginBtn = document.getElementById("teacherLogin");

        const passwordInput = document.getElementById("teacherPassword");

        if(!openBtn || !modal) return;

        openBtn.addEventListener("click", ()=>{

            modal.style.display = "flex";

            passwordInput.value = "";

            passwordInput.focus();

        });

        loginBtn.addEventListener("click", ()=>{

            this.tryLogin(passwordInput.value, modal);

        });

        passwordInput.addEventListener("keydown", e=>{

            if(e.key === "Enter"){

                this.tryLogin(passwordInput.value, modal);

            }

        });

    },

    tryLogin(value, modal){

        if(value === this.password){

            this.unlocked = true;

            Utils.showToast("Welcome, Teacher!");

            modal.style.display = "none";

            this.showPanel();

        }
        else{

            Utils.showToast("Wrong password");

        }

    },

    showPanel(){

        let panel = document.getElementById("teacherPanel");

        if(panel){

            panel.remove();

        }

        panel = document.createElement("div");

        panel.id = "teacherPanel";

        panel.className = "modal";

        panel.style.display = "flex";

        const learned = Utils.load("learned", []);

        const stars = Utils.load("stars", 0);

        panel.innerHTML = `
        <div class="modalContent">
            <h2>Teacher Dashboard</h2>
            <p>Words learned: <b>${learned.length}</b> / ${Database.words.length}</p>
            <p>Stars earned: <b>${stars}</b></p>
            <button id="teacherReset">Reset all progress</button>
            <button class="closeModal">Close</button>
        </div>`;

        document.body.appendChild(panel);

        panel.querySelector(".closeModal").addEventListener("click", ()=>{

            panel.style.display = "none";

        });

        panel.addEventListener("click", e=>{

            if(e.target === panel){

                panel.style.display = "none";

            }

        });

        document.getElementById("teacherReset").addEventListener("click", ()=>{

            Utils.save("learned", []);

            Utils.save("stars", 0);

            Utils.save("words", 0);

            App.updateProgress();

            Utils.showToast("Progress reset");

            panel.style.display = "none";

        });

    }

};

document.addEventListener("DOMContentLoaded", ()=>{

    Teacher.init();

});
