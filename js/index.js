const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const scoreElement = document.getElementById('score');

let shuffledQuestions, currentQuestionIndex;
let score;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add('hide');
  scoreElement.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  score = 0;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  clearStatusClass(scoreElement);
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  if (correct) {
    score++;
  }
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    let scoreMessage;
    let finalScore = (score / shuffledQuestions.length) * 100;

    if (finalScore > 76) {
      scoreEmoji = '🔥';
      scoreMessage = '🔥 odlično!';
      scoreElement.classList.add('correct');
    } else if (finalScore > 49) {
      scoreMessage = '😏 ni slabo!';
      scoreElement.classList.add('neutral');
    } else {
      scoreMessage = '💩 slabo!';
      scoreElement.classList.add('wrong');
    }

    startButton.innerText = 'Začni znova';
    startButton.classList.remove('hide');
    questionContainerElement.classList.add('hide');
    scoreElement.innerText = `Tvoj rezultat: ${score} od ${shuffledQuestions.length} ${scoreMessage}`;
    scoreElement.classList.remove('hide');
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('neutral');
  element.classList.remove('wrong');
}

const questions = [
  {
    question: 'Med kaj uvrščamo klope?',
    answers: [
      { text: 'V mesojedce', correct: false },
      { text: 'V pajkovce', correct: true },
      { text: 'V dvoživke', correct: false },
    ],
  },
  {
    question: 'Kako z drugo besedo rečemo čutnemu organu?',
    answers: [
      { text: 'Hallerjev organ', correct: true },
      { text: 'Gaussov organ', correct: false },
      { text: 'Darwinov organ', correct: false },
      { text: 'Newtonov organ', correct: false },
    ],
  },
  {
    question: 'Koliko različnih vrst klopov poznamo?',
    answers: [
      { text: '110', correct: false },
      { text: '860', correct: true },
      { text: '1300', correct: false },
      { text: '420', correct: false },
    ],
  },
  {
    question: 'Kaj se pojavi na koži, če nas ugrizne okužen klop?',
    answers: [
      { text: 'Rdeči kolobarji', correct: true },
      { text: 'Modri izpuščaji', correct: false },
    ],
  },
  {
    question: 'Kaj se zgodi z klopom moškega spola po parjenju?',
    answers: [
      { text: 'Se ponovno pari', correct: false },
      { text: 'Pogine', correct: true },
      { text: 'Se poveča', correct: false },
      { text: 'Potrebuje obrok', correct: false },
    ],
  },
];
