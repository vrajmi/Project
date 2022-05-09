const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

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

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Újrakezdés'
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

const questions = [
  {
    question: 'Mit csinál egy szoftverfejlesztő?',
    answers: [
      { text: 'Főként webes-, asztali- és mobilalkalmazást (szoftvert) tervezni és fejleszteni, tesztelni és dokumentálni', correct: true },
      { text: 'Főként adatbázisokat tervez és kezel', correct: false }
    ]
  },
  {
    question: 'Melyik NEM illik a felsoroltak közé?',
    answers: [
      { text: 'HTML', correct: false },
      { text: 'C#', correct: false },
      { text: 'JavaScript', correct: false },
      { text: 'Visual Studio Code', correct: true }
    ]
  },
  {
    question: 'Ajánlott-e minden szoftverfejlesztést egy konkrét projektként kezelni?',
    answers: [
      { text: 'Igen', correct: true },
      { text: 'Nem', correct: false }
    ]
  },
  {
    question: 'Mi készség kellenek ahhoz hogy Szoftverfejlesztő és tesztelő legyél?',
    answers: [
      { text: 'Kreativitással', correct: true },
      { text: 'Gondolkozásra való készség', correct: true },
      { text: 'Nem kell külön készség', correct: false },
    ]
  }
]