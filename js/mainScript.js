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


confirmBtn.addEventListener('click', function () {
  checkQuestion(currentUserAnswer, userResults); // function that checks if the value entered by the user is correct
  nextQuestion();
})