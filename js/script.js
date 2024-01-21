let timing = 90;
let questionNumber = 0;

let allAnswers = [];
let userResults = []; // array's objects with all results (checkAnswer). it displays finals results ***

let currentUserAnswer = ''; // global var for tracking the answer every time (takeBtnValue) ***
let isCorrect = false;

let totalPoints = 0;

const confirmBtn = document.getElementById('confirm');

window.onload = function () {
  document.getElementById('timer').innerHTML = timing;
  document.getElementById('numberQuestion').innerHTML = 1;
  startTimer();
  startTest();
}


function startTimer() {
  const timer = document.getElementById('timer');
  const timerElAnimated = document.getElementById('topCircle');

  setInterval(function () {
    timing--;
    timer.innerHTML = timing;
    timerElAnimated.style.strokeDashoffset = -(90 - timing) / 90;
    if (timing === 0) {
      checkAnswer(currentUserAnswer, userResults); // function that checks if the value entered by the user is correct
      nextQuestion();
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
    const button = document.createElement('button');
    button.classList.add('answersBtn');
    button.innerHTML = answer;
    answersContainer.append(button);
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
    showResults(); // function that shows final results
  }
}


function takeBtnValue() {
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
  
  
  function checkAnswer(answer, arrayResults) {
    // check the answer given by the user with the correct answer (corretct_answer)
    if (answer === questions[questionNumber].correct_answer) {
      totalPoints += 1;
      isCorrect = true;
    }
    
    let dataQuestion = {
      numberQuestion: questionNumber,
      category: questions[questionNumber].category,
      question: questions[questionNumber].question,
      isCorrect: isCorrect
    }

    console.log(dataQuestion);
  
    arrayResults.push(dataQuestion); // records and push in the array's objects all info about the current question
  } 

  function showResults() {
    document.querySelector('.timerSection').remove();
    document.querySelector('footer').remove();
    document.querySelector('#text-container').remove()
    document.querySelector('#confirm').remove();

    const main = document.querySelector('main');
    main.style.height = 'calc(100vh - 150px)';
    main.style.overflow = 'scroll';
    
    const resultsContainer = document.createElement('div');
    resultsContainer.classList.add('resultsContainer');

    const totalPointsContainer = document.createElement('p');
  
    let isPassed = totalPoints > (questions.length / 2) ? true : false;
  
    if (isPassed) {
      totalPointsContainer.innerHTML = 'Hai totalizzato ' + totalPoints + ' punti. Complimenti esame superato!';
    } else {
      totalPointsContainer.innerHTML = 'Hai totalizzato ' + totalPoints + " punti. Mi dispiace non hai superato l'esame!";
    }
  
    const resultsList = document.createElement('ul');
    resultsList.classList.add('resultsList');
  
    userResults.forEach(result => {
      const resultItem = document.createElement('li');
      // resultItem.innerHTML = 'Domanda: ' + result.question + '<br>' + 'Risposta inserita: ' + result.userAnswer + '<br>' + 'Risposta corretta: ' + result.correctAnswer;
      resultItem.innerHTML = '<li><span class="nQuestion">(' + (result.numberQuestion + 1) + ')</span><span class="checkQuestion"><ion-icon name="checkmark-outline"></ion-icon></span><div>' + result.category + ' ' + result.question + '</div></li>';
      
      resultsList.append(resultItem);
    })
    
    resultsContainer.append(totalPointsContainer, resultsList);
    main.append(resultsContainer);
  } 