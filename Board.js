import Piece from './Piece';

class Board {
  constructor(inOptions, initialOrder) {
    const options = inOptions || {};

    const na = [null, null, null, null];

    this.cells = initialOrder || [[...na], [...na], [...na], [...na]];

    this.misurements = {
      width: options.width || 500,
      gap: options.width ? options.width * 0.03 : 12,
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
    elem.style.borderRadius = this.misurements.radius * 2 + 'px';

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

    const piece = new Piece(number, cell, this);

    return piece;
  }

  fillCell(piece) {
    this.cells[piece.position.x][piece.position.y] = piece;
  }

  emptyCell(pos) {
    this.cells[pos.x][pos.y] = null;
  }

  startGame() {
    for (let i = 0; i < 9; i++) {
      const cell = this.getRandomPiece();
      this.fillCell(cell);
    }
  }

  addPiece() {
    const cell = this.getRandomPiece();
    this.fillCell(cell);
  }

  move(direction) {
    let moved = false;

    if (direction === 0) {
      moved = this.moveUp();
    }
    if (direction === 1) {
      moved = this.moveRight();
    }
    if (direction === 2) {
      moved = this.moveDown();
    }
    if (direction === 3) {
      moved = this.moveLeft();
    }

    if (moved) {
      this.addPiece();
    }
  }

  moveUp() {
    let moved = false;

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const piece = this.cells[i][j];
        if (piece !== null) {
          for (let k = 0; k < 4; k++) {
            if (this.cells[i][k] === null && piece.position.y > k) {
              piece.moveTo({ x: i, y: k });
              moved = true;
              break;
            }
          }

          // if (this.cells[i][0] === null && piece.position.y > 0) {
          //   piece.moveTo({ x: i, y: 0 });
          // } else if (this.cells[i][1] === null && piece.position.y > 1) {
          //   piece.moveTo({ x: i, y: 1 });
          // } else if (this.cells[i][2] === null && piece.position.y > 2) {
          //   piece.moveTo({ x: i, y: 2 });
          // } else if (this.cells[i][3] === null && piece.position.y > 3) {
          //   piece.moveTo({ x: i, y: 3 });
          // }
        }
      }
    }

    return moved;
  }

  moveRight() {
    let moved = false;

    for (let i = 3; i >= 0; i--) {
      for (let j = 0; j < 4; j++) {
        const piece = this.cells[i][j];
        if (piece !== null) {
          for (let k = 3; k >= 0; k--) {
            if (this.cells[k][j] === null && piece.position.x < k) {
              piece.moveTo({ x: k, y: j });
              moved = true;
              break;
            }
          }
        }
      }
    }

    return moved;
  }

  moveDown() {
    let moved = false;

    for (let i = 0; i < 4; i++) {
      for (let j = 3; j >= 0; j--) {
        const piece = this.cells[i][j];
        if (piece !== null) {
          for (let k = 4; k >= 0; k--) {
            if (this.cells[i][k] === null && piece.position.y < k) {
              piece.moveTo({ x: i, y: k });
              moved = true;
              break;
            }
          }
        }
      }
    }

    return moved;
  }

  moveLeft() {
    let moved = false;

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const piece = this.cells[i][j];
        if (piece !== null) {
          for (let k = 0; k < 4; k++) {
            if (this.cells[k][j] === null && piece.position.x > k) {
              piece.moveTo({ x: k, y: j });
              moved = true;
              break;
            }
          }
        }
      }
    }

    return moved;
  }
}

export default Board;
