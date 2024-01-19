const timer = document.getElementById('timer');
const container = document.getElementById('container');
const question = document.getElementById('question');
const answersContainer = document.getElementById('answersContainer');
const confirmBtn = document.getElementById('confirm');

let timing = 90;
let questionNumber = 0;

let allAnswers = [];
let userResults = []; // array's objects with all results (checkQuestion). it displays finals results ***

let currentUserAnswer = ''; // global var for tracking the answer every time (takeBtnValue) ***
let isCorrect = false;

let totalPoints = 0;


window.onload = function () {
  timer.innerHTML = timing;
  startTest();
  startTimer();
}


function startTest() {
  question.innerHTML = questions[questionNumber].question;
  getOptionsBtns(allAnswers);
  // insert a function that takes the value of the pressed button
}


function getOptionsBtns(array) {
  array.push(questions[questionNumber].correct_answer);
  questions[questionNumber].incorrect_answers.forEach(answer => {
    array.push(answer);
  });

  array.sort();

  const answersContainer = document.createElement('div');
  answersContainer.id = 'answersContainer';
  container.append(answersContainer);

  array.forEach(answer => {
    const button = document.createElement('button');
    button.classList.add('answersBtn');
    button.innerHTML = answer;
    answersContainer.append(button);
  })
}


function nextQuestion() {
  const answersContainer = document.getElementById('answersContainer');
  answersContainer.remove();

  questionNumber += 1;
  timing = 91;
  allAnswers = [];

  if (questionNumber < questions.length) {
    startTest();
  } else {
    // insert a function that shows final results
  }
}


function startTimer() {
  setInterval(function () {
    timing--;
    timer.innerHTML = timing;
    if (timing === 0) {
      // insert a function that checks if the value entered by the user is correct
      nextQuestion();
    }
  }, 1000)
}


confirmBtn.addEventListener('click', function () {
  // insert a function that checks if the value entered by the user is correct
  nextQuestion();
})