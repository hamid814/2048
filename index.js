import Board from './Board';

const initial = [
  {
    number: 4,
    position: {
      x: 3,
      y: 0,
    },
  },
  {
    number: 4,
    position: {
      x: 3,
      y: 2,
    },
  },
  {
    number: 2,
    position: {
      x: 3,
      y: 3,
    },
  },
];

let board;
if (window.innerWidth < 500) {
  board = new Board({ width: window.innerWidth }, initial);
} else {
  board = new Board({}, initial);
}

document.addEventListener('keydown', (e) => {
  let direction;

  switch (e.key) {
    case 'ArrowUp':
      direction = 0;
      break;
    case 'ArrowRight':
      direction = 1;
      break;
    case 'ArrowDown':
      direction = 2;
      break;
    case 'ArrowLeft':
      direction = 3;
      break;
    default:
      return;
  }

  board.move(direction);
});
