// Firebase configuration (replace with your own config)
const firebaseConfig = {
  apiKey: "AIzaSyBGlJxzkEAlLJiu0GGNkIlNYmSJ30UtZ5o",
  authDomain: "theonlinehunt-3268b.firebaseapp.com",
  databaseURL: "https://theonlinehunt-3268b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "theonlinehunt-3268b",
  storageBucket: "theonlinehunt-3268b.appspot.com",
  messagingSenderId: "186291357760",
  appId: "1:186291357760:web:88bd4aa13dc67d446f77a5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

let currentQuestion = 0;

function showQuestion() {
  const questionElement = document.getElementById("question");
  console.log("questions:", questions); // Log questions array
  questionElement.innerHTML = questions[currentQuestion]?.question || "Game Over!";
}

function checkAnswer() {
  const answerElement = document.getElementById("answer");
  const userAnswer = answerElement.value;
  const correctAnswer = questions[currentQuestion]?.answer;

  console.log("User Answer:", userAnswer);
  console.log("Correct Answer:", correctAnswer);

  if (userAnswer && correctAnswer && userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
    alert("Correct answer!");
    currentQuestion++;

    if (currentQuestion < questions.length) {
      showQuestion();
      answerElement.value = "";
    } else {
      alert("Quiz completed!");
      answerElement.disabled = true;
    }
  } else {
    alert("Wrong answer. Try again.");
  }
}

// Retrieve questions from the Firebase Realtime Database
database.ref("questions").on("value", function(snapshot) {
  const data = snapshot.val();
  console.log("Firebase Data:", data); // Log Firebase data

  if (data) {
    questions = data;
    // Show the first question when the page and data are loaded
    showQuestion();
  }
});
