const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const missed = 0;

const btnReset = document.querySelector('.btn__reset');

btnReset.addEventListener('click', () => {
    const startOverlay = document.getElementById('overlay');
    startOverlay.style.display = 'none';
});
