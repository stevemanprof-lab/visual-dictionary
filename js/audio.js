/*
=========================================================
AUDIO & SETTINGS
Kids Visual Dictionary
NEW FILE - this was referenced in index.html but never
existed, which is why the ⚙ button, voice picker, speed
slider and dark mode toggle all did nothing.
=========================================================
*/

"use strict";

const AudioSettings = {

    init(){

        const openBtn = document.getElementById("settingsBtn");

        const modal = document.getElementById("settingsModal");

        const voiceSelect = document.getElementById("voiceSelect");

        const rateInput = document.getElementById("speechRate");

        const darkToggle = document.getElementById("darkToggle");

        if(!openBtn || !modal) return;

        openBtn.addEventListener("click", ()=>{

            modal.style.display = "flex";

            this.populateVoices(voiceSelect);

        });

        /* Voices load asynchronously in most browsers */
        if(window.speechSynthesis){

            speechSynthesis.addEventListener("voiceschanged", ()=>{

                this.populateVoices(voiceSelect);

            });

        }

        rateInput.value = Utils.load("speechRate", 1);

        rateInput.addEventListener("input", ()=>{

            Utils.save("speechRate", Number(rateInput.value));

        });

        darkToggle.checked = Utils.load("darkMode", false);

        darkToggle.addEventListener("change", ()=>{

            document.body.classList.toggle("dark", darkToggle.checked);

            Utils.save("darkMode", darkToggle.checked);

        });

        voiceSelect.addEventListener("change", ()=>{

            Utils.save("voiceName", voiceSelect.value);

        });

    },

    populateVoices(select){

        if(!window.speechSynthesis) return;

        const voices = speechSynthesis.getVoices()
            .filter(v => v.lang.startsWith("en"));

        if(!voices.length || select.dataset.filled === "true") return;

        select.innerHTML = "";

        voices.forEach(voice=>{

            const option = document.createElement("option");

            option.value = voice.name;

            option.textContent = `${voice.name} (${voice.lang})`;

            select.appendChild(option);

        });

        const saved = Utils.load("voiceName", null);

        if(saved && voices.some(v=>v.name===saved)){

            select.value = saved;

        }

        select.dataset.filled = "true";

    }

};

document.addEventListener("DOMContentLoaded", ()=>{

    AudioSettings.init();

});
