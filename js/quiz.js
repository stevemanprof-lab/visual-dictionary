/*
=========================================================
QUIZ GAME
Picture -> Choose the Correct Word
=========================================================
*/

"use strict";

const Quiz={

    words:[],

    score:0,

    total:0,

    current:null,

    options:[],

    init(){

        this.words=[...Database.words];

        this.score=0;

        this.total=0;

        this.createInterface();

        this.nextQuestion();

    },

    createInterface(){

        const container=document.getElementById("quizContainer");

        if(!container) return;

        container.innerHTML=`

        <div class="score-panel">

            <div class="score-box">

                <h3>Score</h3>

                <h2 id="quizScore">0</h2>

            </div>

            <div class="score-box">

                <h3>Question</h3>

                <h2 id="quizCount">0</h2>

            </div>

        </div>

        <div class="quiz-question">

            <img id="quizImage">

            <h2 class="quiz-title">

                What is this?

            </h2>

            <div class="quiz-options"

                 id="quizOptions">

            </div>

        </div>

        <div style="text-align:center;margin-top:25px;">

            <button id="quizSpeak">

                🔊 Listen

            </button>

        </div>

        `;

        document.getElementById("quizSpeak")

        .onclick=()=>{

            Utils.speak(this.current.word);

        };

    },

    nextQuestion(){

        this.total++;

        this.current=

            Utils.randomItem(this.words);

        this.options=[this.current];

        while(this.options.length<4){

            const candidate=

                Utils.randomItem(this.words);

            if(

                !this.options.some(

                    w=>w.id===candidate.id

                )

            ){

                this.options.push(candidate);

            }

        }

        this.options=

            Utils.shuffle(this.options);

        this.render();

    },

    render(){

        Utils.loadImage(

            document.getElementById("quizImage"),

            this.current.image

        );

        document.getElementById("quizScore")

        .textContent=this.score;

        document.getElementById("quizCount")

        .textContent=this.total;

        const area=

            document.getElementById(

                "quizOptions"

            );

        area.innerHTML="";

        this.options.forEach(option=>{

            const button=

                document.createElement("button");

            button.textContent=

                option.word;

            button.onclick=()=>{

                this.answer(

                    option,

                    button

                );

            };

            area.appendChild(button);

        });

    },

    answer(choice,button){

        const buttons=

            document.querySelectorAll(

                "#quizOptions button"

            );

        buttons.forEach(btn=>{

            btn.disabled=true;

        });

        if(choice.id===this.current.id){

            button.classList.add(

                "correct-answer"

            );

            this.score++;

            Utils.success();

            Utils.speak(choice.word);

            Utils.showToast(

                "Excellent!"

            );

            let learned=

                Utils.load(

                    "learned",

                    []

                );

            if(

                !learned.includes(

                    choice.id

                )

            ){

                learned.push(choice.id);

                Utils.save(

                    "learned",

                    learned

                );

            }

            App.updateProgress();

        }

        else{

            button.classList.add(

                "wrong-answer"

            );

            Utils.errorSound();

            Utils.showToast(

                "Try again!"

            );

            buttons.forEach(btn=>{

                if(

                    btn.textContent===

                    this.current.word

                ){

                    btn.classList.add(

                        "correct-answer"

                    );

                }

            });

        }

        document.getElementById(

            "quizScore"

        ).textContent=this.score;

        setTimeout(()=>{

            this.nextQuestion();

        },1800);

    }

};

/* =======================================
OPEN QUIZ
======================================= */

document.addEventListener(

    "click",

    e=>{

        if(

            e.target.dataset.page===

            "quizPage"

        ){

            setTimeout(()=>{

                Quiz.init();

            },100);

        }

    }

);

/* =======================================
KEYBOARD
======================================= */

document.addEventListener(

    "keydown",

    e=>{

        const page=

            document.getElementById(

                "quizPage"

            );

        if(

            !page.classList.contains(

                "active"

            )

        ) return;

        const buttons=

            document.querySelectorAll(

                "#quizOptions button"

            );

        if(

            e.key>="1" &&

            e.key<="4"

        ){

            const index=

                Number(e.key)-1;

            if(buttons[index]){

                buttons[index].click();

            }

        }

        if(e.key===" "){

            e.preventDefault();

            Utils.speak(

                Quiz.current.word

            );

        }

    }

);
