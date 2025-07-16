const inputWindow = document.getElementById('inputWindow');
const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');
const cardHeader = document.getElementById('cardHeader');
let answerNumber;
let orderNumber = 1;
let gameRun = true;
let steps = 0;

gameStart();

document.getElementById('btnOk').addEventListener('click', function () {
    steps++;
    if (steps === 1 ) {
        minValue = safeParse(inputWindow.value, 0);
        answerField.innerText = 'Введите максимальное значение числа для игры';
        inputWindow.value = '100';
    }
    if (steps === 2) {
        maxValue = safeParse(inputWindow.value, 100);
        answerField.innerText = `Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`;
        inputWindow.classList.add('collapse');
        document.getElementById('btnRandom').classList.add('collapse');
        document.getElementById('btnOk').innerText = 'Загадал!';
    }
    if (steps === 3) {
        steps = 0;
        document.getElementById('btnLess').classList.remove('collapse');
        document.getElementById('btnOver').classList.remove('collapse');
        document.getElementById('btnEqual').classList.remove('collapse');
        document.getElementById('btnRetry').classList.remove('collapse');
        document.getElementById('btnOk').classList.add('collapse');
        answerNumber = Math.floor((minValue + maxValue) / 2);
        answerField.innerText = `Вы загадали число ${answerNumber }?`;
        cardHeader.innerText = `Вопрос №${orderNumber} `;
    }
})

document.getElementById('btnRandom').addEventListener('click', function () {
    steps++;
    if (steps === 1 ) {
        minValue = Math.round( Math.random() * 999);
        answerField.innerText = 'Введите максимальное значение числа для игры';
        inputWindow.value = '100';
    }
    if (steps === 2) {
        maxValue = Math.round( Math.random() * 999);
        do {
            minValue = Math.round( Math.random() * 999);
            minValue = Math.round( Math.random() * 999);
            console.log(minValue);
            console.log(maxValue);
        } while (!(minValue < maxValue)) {
            answerField.innerText = `Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`;
            inputWindow.classList.add('collapse');
            document.getElementById('btnRandom').classList.add('collapse');
            document.getElementById('btnOk').innerText = 'Загадал!';
        }
    }
    if (steps === 3) {
        steps = 0;
        document.getElementById('btnLess').classList.remove('collapse');
        document.getElementById('btnOver').classList.remove('collapse');
        document.getElementById('btnEqual').classList.remove('collapse');
        document.getElementById('btnRetry').classList.remove('collapse');
        document.getElementById('btnOk').classList.add('collapse');
        answerNumber = Math.floor((minValue + maxValue) / 2);
        answerField.innerText = `Вы загадали число ${answerNumber }?`;
        cardHeader.innerText = `Вопрос №${orderNumber} `;
    }
})

document.getElementById('btnRetry').addEventListener('click', function () {
    gameStart();
    orderNumber = 1;
    gameRun = true;
})

document.getElementById('btnOver').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue){
            const phraseRandom = Math.round( Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;
            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            minValue = answerNumber  + 1;
            answerNumber = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            cardHeader.innerText = `Вопрос №${orderNumber} `;
            const phraseRandom = Math.round( Math.random() * 3);
            answerField.innerText = randomPhraseAnswer(phraseRandom, answerNumber);
        }
    }
})

document.getElementById('btnLess').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue){
            const phraseRandom = Math.round( Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;
            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            maxValue = answerNumber;
            answerNumber  = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            cardHeader.innerText = `Вопрос №${orderNumber} `;
            const phraseRandom = Math.round( Math.random() * 3);
            answerField.innerText = randomPhraseAnswer(phraseRandom, answerNumber);
        }
    }
})

document.getElementById('btnEqual').addEventListener('click', function () {
    if (gameRun){
        const phraseRandom = Math.round( Math.random() * 3);
        answerField.innerText = randomPhraseOver(phraseRandom);
        gameRun = false;
    }
})

function randomPhraseAnswer (phraseRandom, answerNumber) {
    switch (phraseRandom) {
        case 0:
            phrase = `Вы загадали число ${answerNumber}?`;
            break;
        case 1:
            phrase = `Хех, ваше число ведь ${answerNumber}, да?`;
            break;
        case 2:
            phrase = `Ну и ну, это же число ${answerNumber}!`;
            break;
        case 3:
            phrase = `Слишком легко, это же ${answerNumber}?)`;
            break;
    }
    return phrase;
}

function randomPhraseOver (phraseRandom) {
    switch (phraseRandom) {
        case 0:
            phrase = `Я всегда угадываю\n\u{1F60E}`;
            break;
        case 1:
            phrase = `Это было слишком легко\n\u{1F389}`;
            break;
        case 2:
            phrase = `Я даже не старался\n\u{1F62D}`;
            break;
        case 3:
            phrase = `Ты думал, что я тебя не переиграю, что я тебя не уничтожу?.... Я уничтожу\n\u{1F480}`;
            break;
    }
    return phrase;
}

function gameStart() {
    inputWindow.classList.remove('collapse');
    document.getElementById('btnLess').classList.add('collapse');
    document.getElementById('btnOver').classList.add('collapse');
    document.getElementById('btnEqual').classList.add('collapse');
    document.getElementById('btnRetry').classList.add('collapse');
    document.getElementById('btnRandom').classList.remove('collapse');
    document.getElementById('btnOk').classList.remove('collapse');
    document.getElementById('btnOk').innerText = 'Ок';
    cardHeader.innerText = 'Начало игры';
    answerField.innerText = 'Введите минимальное значение числа для игры';
    inputWindow.value = '0';
}

function safeParse(input, defaultValue) {
    const num = parseInt(input);
    return isNaN(num) ? defaultValue : num > 999 ? 999 : num < -999 ? -999 : num;
}