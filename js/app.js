const startOverlay = document.getElementById('overlay');
const headline = document.querySelector('.title');
const keyboard = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const ul = document.querySelector('#phrase ul');
const heartImages = document.querySelectorAll('img');
let missed = 0;

const btnReset = document.querySelector('.btn__reset');
const phrases = [
    'hard work pays',
    'javascript is fun',
    'programming',
    'greatness',
    'success'
];

btnReset.addEventListener('click', () => {
    startOverlay.style.display = 'none';
});

function getRandomPhraseAsArray(arr) {
    const randomPhrase = arr[Math.floor(Math.random() * arr.length)];
    const newArr = randomPhrase.split('');
    return newArr;
}

const phraseArray = getRandomPhraseAsArray(phrases);

function addPhraseToDisplay(arr) {
    for (let i = 0; i < arr.length; i++) {
        const currentChar = arr[i];
        const listItem = document.createElement('li');

        listItem.textContent = currentChar;
        ul.appendChild(listItem);

        if ((/[a-zA-Z]/).test(currentChar)) {
            listItem.className = 'letter';
        } else if (currentChar === ' ') {
            listItem.className = 'space';
        }
    }
}

addPhraseToDisplay(phraseArray);

function checkLetter(button) {
    const letters = document.querySelectorAll('.letter');
    let matchingLetter;

    for (let i = 0; i < letters.length; i++) {
        if (letters[i].textContent === button.textContent) {
            letters[i].classList.add('show');
            matchingLetter = button.textContent;
        }
    }
    return matchingLetter;
}

keyboard.addEventListener('click', (e) => {
    const button = e.target;
    if (button.tagName === 'BUTTON') {
        button.classList.add('chosen');
        button.disabled = true;

        const letterFound = checkLetter(button);

        if (!letterFound) {
            heartImages[missed].src = 'images/lostHeart.png';
            missed++;
        }
        checkWin();
    }
});

function checkWin() {
    const letterClass = document.getElementsByClassName('letter');
    const showClass = document.getElementsByClassName('show');
    const buttons = document.querySelectorAll('.keyrow button');

    if (letterClass.length === showClass.length) {
        overlayDisplay('win', 'YOU WON!!!!');
    } else if (missed > 4) {
        overlayDisplay('lose', 'YOU LOST :(');
    }

    btnReset.textContent = 'Start Over';

    btnReset.addEventListener('click', () => {
        missed = 0;
        ul.innerHTML = `<ul></ul>`;
        addPhraseToDisplay(getRandomPhraseAsArray(phrases));

        for (let i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove('chosen');
            buttons[i].disabled = false;
        }
        for (let i = 0; i < heartImages.length; i++) {
            heartImages[i].src = 'images/liveHeart.png';
        }
    });
}

function overlayDisplay(results, text) {
    startOverlay.className = results;
    headline.textContent = text;
    startOverlay.style.display = 'flex';
}
