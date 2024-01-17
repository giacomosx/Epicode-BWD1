const timer = document.getElementById('timer');
const container = document.getElementById('container');
const question = document.getElementById('question');
const answersContainer = document.getElementById('answersContainer');
const confirmBtn = document.getElementById('confirm');

let timing = 90;
timer.innerHTML = timing;

let questionNumber = 0;
let totalPoints = 0;

console.log(questions[questionNumber].correct_answer);

getQuestion();
startTimer();

function getQuestion() {
    let allAnswers = [];
    allAnswers.push(questions[questionNumber].correct_answer);
    questions[questionNumber].incorrect_answers.forEach(answer => {
      allAnswers.push(answer);
    });

    allAnswers.sort();
    
    question.innerHTML = questions[questionNumber].question;

    allAnswers.forEach(answer => {
      const button = document.createElement('button'); 
      button.classList.add('answersBtn');
      button.innerHTML = answer;
      answersContainer.append(button);
    })
}

function startTimer() {

  let countDown = setInterval(function() {
    timing--;
    timer.innerHTML = timing;
    if (timing === 0){
      clearInterval(countDown);
    }
  }, 1000)
  
}

confirmBtn.addEventListener('click', function() {
  questionNumber += 1;
  getQuestion();
  timing = 90;
  clearInterval(countDown);
  startTimer();
})
