const words = ['javascript', 'hangman', 'computer', 'programming', 'developer'];
let selectedWord;
let mistakes = 0;
let guessedLetters = [];
let correctGuesses = [];

const wordElement = document.getElementById('word');
const messageElement = document.getElementById('message');
const lettersElement = document.getElementById('letters');
const canvas = document.getElementById('hangmanCanvas');
const ctx = canvas.getContext('2d');

function chooseRandomWord() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
}

function displayWord() {
    wordElement.innerHTML = selectedWord
        .split('')
        .map(letter => (correctGuesses.includes(letter) ? letter : '_'))
        .join(' ');
}

function displayLetters() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    lettersElement.innerHTML = '';
    alphabet.forEach(letter => {
        const button = document.createElement('button');
        button.textContent = letter;
        button.onclick = () => guessLetter(letter);
        lettersElement.appendChild(button);
    });
}

function guessLetter(letter) {
    if (selectedWord.includes(letter)) {
        correctGuesses.push(letter);
        displayWord();
        checkWin();
    } else {
        guessedLetters.push(letter);
        mistakes++;
        drawHangman();
        checkLoss();
    }
}

function drawHangman() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    switch (mistakes) {
        case 1:
            // Draw the base
            ctx.moveTo(10, 190);
            ctx.lineTo(190, 190);
            break;
        case 2:
            // Draw the stand
            ctx.moveTo(50, 190);
            ctx.lineTo(50, 20);
            break;
        case 3:
            // Draw the top
            ctx.lineTo(150, 20);
            break;
        case 4:
            // Draw the rope
            ctx.lineTo(150, 50);
            break;
        case 5:
            // Draw the head
            ctx.arc(150, 70, 20, 0, Math.PI * 2);
            break;
        case 6:
            // Draw the body
            ctx.moveTo(150, 90);
            ctx.lineTo(150, 130);
            break;
        case 7:
            // Draw the left arm
            ctx.moveTo(150, 100);
            ctx.lineTo(130, 110);
            break;
        case 8:
            // Draw the right arm
            ctx.moveTo(150, 100);
            ctx.lineTo(170, 110);
            break;
        case 9:
            // Draw the left leg
            ctx.moveTo(150, 130);
            ctx.lineTo(130, 160);
            break;
        case 10:
            // Draw the right leg and lose
            ctx.moveTo(150, 130);
            ctx.lineTo(170, 160);
            messageElement.textContent = 'You Lost!';
            disableButtons();
            break;
    }
    ctx.stroke();
}

function checkWin() {
    if (selectedWord.split('').every(letter => correctGuesses.includes(letter))) {
        messageElement.textContent = 'You Won!';
        disableButtons();
    }
}

function checkLoss() {
    if (mistakes === 10) {
        wordElement.textContent = selectedWord;
        disableButtons();
    }
}

function disableButtons() {
    const buttons = lettersElement.getElementsByTagName('button');
    for (let button of buttons) {
        button.disabled = true;
    }
}

function restartGame() {
    mistakes = 0;
    guessedLetters = [];
    correctGuesses = [];
    messageElement.textContent = '';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    chooseRandomWord();
    displayWord();
    displayLetters();
}

chooseRandomWord();
displayWord();
displayLetters();
