const inputWindow = document.getElementById('inputWindow');
const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');
const cardHeader = document.getElementById('cardHeader');
let answerNumber;
let victory = false;
let retry = 0;
let incorrectGame = false;
let randStep = false;
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
        if (randStep === true && minValue > maxValue) {
            while (!(minValue < maxValue)) {
                minValue = Math.round( Math.random() * 999);
            }
        }
        if (minValue > maxValue) {
            const phraseRandom = Math.round( Math.random() * 3);
            answerField.innerText = randomIncorrectNumb(phraseRandom);
            inputWindow.classList.add('collapse');
            document.getElementById('btnRandom').classList.add('collapse');
            document.getElementById('btnOk').classList.add('collapse');
            document.getElementById('btnRetry').classList.remove('collapse');
            incorrectGame = true;
            gameRun = false;
        } else {
            answerField.innerText = `Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`;
            inputWindow.classList.add('collapse');
            document.getElementById('btnRandom').classList.add('collapse');
            document.getElementById('btnOk').innerText = 'Загадал!';
        }
    }
    if (steps === 3) {
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
        randStep = true;
    }
    if (steps === 2) {
        maxValue = Math.round( Math.random() * 999);
        while (!(minValue < maxValue)) {
            maxValue = Math.round( Math.random() * 999);
        }
        answerField.innerText = `Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`;
        inputWindow.classList.add('collapse');
        document.getElementById('btnRandom').classList.add('collapse');
        document.getElementById('btnOk').innerText = 'Загадал!';
    }
    if (steps === 3) {
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
    if (incorrectGame) {
        inputWindow.classList.remove('collapse');
        document.getElementById('btnRandom').classList.remove('collapse');
        document.getElementById('btnOk').classList.remove('collapse');
        document.getElementById('btnRetry').classList.add('collapse');
    }
    retry = 1;
    gameStart();
    orderNumber = 1;
    steps = 0;
    gameRun = true;
    incorrectGame = false;
    randStep = false;
    victory = false;
    retry = 0;
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
        document.getElementById('btnLess').classList.add('collapse');
        document.getElementById('btnOver').classList.add('collapse');
        document.getElementById('btnEqual').classList.add('collapse');
        victory = true;
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

function randomIncorrectNumb (phraseRandom) {
    switch (phraseRandom) {
        case 0:
            phrase = `Вы ввели некорректные данные`;
            break;
        case 1:
            phrase = `Как так-то, минимум не может быть больше максимума\n\u{1F62D}`;
            break;
        case 2:
            phrase = `Неправильно, попробуй еще раз\n\u{1F60A}`;
            break;
        case 3:
            phrase = `Не забывай, первое число должно быть меньше второго, хорошо?\n\u{1F64F}`;
            break;
    }
    return phrase;
}

function gameStart() {
    console.log(victory);
    console.log(retry);
    if (victory === true && retry === 1) {
        inputWindow.classList.remove('collapse');
        document.getElementById('btnRetry').classList.add('collapse');
        document.getElementById('btnRandom').classList.remove('collapse');
        document.getElementById('btnOk').classList.remove('collapse');
        document.getElementById('btnOk').innerText = 'Ок';
        cardHeader.innerText = 'Начало игры';
        answerField.innerText = 'Введите минимальное значение числа для игры';
        inputWindow.value = '0';
    }
    if (victory === false && retry === 1) {
        document.getElementById('btnLess').classList.add('collapse');
        document.getElementById('btnOver').classList.add('collapse');
        document.getElementById('btnEqual').classList.add('collapse');
        inputWindow.classList.remove('collapse');
        document.getElementById('btnRetry').classList.add('collapse');
        document.getElementById('btnRandom').classList.remove('collapse');
        document.getElementById('btnOk').classList.remove('collapse');
        document.getElementById('btnOk').innerText = 'Ок';
        cardHeader.innerText = 'Начало игры';
        answerField.innerText = 'Введите минимальное значение числа для игры';
        inputWindow.value = '0';
    } else {
        cardHeader.innerText = 'Начало игры';
        answerField.innerText = 'Введите минимальное значение числа для игры';
        inputWindow.value = '0';
    }
}

function safeParse(input, defaultValue) {
    const num = parseInt(input);
    return isNaN(num) ? defaultValue : num > 999 ? 999 : num < -999 ? -999 : num;
}