//your JS code here.

// Do not change code below this line
// This code will just display the questions to the screen
// Quiz Questions
const quizData = [
  {
    question: "1. What does HTML stand for?",
    options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyper Tool Multi Language"],
    correct: 0
  },
  {
    question: "2. Which language is used for styling web pages?",
    options: ["HTML", "JQuery", "CSS", "XML"],
    correct: 2
  },
  {
    question: "3. Which is not a JavaScript Framework?",
    options: ["React", "Angular", "Vue", "Cassandra"],
    correct: 3
  },
  {
    question: "4. Which is used to connect to a database?",
    options: ["PHP", "HTML", "JS", "All"],
    correct: 0
  },
  {
    question: "5. Which HTML tag is used to include JavaScript code?",
    options: ["<javascript>", "<js>", "<script>", "<code>"],
    correct: 2
  }
];

// DOM Elements
const questionsDiv = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

// Load saved progress and score
let savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};
let savedScore = localStorage.getItem("score");

// 🧠 Render Quiz Questions
function renderQuestions() {
  questionsDiv.innerHTML = "";
  quizData.forEach((q, i) => {
    const questionContainer = document.createElement("div");
    const questionTitle = document.createElement("p");
    questionTitle.textContent = q.question;
    questionContainer.appendChild(questionTitle);

    q.options.forEach((option, j) => {
      const label = document.createElement("label");
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `q${i}`;
      radio.value = j;

      // Restore selected option from sessionStorage
      if (savedProgress[`q${i}`] == j) {
        radio.checked = true;
      }

      // Save selection to sessionStorage when user selects
      radio.addEventListener("change", () => {
        savedProgress[`q${i}`] = j;
        sessionStorage.setItem("progress", JSON.stringify(savedProgress));
      });

      label.appendChild(radio);
      label.appendChild(document.createTextNode(option));
      questionContainer.appendChild(label);
      questionContainer.appendChild(document.createElement("br"));
    });

    questionsDiv.appendChild(questionContainer);
  });
}

// 🧾 Calculate and Display Score
function calculateScore() {
  let score = 0;
  quizData.forEach((q, i) => {
    if (savedProgress[`q${i}`] == q.correct) {
      score++;
    }
  });

  scoreDiv.textContent = `Your score is ${score} out of ${quizData.length}.`;

  // Save score in localStorage
  localStorage.setItem("score", score);
}

// 🧹 Display saved score if any
if (savedScore !== null) {
  scoreDiv.textContent = `Your previous score is ${savedScore} out of ${quizData.length}.`;
}

// 🔁 Initialize
renderQuestions();

// 🖱️ Submit Button Click Event
submitBtn.addEventListener("click", calculateScore);
