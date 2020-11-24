function $(id) {
    return document.querySelector(id);
}

showSheet('.firstSheet');  //скрывает все, кроме первого листа

//МЕХАНИКА ИГРЫ
let choosenWord = [];
let limiter = 0;
const showedWords = document.querySelectorAll('.showedWords');
const newWordsBtn = $('#newWordsBtn');
const checkBtn = $('#checkBtn');
let wordsForChecking = [];
let score = 0;

//переключание листов
function showSheet(page) {              //скрывает все листы. показываем тот, который //придет в аргумент
    const sheets = document.querySelectorAll(".container");
    sheets.forEach(element => element.style.display = "none");
    $(page).style.display = "block";
}

//выбор слов и запуск таймера
function makeString() {
    while(limiter < 30) {         
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
    
    const timer = document.getElementById('timer');

    let time = 6;           // интервал меняет время в спане
    const intervalId = setInterval(() => {   //и переключает экран
        time --;
        timer.innerText = time;
        if(time == -1) {
            showSheet('.inputs');
            clearInterval(intervalId); 
        }
    }, 1000);

    showSheet('.gameSheet');
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

    showSheet('#showResult');
}
newWordsBtn.addEventListener('click', makeString);
checkBtn.addEventListener('click', makeCheckingAndShowResult);
$('#btnInMenu').addEventListener('click', function() {
    showSheet('.firstSheet'); 
    wordsForChecking = [];
});

