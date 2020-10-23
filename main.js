function $(id) {
    return document.querySelector(id);
}

$('.gameSheet').style.display = "none";
$('.inputs').style.display = "none";
$('#showResult').style.display = "none";

//МЕХАНИКА ИГРЫ
let choosenWord = [];
let limiter = 0;
const showedWords = document.querySelectorAll('.showedWords');
const newWordsBtn = $('#newWordsBtn');
const checkBtn = $('#checkBtn');
let wordsForChecking = [];
let score = 0;

//таймер
function setTimer() {         //сделала через замыкание. пока до 5 секунд, потом 120
    let time = 0.5;            //запускатеся из makeString
    return function timer() {   //что за хрень с ++ не понимаю, пока сделала +0.5
        if(time <= 5) {         //и работает норм
            time += 0.5;
            return time
        } else {
            return
        }
    }
}

function showSheetInputs() {
    $('.gameSheet').style.display = "none";
    $('.inputs').style.display = "block";
    $('#showResult').style.display = "none";  //убрать после тестов
    $('.firstSheet').style.display = "none";  //убрать после тестов
}

//выбор слов и запуск таймера
function makeString() {
    while(limiter < 6) {         //потом заменит 6 на 30
        let rendomIndex = Math.floor(Math.random()*arreyOfWord.length);
        choosenWord.push(arreyOfWord[rendomIndex]);
        arreyOfWord.splice(rendomIndex, 1);
        limiter++;
    }
    for(i = 0; i < choosenWord.length; i++) {
        arreyOfWord.push(choosenWord[i]);
        wordsForChecking.push(choosenWord[i]);
    }
    for(i = 0; i < choosenWord.length; i++) {
        showedWords[i].innerHTML = choosenWord[i];
    }
    limiter = 0;
    choosenWord = [];

    $('.gameSheet').style.display = "block";
    $('.inputs').style.display = "none";
    $('#showResult').style.display = "none";
    $('.firstSheet').style.display = "none";

    let getTimer = setTimer();
    let intervalId = setInterval(function() {
        console.log(getTimer());
        if(getTimer() === undefined) {
            clearInterval(intervalId);  //очищаем интервал
            showSheetInputs();           //открываем инпуты
        }
    }, 1000);
}

function makeCheckingAndShowResult() {
    const remembedWords = document.querySelectorAll('.remembedWords');
    
    remembedWords.forEach(function(item) {
        let currentWold = item.value.toLowerCase();
        for(i = 0; i < wordsForChecking.length; i++) {
            if(currentWold == wordsForChecking[i]) {
                score++;
                wordsForChecking.splice([i],1);
            } 
        }
    })
    document.getElementById('score').innerHTML = score;
    document.getElementById('forgivan').innerHTML = wordsForChecking.join(", ");

    $('.gameSheet').style.display = "none";
    $('.inputs').style.display = "none";
    $('#showResult').style.display = "block";
    $('.firstSheet').style.display = "none";
}
newWordsBtn.addEventListener('click', makeString);
checkBtn.addEventListener('click', makeCheckingAndShowResult);
$('#btnInMenu').addEventListener('click', function() {
    $('.gameSheet').style.display = "none";
    $('.inputs').style.display = "none";
    $('#showResult').style.display = "none";
    $('.firstSheet').style.display = "block";
    wordsForChecking = [];
});

