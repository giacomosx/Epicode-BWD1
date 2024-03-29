let timing = 90;
let questionNumber = 0;

// object with all totals. It displays correct, wrong and empty answers ***
let totals = {
  correct : 0,
  wrong : 0,
  empty : 0
}

let allAnswers = [];
let userResults = []; // array's objects with all results (checkAnswer). it displays finals results details ***

let currentUserAnswer = ''; // global var for tracking the answer every time (takeBtnValue) ***
let isCorrect;


const confirmBtn = document.getElementById('confirm');

window.onload = function () {
  document.getElementById('timer').innerHTML = timing;
  document.getElementById('numberQuestion').innerHTML = 1;
  countDown();
  startTest();
}


let countDown = function startTimer() {
  const timer = document.getElementById('timer');
  const timerElAnimated = document.getElementById('topCircle');
  setInterval(function () {
    timing--;
    timer.innerHTML = timing;
    timerElAnimated.style.strokeDashoffset = -(90 - timing) / 90;
    if (timing === 0 && questionNumber !== questions.length) {
      checkAnswer(currentUserAnswer, userResults); // function that checks if the value entered by the user is correct
      nextQuestion();
    } else {
      clearInterval(countDown);
    }
  }, 1000)
}


function startTest() {
  document.getElementById('question').innerHTML = questions[questionNumber].question;
  getOptionsBtns(allAnswers);
  takeBtnValue();// function that takes the value of the pressed button
}


function getOptionsBtns(array) {
  array.push(questions[questionNumber].correct_answer);
  questions[questionNumber].incorrect_answers.forEach(answer => {
    array.push(answer);
  });

  array.sort();

  const answersContainer = document.createElement('div');
  answersContainer.id = 'answersContainer';
  document.getElementById('text-container').append(answersContainer);

  array.forEach(answer => {
    if (questions[questionNumber].type === 'boolean') {
      const inputContainer = document.createElement('div');
      inputContainer.classList.add('inputContainer');

      const radioButton = document.createElement('input');
      radioButton.type = 'radio';
      radioButton.id = answer;
      radioButton.value = answer;
      radioButton.name = 'radioBtn';
      
      const label = document.createElement('label');
      label.setAttribute('for', answer);
      label.innerHTML = answer;

      inputContainer.append(radioButton, label);
      answersContainer.append(inputContainer);  
    } else {
      const button = document.createElement('button');
      button.classList.add('answersBtn');
      button.innerHTML = answer;

      answersContainer.append(button);
    }
  })
}


confirmBtn.addEventListener('click', function () {
  checkAnswer(currentUserAnswer, userResults); // function that checks if the value entered by the user is correct
  nextQuestion();
})


function nextQuestion() {
  const answersContainer = document.getElementById('answersContainer');
  answersContainer.remove();

  questionNumber += 1;
  timing = 91;
  allAnswers = [];

  document.getElementById('numberQuestion').innerHTML = questionNumber + 1;

  if (questionNumber < questions.length) {
    startTest();
  } else {
    clearInterval(countDown);
    showResults(); // function that shows final results
  }
}


function takeBtnValue() {
  if (questions[questionNumber].type === 'boolean') {
    const radioButton = document.querySelectorAll('input');

    radioButton.forEach(input => {
      input.addEventListener('click', function () {
        currentUserAnswer = this.value; // it takes the value of the radio button
      })
    })

  } else {
    const answersBtn = document.querySelectorAll('.answersBtn');

    answersBtn.forEach(button => {
      button.addEventListener('click', function () {
        answersBtn.forEach(button => {
          button.classList.remove('active');
        })
        this.classList.add('active');
        currentUserAnswer = this.innerHTML; // it takes the value of the button
      })
    })
  }
  
}


function checkAnswer(answer, arrayResults) {
  // check the answer given by the user with the correct answer (corretct_answer)
  if (answer === questions[questionNumber].correct_answer) {
    isCorrect = true;
    totals.correct += 1;
  } else if (questions[questionNumber].incorrect_answers.includes(answer) ){
    isCorrect = false;
    totals.wrong += 1;
  } else {
    isCorrect = false;
    totals.empty += 1;
  }

  let dataQuestion = {
    numberQuestion: questionNumber,
    category: questions[questionNumber].category,
    question: questions[questionNumber].question,
    isCorrect: isCorrect,
    userAnswer: currentUserAnswer
  }

  arrayResults.push(dataQuestion); // records and push in the array's objects all info about the current question

  currentUserAnswer = null;
}


function showResults() {
  document.querySelector('.timerSection').remove();
  document.querySelector('footer').remove();
  document.querySelector('#text-container').remove()
  document.querySelector('#confirm').remove();
  
  let percentage = (totals.correct / questions.length);

  document.body.style.height = '100%';

  const main = document.querySelector('main');
  main.style.height = '100%';

  const resultsContainer = document.createElement('div');
  resultsContainer.classList.add('resultsContainer');
  
  const chartContainer = document.createElement('div');
  chartContainer.id = 'chartContainer';
  
  chartContainer.innerHTML = `<svg>
                                <circle id="correctDataCircle" cx="50%" cy="50%" r="90" />
                                <circle id="wrongDataCircle" cx="50%" cy="50%" r="90" pathLength="1"/>
                              </svg>`;

  const response = document.createElement('div');
  response.id = 'responseContainer';

  if (percentage > 0.5) {
      response.innerHTML = `<span>Passed!</span><span id="percentageDisplayed">${percentage * 100}%</span><span>${totals.correct}/10 questions</span>`
  } else {
    response.innerHTML = `<span>Failed!</span><span id="percentageDisplayed">${percentage * 100} %</span><span>${totals.correct}/10 questions</span>`
  }
  
                    
  const results = document.createElement('ul');
  results.classList.add('results');

  results.innerHTML = `<li>Correct<span id="correctAnswers">${totals.correct}</span></li>
                       <li>Wrong<span id="wrongAnswers">${totals.wrong}</span></li>
                       <li>Empty<span id="emptyAnswers">${totals.empty}</span></li>
                       <li>Total<span id="totalAnswers">${(totals.correct + totals.wrong)}</span></li>`

  const questionList = document.createElement('div');
  questionList.classList.add('questionList');

  const resultsList = document.createElement('ul');

  userResults.forEach(result => {
    const resultItem = document.createElement('li');

    if (result.isCorrect) {
      resultItem.innerHTML = `<span class="nQuestion">(${result.numberQuestion + 1})</span><span class="checkMark_green"><ion-icon name="checkmark-outline"></ion-icon></span><div class="question_written"><span class="category">${result.category}</span>${result.question}</div>`;
    } else {
      resultItem.innerHTML = `<span class="nQuestion">(${result.numberQuestion + 1})</span><span class="checkMark_red"><ion-icon name="close-outline"></ion-icon></span><div class="question_written"><span class="category">${result.category}</span>${result.question}</div>`;
    }

    resultsList.append(resultItem);
  })

  chartContainer.append(response);
  resultsContainer.append(chartContainer, results, questionList);
  questionList.append(resultsList);
  main.append(resultsContainer);

  setInterval(function () {
    const wrongDataCircle = document.getElementById('wrongDataCircle');
    wrongDataCircle.style.strokeDashoffset= `-${percentage}`;
  }, 200)
} 
