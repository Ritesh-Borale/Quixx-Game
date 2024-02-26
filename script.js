const api = "https://opentdb.com/api.php?amount=10&category=30&type=multiple";

const printquestion = document.querySelector(".mainquestion");
let questions = [];
let CurrElementindex = 0;
let Next = document.querySelector(".Next");
const Options = document.querySelectorAll(".Option");

async function getapi() {
    try {
        let response = await fetch(api);
        if (!response.ok) {
            throw new Error("Response Not Ok");
        }
        let data = await response.json();
        questions = data.results;
        DisplayQuestion();
    } catch (error) {
        console.error("Error In response Catch", error);
    }
}

function DisplayQuestion() {
    printquestion.textContent = questions[CurrElementindex].question;
    let options = [
        questions[CurrElementindex].correct_answer,
        questions[CurrElementindex].incorrect_answers[0],
        questions[CurrElementindex].incorrect_answers[1],
        questions[CurrElementindex].incorrect_answers[2]
    ];
    options = shuffleOptions(options);
    Options.forEach((option, index) => {
        option.textContent = options[index];
        option.style.backgroundColor = "greenyellow"; // Reset background color
        option.style.pointerEvents = "auto"; // Enable pointer events
        option.removeEventListener("click", optionClickHandler); // Remove previous event listener
        option.addEventListener("click", optionClickHandler); // Add new event listener
    });
}

function shuffleOptions(options) {
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }
    return options;
}
var score =0;
function optionClickHandler() {
    const selectedOption = this;
    const selectedAnswer = selectedOption.textContent;
    const correctAnswer = questions[CurrElementindex].correct_answer;
    if (selectedAnswer === correctAnswer) {
        selectedOption.style.backgroundColor = "green";
        score++;
    } else {
        selectedOption.style.backgroundColor = "red";
        Options.forEach(option => {
            if (option.textContent === correctAnswer) {
                option.style.backgroundColor = "green";
            }
        });
    }
    // Disable pointer events after an option is clicked
    Options.forEach(option => {
        option.style.pointerEvents = "none";
    });
}
let Finalscore = document.getElementById("score");
function NextQuestion() {
    CurrElementindex++;
    if (CurrElementindex < questions.length) {
        DisplayQuestion();
    } else {
        Finalscore.textContent = "";
        Finalscore.textContent = `Your score Is : ${score}`;
        console.log("Quiz Over");
    }
}

Next.addEventListener("click", NextQuestion);

getapi();
