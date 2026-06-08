// Setup: Create a deck and shuffle
let deck = [];
for (let i = 0; i < 52; i++) deck.push(i);
deck.sort(() => Math.random() - 0.5); // Shuffle
let cards = deck.slice(0, 21); // Take top 21

let round = 0;

function renderBoard() {
    const board = document.getElementById('board');
    board.innerHTML = '';
    for (let col = 0; col < 3; col++) {
        let div = document.createElement('div');
        div.className = 'column';
        for (let row = 0; row < 7; row++) {
            let cardIndex = col + (row * 3);
            div.innerHTML += `<div class="card">${cards[cardIndex]}</div>`;
        }
        board.appendChild(div);
    }
}

function pickColumn(selectedCol) {
    // Logic: Move selected column to the middle of the array
    let newCards = [];
    let left = [], middle = [], right = [];

    for (let i = 0; i < 7; i++) {
        left.push(cards[i * 3]);
        middle.push(cards[i * 3 + 1]);
        right.push(cards[i * 3 + 2]);
    }

    if (selectedCol === 0) newCards = [...middle, ...left, ...right];
    else if (selectedCol === 1) newCards = [...left, ...middle, ...right];
    else newCards = [...left, ...right, ...middle];

    cards = newCards;
    round++;

    if (round < 3) {
        renderBoard();
    } else {
        document.getElementById('message').innerText = `Your secret card is: ${cards[10]}`;
        document.getElementById('board').innerHTML = '';
        const playAgainBtn = document.createElement('button');
        playAgainBtn.textContent = 'Play Again';
        playAgainBtn.addEventListener('click', () => location.reload());
        document.getElementById('controls').innerHTML = '';
        document.getElementById('controls').appendChild(playAgainBtn);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const col0Btn = document.getElementById('col0Btn');
    const col1Btn = document.getElementById('col1Btn');
    const col2Btn = document.getElementById('col2Btn');

    if (col0Btn) {
        col0Btn.addEventListener('click', () => pickColumn(0));
    }

    if (col1Btn) {
        col1Btn.addEventListener('click', () => pickColumn(1));
    }

    if (col2Btn) {
        col2Btn.addEventListener('click', () => pickColumn(2));
    }

    renderBoard();
});
