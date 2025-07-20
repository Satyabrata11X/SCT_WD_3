const quizData = [
  {
    question: "Which of the following are programming languages?",
    type: "multi",
    options: ["HTML", "Python", "CSS", "JavaScript"],
    correct: ["Python", "JavaScript"]
  },
  {
    question: "What is the capital of France?",
    type: "single",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correct: "Paris"
  },
  {
    question: "Fill in the blank: The ___ is the brain of the computer.",
    type: "text",
    correct: "CPU"
  }
];

let currentIndex = 0;
let score = 0;

function loadQuestion() {
  const quizBox = document.getElementById("quiz-box");
  quizBox.innerHTML = "";
  document.getElementById("result").innerText = "";

  if (currentIndex >= quizData.length) {
    document.getElementById("quiz-box").style.display = "none";
    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("result").innerText = `Your Score: ${score} / ${quizData.length}`;
    return;
  }

  const q = quizData[currentIndex];
  const questionEl = document.createElement("h3");
  questionEl.innerText = `${currentIndex + 1}. ${q.question}`;
  quizBox.appendChild(questionEl);

  if (q.type === "single") {
    q.options.forEach(opt => {
      const label = document.createElement("label");
      label.className = "option";
      label.innerHTML = `<input type="radio" name="option" value="${opt}"> ${opt}`;
      quizBox.appendChild(label);
    });
  } else if (q.type === "multi") {
    q.options.forEach(opt => {
      const label = document.createElement("label");
      label.className = "option";
      label.innerHTML = `<input type="checkbox" value="${opt}"> ${opt}`;
      quizBox.appendChild(label);
    });
  } else if (q.type === "text") {
    const input = document.createElement("input");
    input.type = "text";
    input.id = "fillText";
    quizBox.appendChild(input);
  }
}

function nextQuestion() {
  const q = quizData[currentIndex];

  let userAnswer;
  if (q.type === "single") {
    const selected = document.querySelector('input[name="option"]:checked');
    if (!selected) {
      alert("Please select an option");
      return;
    }
    userAnswer = selected.value;
    if (userAnswer === q.correct) score++;
  } else if (q.type === "multi") {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    userAnswer = Array.from(checkboxes).map(cb => cb.value);
    if (arraysEqual(userAnswer.sort(), q.correct.sort())) score++;
  } else if (q.type === "text") {
    const input = document.getElementById("fillText").value.trim().toLowerCase();
    if (input === q.correct.toLowerCase()) score++;
  }

  currentIndex++;
  loadQuestion();
}

function arraysEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

window.onload = loadQuestion;
