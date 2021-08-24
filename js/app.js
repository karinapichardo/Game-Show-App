const startOverlay = document.getElementById('overlay');
const headline = document.querySelector('.title');
const keyboard = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
let missed = 0;

const btnReset = document.querySelector('.btn__reset');
const phrases = ['hard work pays', 'javascript is fun', 'programming', 'greatness', 'success'];

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
    const ul = document.querySelector('#phrase ul');
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
        const heartImages = document.querySelectorAll('img');

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

    if (letterClass.length === showClass.length) {
        startOverlay.className = 'win';
        headline.textContent = 'YOU WON!!!!';
        startOverlay.style.display = 'flex';
        getRandomPhraseAsArray(phrases);
    } else if (missed > 4) {
        startOverlay.className = 'lose';
        headline.textContent = 'YOU LOST :('
        startOverlay.style.display = 'flex';
    }

    btnReset.textContent = 'Start Over'
    btnReset.addEventListener('click', () => {
        location.reload();
    });
}
