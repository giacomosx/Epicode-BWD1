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
  
  
  function checkQuestion(answer, arrayResults) {
    // check the answer given by the user with the correct answer (corretct_answer)
    if (answer === questions[questionNumber].correct_answer) {
      totalPoints += 1;
      isCorrect = true;
    }
    
    let dataQuestion = {
      question: questions[questionNumber].question,
      userAnswer: answer,
      correctAnswer: questions[questionNumber].correct_answer,
      isCorrect: isCorrect
    }
  
    arrayResults.push(dataQuestion); // records and push in the array's objects all info about the current question
  } 
  
  
  function showResults() {
    timer.remove();
    question.remove();
    confirmBtn.remove();
  
    let isPassed;
    const totalPointsContainer = document.createElement('p');
  
    totalPoints > (questions.length / 2) ? isPassed = true : isPassed = false;
  
    if (isPassed) {
      totalPointsContainer.innerHTML = 'Hai totalizzato ' + totalPoints + ' punti. Complimenti esame superato!';
    } else {
      totalPointsContainer.innerHTML = 'Hai totalizzato ' + totalPoints + " punti. Mi dispiace non hai superato l'esame!";
    }
  
    const resultsList = document.createElement('ul');
    resultsList.classList.add('resultsList');
  
    userResults.forEach(result => {
      const resultItem = document.createElement('li');
      resultItem.innerHTML = 'Domanda: ' + result.question + '<br>' + 'Risposta inserita: ' + result.userAnswer + '<br>' + 'Risposta corretta: ' + result.correctAnswer;
      resultsList.append(resultItem);
    })
  
    container.append(totalPointsContainer, resultsList);
  } 