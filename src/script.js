const holes = document.querySelectorAll('.hole'),
      scoreBoard = document.querySelector('.score'),
      bestScore = document.querySelector('.best-score'),
      moles = document.querySelectorAll('.mole'),
      start = document.getElementById('start-game');

let lastHole,
    lastStrike,
    isTimeOut = false,
    currentScore = 0,
    savedScore = 0;

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  let index = Math.floor(Math.random() * holes.length),
    hole = holes[index];
  if (hole === lastHole) {
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

function moleGetOut() {
  let time = randomTime(200, 800),
    hole = randomHole(holes);
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if (!isTimeOut) moleGetOut();
  }, time);
}

function getBestScore() {
  if (localStorage.getItem('best-score') === null) {
    bestScore.textContent = 0;
  } else {
    bestScore.textContent = localStorage.getItem('best-score');
  }
}

function setBestScore() {
  if (Number(localStorage.getItem('best-score')) < savedScore) {
    localStorage.setItem('best-score', savedScore);
  }
}

function startGame() {
  scoreBoard.textContent = 0;
  isTimeOut = false;
  this.disabled = true;
  if (currentScore > savedScore) {
    savedScore = currentScore;
    setBestScore();
  }
  currentScore = 0;
  moleGetOut();
  setTimeout(() => {
    isTimeOut = true;
    this.disabled = false;
  }, 20000);
  getBestScore();
}

function strikeMole(event) {
  if (!event.isTrusted) return; // Cheater!
  if (lastStrike !== this.dataset.strike) {
    currentScore++;
  }
  lastStrike = this.dataset.strike;
  this.classList.remove('up');
  scoreBoard.textContent = currentScore;
}

moles.forEach((mole) => mole.addEventListener('click', strikeMole));
start.addEventListener('click', startGame);

getBestScore();