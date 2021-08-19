const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const missed = 0;

const btnReset = document.querySelector('.btn__reset');
const phrases = ['Passion', 'Love', 'Programming', 'Greatness', 'Success'];

btnReset.addEventListener('click', () => {
    const startOverlay = document.getElementById('overlay');
    startOverlay.style.display = 'none';
});

function getRandomPhraseAsArray(arr) {
    // so need to choose a random string from the array
    const randomPhrase = arr[Math.floor(Math.random() * arr.length)];
    // need to split that phrase into a new array of individual characters
    const newArr = randomPhrase.split('');
    // return the newly created array
    return newArr;
}
const phraseArray = getRandomPhraseAsArray(phrases);

function addPhraseToDisplay(arr) {
    const ul = document.querySelector('#phrase ul');
    // loop through an array of characters
    for (let i = 0; i < arr.length; i++) {
        const currentChar = arr[i];
        // for each string in arr, create a list item 
        const listItem = document.createElement('li');
        // put the string inside of the list item
        listItem.textContent = currentChar;
        // append that list item to the #phrase ul in html
        ul.appendChild(listItem);
        //if the character in the array is a letter and not a space, the function should add "letter" to the list item
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
    const matchingLetter = null;

    for (let i = 0; i < letters.length; i++) {
        if (letters[i].textContent === button.textContent) {
            letters[i].classList.add('show');
            matchingLetter = button.textContent;
        }
        return matchingLetter;
    }
}
