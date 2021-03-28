// Variables
let startButton = document.getElementById('start-btn')
let nextButton = document.getElementById('next-btn')
let questionContainerElement = document.getElementById('question-container')
let questionElement = document.getElementById('question')
let answerButtonsElement = document.getElementById('answer-buttons')
let timer = 60;
let shuffledQuestions, currentQuestionIndex
// TESTING LOCAL STORAGE
let submitEl = document.querySelector("#submit");
//



// Event Listeners
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQues()
})

// Start game
function startGame() {
  timer = 60;
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQues()
  console.log('Started')

  // Timer
  function countDown() {
    timer = timer - 1;
    if (timer < 60) {
      time.innerHTML = timer;
    }
    if (timer === 0) {
      window.clearInterval(update);
      alert("Game Over");
      prompt("Enter your initials");
    }
  }
  update = setInterval (countDown, 1000);
}

function gameOver() {
  console.log('gameover')
}

// Setting next question
function setNextQues() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

// Showing the question
function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
  }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

// Reset question/answer
function resetState() {
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

// Answer selecting
function selectAnswer(e) {
  let selectedButton = e.target
  let correct = selectedButton.getAttribute('data-correct')
  if (correct) {
    console.log('correct answer')
    timer += 20
  } else {
    console.log('wrong answer')
    timer -= 20
  }
  setStatusClass(document.body, 'correct')
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

  
let questions = [
  {
    question: 'Which tag do we put the JavaScript?',
    answers: [
      { text: '<javascript>', correct: false },
      { text: '<scripting>', correct: false },
      { text: '<script>', correct: true },
      { text: '<js>', correct: false }
    ]
  },
  {
    question: 'How would you create an alert box for "Boo!"?',
    answers: [
      { text: 'alertText("Boo!")', correct: false },
      { text: 'alert("Boo!")', correct: true },
      { text: 'boxAlert("Boo!")', correct: false },
      { text: 'loudBox("Boo!"', correct: false }
    ]
  },
  {
    question: 'Which is the correct way to write an array?',
    answers: [
      { text: 'let colors = [red, purple, grey]', correct: false },
      { text: 'let colors = <"red">, <"purple">, <"grey">', correct: false },
      { text: 'let colors = ("red") ("purple") ("grey")', correct: false },
      { text: 'let colors = ["red", "purple", "grey"]', correct: true }
    ]
  },
  {
    question: 'JavaScript is case-sensitive',
    answers: [
      { text: 'True', correct: true },
      { text: 'False', correct: false }
    ]
  },
]
