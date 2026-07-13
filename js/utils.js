/*
=========================================================
KIDS VISUAL DICTIONARY
UTILITY FUNCTIONS
Version 1.1 - FIXED: fallback image, shared AudioContext, speech rate
=========================================================
*/

"use strict";

/* ==========================================
   SELECTORS
========================================== */

const $ = selector => document.querySelector(selector);

const $$ = selector => document.querySelectorAll(selector);

/* ==========================================
   RANDOM
========================================== */

function random(min, max){

    return Math.floor(Math.random() * (max - min + 1)) + min;

}

function randomItem(array){

    return array[random(0, array.length - 1)];

}

function shuffle(array){

    const arr = [...array];

    for(let i = arr.length - 1; i > 0; i--){

        const j = Math.floor(Math.random() * (i + 1));

        [arr[i], arr[j]] = [arr[j], arr[i]];

    }

    return arr;

}

/* ==========================================
   PAGE NAVIGATION
========================================== */

function showPage(pageId){

    document.querySelectorAll(".page").forEach(page=>{

        page.classList.remove("active");

    });

    const page = document.getElementById(pageId);

    if(page){

        page.classList.add("active");

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    }

}

/* ==========================================
   TOAST MESSAGE
========================================== */

function showToast(message){

    const toast = $("#toast");

    if(!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toast.timer);

    toast.timer = setTimeout(()=>{

        toast.classList.remove("show");

    },2500);

}

/* ==========================================
   SPEAK
========================================== */

function speak(text){

    if(!window.speechSynthesis) return;

    speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(text);

    utter.lang="en-US";

    utter.rate = load("speechRate", 1);

    const voices = speechSynthesis.getVoices();

    if(voices.length){

        const savedVoiceName = load("voiceName", null);

        utter.voice =
            (savedVoiceName && voices.find(v=>v.name===savedVoiceName)) ||
            voices.find(v=>v.lang.startsWith("en")) ||
            voices[0];

    }

    speechSynthesis.speak(utter);

}

/* ==========================================
   IMAGE LOADER
========================================== */

function loadImage(imgElement,path){

    imgElement.onerror=function(){

        this.onerror=null;

        this.src="assets/icons/image-not-found.svg";

    }

    imgElement.src = path;

}

/* ==========================================
   LOCAL STORAGE
========================================== */

function save(key,value){

    localStorage.setItem(

        key,

        JSON.stringify(value)

    );

}

function load(key,defaultValue){

    const data = localStorage.getItem(key);

    if(!data) return defaultValue;

    try{

        return JSON.parse(data);

    }

    catch{

        return defaultValue;

    }

}

/* ==========================================
   PROGRESS
========================================== */

function increaseStars(){

    let stars = load("stars",0);

    stars++;

    save("stars",stars);

    const element=$("#starsEarned");

    if(element){

        element.textContent=stars;

    }

}

function increaseWords(){

    let words = load("words",0);

    words++;

    save("words",words);

    const element=$("#wordsLearned");

    if(element){

        element.textContent=words;

    }

}

/* ==========================================
   CONFETTI
========================================== */

function createConfetti(){

    const container=$("#confettiContainer");

    if(!container) return;

    const colors=[

        "#4FC3F7",

        "#66BB6A",

        "#FFD54F",

        "#EF5350",

        "#AB47BC"

    ];

    for(let i=0;i<80;i++){

        const piece=document.createElement("div");

        piece.className="confetti";

        piece.style.left=random(0,100)+"vw";

        piece.style.background=randomItem(colors);

        piece.style.animationDelay=(Math.random()*1.5)+"s";

        piece.style.transform=`rotate(${random(0,360)}deg)`;

        container.appendChild(piece);

        setTimeout(()=>{

            piece.remove();

        },4000);

    }

}

/* ==========================================
   STARS
========================================== */

function createStar(x,y){

    const star=document.createElement("div");

    star.className="star";

    star.innerHTML="⭐";

    star.style.left=x+"px";

    star.style.top=y+"px";

    document.body.appendChild(star);

    setTimeout(()=>{

        star.remove();

    },1500);

}

/* ==========================================
   LOADING
========================================== */

function hideLoading(){

    const loading=$("#loadingScreen");

    if(!loading) return;

    let width=0;

    const fill=$("#loadingFill");

    const timer=setInterval(()=>{

        width+=5;

        fill.style.width=width+"%";

        if(width>=100){

            clearInterval(timer);

            setTimeout(()=>{

                loading.style.display="none";

            },300);

        }

    },25);

}

/* ==========================================
   SEARCH
========================================== */

function filterWords(text){

    text=text.toLowerCase();

    return Database.words.filter(item=>

        item.word.toLowerCase().includes(text)

    );

}

/* ==========================================
   CATEGORY
========================================== */

function categoryWords(category){

    if(category==="all"){

        return Database.words;

    }

    return Database.words.filter(

        item=>item.category===category

    );

}

/* ==========================================
   SCORE
========================================== */

function addScore(points){

    let score=load("score",0);

    score+=points;

    save("score",score);

    return score;

}

/* ==========================================
   SOUND EFFECTS
   FIXED: one shared AudioContext instead of a new
   one on every beep (avoids hitting browser limits)
========================================== */

let _audioCtx=null;

function getAudioCtx(){

    if(!_audioCtx){

        _audioCtx=new (window.AudioContext||window.webkitAudioContext)();

    }

    if(_audioCtx.state==="suspended"){

        _audioCtx.resume();

    }

    return _audioCtx;

}

function beep(freq=500,time=120){

    const ctx=getAudioCtx();

    const osc=ctx.createOscillator();

    const gain=ctx.createGain();

    osc.connect(gain);

    gain.connect(ctx.destination);

    osc.frequency.value=freq;

    osc.start();

    gain.gain.exponentialRampToValueAtTime(

        0.0001,

        ctx.currentTime+time/1000

    );

    osc.stop(ctx.currentTime+time/1000);

}

/* ==========================================
   SUCCESS
========================================== */

function success(){

    beep(700,120);

    setTimeout(()=>{

        beep(900,120);

    },120);

    createConfetti();

}

/* ==========================================
   ERROR
========================================== */

function errorSound(){

    beep(200,250);

}

/* ==========================================
   DARK MODE (applied on load if previously saved)
========================================== */

function applyDarkMode(){

    if(load("darkMode",false)){

        document.body.classList.add("dark");

    }

}

/* ==========================================
   INIT
========================================== */

window.addEventListener("load",()=>{

    hideLoading();

    applyDarkMode();

    const stars=$("#starsEarned");

    if(stars){

        stars.textContent=load("stars",0);

    }

    const words=$("#wordsLearned");

    if(words){

        words.textContent=load("words",0);

    }

});

/* ==========================================
   GLOBAL EXPORTS
========================================== */

window.Utils={

    showPage,

    showToast,

    speak,

    loadImage,

    createConfetti,

    createStar,

    shuffle,

    random,

    randomItem,

    filterWords,

    categoryWords,

    addScore,

    success,

    errorSound,

    save,

    load,

    beep,

    applyDarkMode

};
