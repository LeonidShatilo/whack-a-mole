const holes = document.querySelectorAll('.hole'),
      scoreBoard = document.querySelector('.score'),
      moles = document.querySelectorAll('.mole'),
      start = document.getElementById('start-game');
let lastHole,
    isTimeOut = false,
    score = 0;

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
  let time = randomTime(200, 1000),
      hole = randomHole(holes);
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if (!isTimeOut) moleGetOut();
  }, time);
}

function startGame() {
  scoreBoard.textContent = 0;
  isTimeOut = false;
  score = 0;
  moleGetOut();
  setTimeout(() => (isTimeOut = true), 10000);
}

function strikeMole(event) {
  if (!event.isTrusted) return; // Cheater!
  score++;
  this.classList.remove('up');
  scoreBoard.textContent = score;
}

moles.forEach((mole) => mole.addEventListener('click', strikeMole));
start.addEventListener('click', startGame);