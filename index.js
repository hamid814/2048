import Board from './Board';

let board;
if (window.innerWidth < 500) {
  board = new Board({ width: window.innerWidth });
} else {
  board = new Board();
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
