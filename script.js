'use strict';

// Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNewGame = document.querySelector('.btn--new');
const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

let totalScores = [0, 0],
  currentScore = 0,
  activePlayer = 0,
  isGamePlaying = true; // state variable

// Starting conditions
const init = function () {
  totalScores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  isGamePlaying = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

// Rolling dice functionality
btnRollDice.addEventListener('click', function () {
  // 1. Roll randome dice number
  // we want to create a local variable here because on click of the rool dice we want to preduce a new dice number
  // math.random gives us number from 0 to 0.999
  // we times Math.random() by 6 to get 0 to 5
  // use math.trunc to remove decimals
  // the output from that + 1 to get to 6
  if (isGamePlaying) {
    const diceNumber = Math.trunc(Math.random() * 6) + 1;

    // 2. display that dice number
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceNumber}.png`;
    // 3. check if we roll 1 if true switch to next player
    if (diceNumber !== 1) {
      // add diceNumber to current score;
      currentScore += diceNumber;
      // dynamically chose active player
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

// button hold functionality
btnHold.addEventListener('click', function () {
  if (isGamePlaying) {
    //1 add current score to active players score
    totalScores[activePlayer] += currentScore;

    // scores[1] = scores[1] + 1;
    document.querySelector(`#score--${activePlayer}`).textContent =
      totalScores[activePlayer];
    // document.querySelector(`current--${activePlayer}`).textContent =
    //   totalScores[activePlayer];
    //2 check if score is >= 100

    // finish game
    if (totalScores[activePlayer] >= 100) {
      // when you use querySelector you need an actual selector
      diceEl.classList.add('hidden');

      isGamePlaying = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

// reset button
btnNew.addEventListener('click', init);
