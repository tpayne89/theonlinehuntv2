// game.js
import { useLiveData } from "./firebase";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGlJxzkEAlLJiu0GGNkIlNYmSJ30UtZ5o",
  authDomain: "theonlinehunt-3268b.firebaseapp.com",
  databaseURL: "https://theonlinehunt-3268b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "theonlinehunt-3268b",
  storageBucket: "theonlinehunt-3268b.appspot.com",
  messagingSenderId: "186291357760",
  appId: "1:186291357760:web:88bd4aa13dc67d446f77a5",
  measurementId: "G-F5WE56KLB9",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const questionContainer = document.getElementById("question-container");
const answerInput = document.getElementById("answer-input");
const submitAnswerButton = document.getElementById("submit-answer");

let currentQuestionIndex = 0;

async function loadQuestion(index) {
  const path = `questions/${index}`;
  const { data, ready } = await useLiveData(path);

  if (ready) {
    questionContainer.innerHTML = data.question || "Game Over!";
  }
}

function checkAnswer(index, answer) {
  const path = `questions/${index}/answer`;

  // Ensure the correct answer is retrieved before proceeding
  useLiveData(path).then(({ data, ready }) => {
    if (ready) {
      const correctAnswer = data;
      if (answer.toLowerCase() === correctAnswer.toLowerCase()) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
        answerInput.value = ""; // Clear the input field
      } else {
        alert("Incorrect answer. Try again!");
      }
    }
  });
}

submitAnswerButton.addEventListener("click", () => {
  const userAnswer = answerInput.value.trim();
  if (userAnswer !== "") {
    checkAnswer(currentQuestionIndex, userAnswer);
  } else {
    alert("Please enter an answer.");
  }
});

// Initial load
loadQuestion(currentQuestionIndex);
