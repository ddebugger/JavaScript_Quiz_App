// referecing and calling some containers
const question = document.getElementById("Questions");
const Options = Array.from(document.getElementsByClassName("options-answers__text"));
const hudQuestionCounter = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

// declaring some variables
let currentQuestions = {};
let acceptQuestions = false;
let score = 0;
let questionsCounter = 0;
let avaliableQuestions = [];



// creating an array of random questions
let questions = [
    {
        question: "Inside which HTML tag do we put the JavaScript??",
        option1: "<script>",
        option2: "<JavaScript>",
        option3: "<js>",
        option4: "</script>",
        answer: 1
    },

    {
        question: "What is the correct syntax for linking an external style called 'script.css' ??",
        option1: "<link file='script.css'>",
        option2: "<link href='script.css'>",
        option3: "<link name='script.css'>",
        option4: "<link src='script.css'>",
        answer: 2
    },

    {
        question: "How do you write 'Hello World' as an alert??",
        option1: "console.log('Hello World')",
        option2: "alert('Hello World')",
        option3: "console.log(Hello World);",
        option4: "alert('Hello World');",
        answer: 4
    },

    {
        question: "Which of these JavaScript keywords declares immutable variables??",
        option1: "let",
        option2: "var",
        option3: "const",
        option4: "varchar",
        answer: 3
    },

    {
        question: "how do you access a DOM element in JavaSrcipt??",
        option1: "document.getElementById()",
        option2: "document.getElementByClassName()",
        option3: "document.querySelector()",
        option4: "All of the Above",
        answer: 4
    },
] 


// constanst
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;


// function to start game
startGame = () => {
    questionsCounter = 0;
    score = 0;
    avaliableQuestions = [...questions];
    // console.log(avaliableQuestions);
    getNewQuestion();
};

getNewQuestion = () =>{
    if(avaliableQuestions.length === 0 || questionsCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score);
        // go to end page
        return window.location.assign("./end.html");
    }

    questionsCounter++;
    hudQuestionCounter.innerText = questionsCounter + "/" + MAX_QUESTIONS;
    const questionIndex = Math.floor(Math.random() * avaliableQuestions.length);
    currentQuestions = avaliableQuestions[questionIndex];
    question.innerText = currentQuestions.question;


    Options.forEach( option =>{
        const number = option.dataset['number'];
        option.innerText = currentQuestions['option' + number];
    });

    avaliableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};


Options.forEach( option =>{
    option.addEventListener('click', e =>{
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedOption =  e.target;
        const selectedAnswer = selectedOption.dataset['number'];

        // checking the class to apply to the correct and incorrect answers
        const classToApply = selectedAnswer == currentQuestions.answer ? 'correct' : 'incorrect';
        

        if(classToApply === 'correct'){
            incrementScore(CORRECT_BONUS);
        }
        // adding a class from the game.css file
        selectedOption.parentElement.classList.add(classToApply);

        // setting time frame to dsiplay the correct and incorrect colors
        setTimeout(() =>{
        selectedOption.parentElement.classList.remove(classToApply);
        getNewQuestion();
        }, 1000);
        
        
    });
});

incrementScore = num =>{
    score += num;
    scoreText.innerText = score;

}


startGame();