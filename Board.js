import Piece from './Piece';

class Board {
  constructor(inOptions, initialOrder) {
    const options = inOptions || {};

    const na = [null, null, null, null];

    this.cells = initialOrder || [[...na], [...na], [...na], [...na]];

    this.misurements = {
      width: options.width || 500,
      gap: options.gap || 20,
      radius: options.radius || 10,
    };

    this.elem = this.createElement();
    this.emptyCells = this.createEmptyCells();

    this.startGame();
  }

  createElement() {
    const elem = document.createElement('div');

    elem.className = 'board';

    elem.style.width = this.misurements.width + 'px';
    elem.style.height = this.misurements.width + 'px';
    elem.style.borderRadius = this.misurements.radius + 'px';

    document.body.appendChild(elem);

    return elem;
  }

  createEmptyCells() {
    const width = (this.misurements.width - this.misurements.gap * 5) / 4;
    const { gap, radius } = this.misurements;

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const cell = document.createElement('div');

        cell.className = 'empty-cell';

        cell.style.width = width + 'px';
        cell.style.height = width + 'px';
        cell.style.borderRadius = radius + 'px';

        cell.style.left = i * (width + gap) + gap + 'px';
        cell.style.top = j * (width + gap) + gap + 'px';

        this.elem.appendChild(cell);
      }
    }
  }

  getEmptyCells() {
    const cells = [];

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const cell = this.cells[i][j];

        if (cell === null) {
          cells.push({ x: i, y: j });
        }
      }
    }

    return cells;
  }

  getRandomPiece() {
    const number = Math.random() < 0.75 ? 2 : 4;

    const emptyCells = this.getEmptyCells();
    const cell = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    console.log(cell);

    const piece = new Piece(number, cell, this);

    return piece;
  }

  startGame() {
    const cell1 = this.getRandomPiece();
    this.cells[cell1.position.x][cell1.position.y] = cell1;

    const cell2 = this.getRandomPiece();
    this.cells[cell2.position.x][cell2.position.y] = cell2;
  }

  move(direction) {}
}

export default Board;
