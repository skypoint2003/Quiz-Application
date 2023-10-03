const questions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        correctAnswer: "Paris",
        score: 0,
        isAnsweredCorrectly: null
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Venus", "Jupiter"],
        correctAnswer: "Mars",
        score: 0,
        isAnsweredCorrectly: null
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["Elephant", "Giraffe", "Blue Whale", "Hippopotamus"],
        correctAnswer: "Blue Whale",
        score: 0,
        isAnsweredCorrectly: null
    },
    {
        question: "What is the chemical symbol for water?",
        options: ["H2O", "CO2", "O2", "N2"],
        correctAnswer: "H2O",
        score: 0,
        isAnsweredCorrectly: null
    },
    {
        question: "Who wrote the play Romeo and Juliet?",
        options: ["William Shakespeare", "Charles Dickens", "Jane Austen", "Mark Twain"],
        correctAnswer: "William Shakespeare",
        score: 0,
        isAnsweredCorrectly: null
    },
    {
        question: "Which gas do plants absorb from the atmosphere during photosynthesis?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        correctAnswer: "Carbon Dioxide",
        score: 0,
        isAnsweredCorrectly: null
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Pablo Picasso", "Vincent van Gogh", "Leonardo da Vinci", "Michelangelo"],
        correctAnswer: "Leonardo da Vinci",
        score: 0,
        isAnsweredCorrectly: null
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Ag", "Fe", "Au", "Pt"],
        correctAnswer: "Au",
        score: 0,
        isAnsweredCorrectly: null
    },
    {
        question: "Which country is known as the Land of the Rising Sun?",
        options: ["China", "South Korea", "Japan", "Thailand"],
        correctAnswer: "Japan",
        score: 0,
        isAnsweredCorrectly: null
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Mercury", "Venus", "Earth", "Jupiter"],
        correctAnswer: "Jupiter",
        score: 0,
        isAnsweredCorrectly: null
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;


function startQuiz() {
    document.getElementById('start-button').style.display = 'none';
    displayQuestion();
}

function displayQuestion() {
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const scoreElement = document.getElementById('question-score');
    const totalScoreElement = document.getElementById('total-score');
    const progressElement = document.getElementById('progress');
    const currentQuestion = questions[currentQuestionIndex];

    questionElement.textContent = `Question ${currentQuestionIndex + 1}: ${currentQuestion.question}`;
    //scoreElement.textContent = `Each Question Carry 2 marks ${currentQuestion.score}`;
    totalScoreElement.textContent = ` ${score}`;

    optionsElement.innerHTML = '';
    currentQuestion.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => checkAnswer(option));
        optionsElement.appendChild(optionElement);
    });

    // Show whether the question was answered correctly or not
    if (currentQuestion.isAnsweredCorrectly === true) {
        showMessage("Correct!", true);
    } else if (currentQuestion.isAnsweredCorrectly === false) {
        showMessage("Wrong!", false);
    } else {
        showMessage(""); // Clear the message if it's not answered yet
    }

    startTimer();
    updateProgress();
}


function updateScore() {
    const scoreElement = document.getElementById('score');
    const totalScoreElement = document.getElementById('total-score');
    scoreElement.textContent = `Score: ${score}`;
    totalScoreElement.textContent = `Total Score: ${score}`;
}



function startTimer() {
    let timeLeft = 10;
    const timerElement = document.getElementById('timer');
    timer = setInterval(() => {
        timerElement.textContent = timeLeft;
        timeLeft--;
        if (timeLeft < 0) {
            clearInterval(timer);
            checkAnswer(null); // Time's up, check for a null answer
        }
    }, 1000);
}

function checkAnswer(selectedOption) {
    clearInterval(timer);
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedOption === currentQuestion.correctAnswer) {
        currentQuestion.score = 2; // Set the question's score to 2
        currentQuestion.isAnsweredCorrectly = true; // Set the question's flag to true
        score += currentQuestion.score; // Increase the total score
        showMessage("Correct!", true);
    } else if (selectedOption !== null) {
        currentQuestion.isAnsweredCorrectly = false; // Set the question's flag to false
        showMessage("Wrong!", false);
    } else {
        currentQuestion.isAnsweredCorrectly = false; // Set the question's flag to false
        showMessage("Time's Up!", false);
    }

    setTimeout(nextQuestion, 2000); // Move to the next question after 2 seconds
}

function showMessage(message, isCorrect) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;
    messageElement.style.color = isCorrect ? 'green' : 'red';
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        showResult();
    }
}

// ... (previous code)

function showResult() {
    const quizContent = document.getElementById('quiz-content');
    const results = document.getElementById('results');
    const finalScoreElement = document.getElementById('final-score');
    const finalMessageElement = document.getElementById('final-message');
    const questionScoresElement = document.getElementById('question-scores');

    quizContent.style.display = 'none';
    results.style.display = 'block';

    let totalScore = 0;
    let allCorrect = true;

    questions.forEach((question, index) => {
        totalScore += question.score;

        const questionScoreItem = document.createElement('p');
        questionScoreItem.textContent = `Question ${index + 1}: ${question.score} marks`;

        if (question.isAnsweredCorrectly === true) {
            questionScoreItem.style.color = 'green';
        } else if (question.isAnsweredCorrectly === false) {
            questionScoreItem.style.color = 'red';
            allCorrect = false;
        }

        questionScoresElement.appendChild(questionScoreItem);
    });

    finalScoreElement.textContent = `${totalScore}/${questions.length * 2}`;

    if (allCorrect) {
        finalMessageElement.textContent = "Well Done!";
    } else {
        finalMessageElement.textContent = "You can Do it Better!";
    }
}

// ... (rest of the code remains the same)


function updateProgress() {
    const progressElement = document.getElementById('progress');
    const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressElement.style.width = `${progressPercentage}%`;
}

// Initialize the quiz when the page loads
window.onload = () => {
    document.getElementById('start-button').addEventListener('click', startQuiz);
};
