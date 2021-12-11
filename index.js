import Board from './Board';

let initial = [
  {
    number: 2,
    position: {
      x: 0,
      y: 0,
    },
  },
  {
    number: 2,
    position: {
      x: 1,
      y: 0,
    },
  },
];

// get config from localstorage
const confString = localStorage.getItem('config');
confString && (initial = JSON.parse(confString));

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
    case 'Escape':
      board.undo();
      return;
    default:
      return;
  }

  board.move(direction);
});
