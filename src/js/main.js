"use strict"


document.addEventListener('DOMContentLoaded',()=>{



  /* All answer questions */
  const option1 = document.querySelector('.option1'),
        option2 = document.querySelector('.option2'),
        option3 = document.querySelector('.option3'),
        option4 = document.querySelector('.option4');

  /** All our options */
  const optionElements = document.querySelectorAll('.option');

  const question = document.querySelector('#question'),
        numberOfQuestion = document.querySelector('#number-of-question'),
        numberOfAllQuestion = document.querySelector('#number-of-all-questions');

  /** Index current question - page */
  let indexOfQuestion, //индекс текущего вопроса
      indexOfPage = 0;  //игдекс текущей страницы

  const btnNext = document.querySelector('#btn-next');
        

  /** Score of answers  */
  let score = 0; //итоговой результата викторины

  const correctAnswer = document.querySelector('#correct-answer'),
        nubmerOfAllQuestion2 = document.querySelector('#number-of-all-questions-2'),
        btnTryAgain = document.querySelector('#btn-try-again');

  /** Array with questions for grows of futer amount */
  const questions = [
    {
      question: "Как в JavaScript вычислить % процент от числа?",
      options: [
        'Так в JavaScript нельзя делать',
        'Оператор : % ',
        'Умножить на кол-во процентов и разделить на 100',
        'Вызвать метод findPercent()'
      ],
      rightAnswer: 2
    },
    {
      question: "Результат выражения: '13' + 7 ?",
      options: [
        '20',
        '137',
        'undefined',
        'error'
      ],
      rightAnswer: 1
    },
    {
      question: "На JavaScript нельзя писать : ",
      options: [
        'Игры',
        'Скрипты для сайтов',
        'Десктопные приложения',
        'Плохо'
      ],
      rightAnswer: 3
    }
  ];

  numberOfAllQuestion.innerHTML = questions.length; //выводим кол=во всех вопросов

  const load = () => { //отображение вопроса из массива вопросов 
                        //заполнить пустой див
    question.innerHTML = questions[indexOfQuestion].question; //сам текущий вопрос на странице
    
    option1.innerHTML = questions[indexOfQuestion].options[0]; //вариатны ответа
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = indexOfPage + 1; //переменная текщуего номера страницы
    indexOfPage++;  //увеличение индекса страницы
  };

  let completedAnswers = []; //созадем массив в который будут записываться уже заданные вопросы


  const quizOver = () => { //функция завершения игры
    document.querySelector('#modal').classList += ` acitve`;
    correctAnswer.innerHTML = score;
    nubmerOfAllQuestion2.innerHTML = questions.length;
    
  }

  //функция с рандомным числом чтоб появлялся случайный вопрос:

  const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length); //random number from 0 to 3
    //реализация что б вопросы не повторялись
    let hitDuplicate = false;
    //делаем проверку не закончилась ли игра индекс страниц и вопросов равны то все финиш
    if(indexOfPage == questions.length) { //когда кончились вопросы то
      quizOver(); //функция завершения игры
    } else {
      if(completedAnswers.length > 0) {
        completedAnswers.forEach(item => {
          if(item == randomNumber) {
            hitDuplicate = true;  //проверка на повторнение вопроса
          }
        });
        if(hitDuplicate) { //если повторно один и тот же вопрос
          randomQuestion();
        } else {
          indexOfQuestion = randomNumber;
          load();
        }
      };
      if(completedAnswers == 0) {
        indexOfQuestion = randomNumber;
        load();
      }
    };
    completedAnswers.push(indexOfQuestion); //возникшие вопросы будем пушить в проверочный массив для последуюей уникальности
  };

  const disabledOptions = ()=>{

      optionElements.forEach(item => {
        item.classList += ` disabled`;//после ответа все другие элементы будут не активные
        if(item.dataset.id == questions[indexOfQuestion].rightAnswer){
          item.classList += ` correct`;
        }
      });
  }

  const anableOptions = ()=> {  //отмена классов с ответами и блокированными
    optionElements.forEach(item => {
      item.classList -= ` disabled correct wrong`;
    })
  }


  const checkAnswer = el => {
    if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer){
      el.target.classList += ` correct`;
      score++;     
    } else {
      el.target.classList += ` wrong`;
    }
    disabledOptions();  //функция которая сделает неактивными остальные поля

  }

  for(let k of optionElements){
    k.addEventListener('click', (e)=>{
      e.preventDefault();
      checkAnswer(e);
    })
  }

  const validate = () => {  //проверка выбран ли элемент на ответ
    if(!optionElements[0].classList.contains('disabled')){
      alert('Выберите вариант ответа пожалуйста!')
    } else {
      anableOptions();
      randomQuestion();
      
    }
  }

  btnNext.addEventListener('click', () => {
    validate();
  });

  const tryAgain = () => {
    window.location.reload();
  }

  btnTryAgain.addEventListener('click', tryAgain);

  randomQuestion();
});
