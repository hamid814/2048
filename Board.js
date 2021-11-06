import Piece from './Piece';

class Board {
  constructor(inOptions, initialOrder) {
    const options = inOptions || {};

    const na = [null, null, null, null];

    this.cells = [[...na], [...na], [...na], [...na]];

    this.misurements = {
      width: options.width || 500,
      gap: options.width ? options.width * 0.03 : 12,
      radius: options.radius || 10,
    };

    this.elem = this.createElement();
    this.emptyCells = this.createEmptyCells();

    if (initialOrder) {
      this.fillBoardWithConfig(initialOrder);
    } else {
      this.startGame();
    }
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

  getPieces() {
    const cells = [];

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const piece = this.cells[i][j];
        if (piece !== null) {
          cells.push(piece);
        }
      }
    }

    return cells;
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
    console.log('empty: ' + pos.x + ',' + pos.y);
    this.cells[pos.x][pos.y] = null;
  }

  fillBoardWithConfig(config) {
    config.forEach((item) => {
      this.cells[item.position.x][item.position.y] = new Piece(
        item.number,
        item.position,
        this
      );
    });
  }

  logCells() {
    const { cells } = this;

    console.log('-----------');
    console.log(
      '|',
      cells[0][0] ? cells[0][0].number : 0,
      cells[1][0] ? cells[1][0].number : 0,
      cells[2][0] ? cells[2][0].number : 0,
      cells[3][0] ? cells[3][0].number : 0,
      '|'
    );
    console.log(
      '|',
      cells[0][1] ? cells[0][1].number : 0,
      cells[1][1] ? cells[1][1].number : 0,
      cells[2][1] ? cells[2][1].number : 0,
      cells[3][1] ? cells[3][1].number : 0,
      '|'
    );
    console.log(
      '|',
      cells[0][2] ? cells[0][2].number : 0,
      cells[1][2] ? cells[1][2].number : 0,
      cells[2][2] ? cells[2][2].number : 0,
      cells[3][2] ? cells[3][2].number : 0,
      '|'
    );
    console.log(
      '|',
      cells[0][3] ? cells[0][3].number : 0,
      cells[1][3] ? cells[1][3].number : 0,
      cells[2][3] ? cells[2][3].number : 0,
      cells[3][3] ? cells[3][3].number : 0,
      '|'
    );
    console.log('-----------');
  }

  startGame() {
    for (let i = 0; i < 2; i++) {
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

    this.getPieces().forEach((piece) => (piece.justDoubled = false));

    if (moved) {
      this.addPiece();
    }
  }

  moveUp() {
    let moved = false;

    for (let x = 0; x < 4; x++) {
      for (let y = 0; y < 4; y++) {
        const piece = this.cells[x][y];
        if (piece !== null) {
          // if (this.cells[i][0] === null && piece.position.y > 0) {
          //   piece.moveTo({ x: i, y: 0 });
          // } else if (this.cells[i][1] === null && piece.position.y > 1) {
          //   piece.moveTo({ x: i, y: 1 });
          //   if (
          //     this.cells[i][0].number === piece.number &&
          //     !this.cells[i][0].justDoubled
          //   ) {
          //     this.cells[i][0].double();
          //     piece.dispose(this.cells[i][0].position);
          //   }
          // } else if (this.cells[i][2] === null && piece.position.y > 2) {
          //   piece.moveTo({ x: i, y: 2 });
          //   if (
          //     this.cells[i][1].number === piece.number &&
          //     !this.cells[i][1].justDoubled
          //   ) {
          //     this.cells[i][1].double();
          //     piece.dispose(this.cells[i][1].position);
          //   }
          // } else if (this.cells[i][3] === null && piece.position.y > 3) {
          //   piece.moveTo({ x: i, y: 3 });
          //   if (
          //     this.cells[i][2].number === piece.number &&
          //     !this.cells[i][2].justDoubled
          //   ) {
          //     this.cells[i][2].double();
          //     piece.dispose(this.cells[i][2].position);
          //   }
          // }

          const { cells } = this;
          let doubled = false;

          for (let k = y - 1; k >= 0; k--) {
            if (cells[x][k] !== null) {
              if (
                cells[x][k].number === piece.number &&
                !cells[x][k].justDoubled
              ) {
                cells[x][k].double();
                piece.dispose(cells[x][k].position);
                moved = true;
                doubled = true;
              } else {
                break;
              }
            }
          }
          if (!doubled) {
            for (let k = 0; k < 4; k++) {
              if (this.cells[x][k] === null && piece.position.y > k) {
                piece.moveTo({ x: x, y: k });
                moved = true;
                break;
              }
            }
          }
        }
      }
    }

    return moved;
  }

  moveRight() {
    let moved = false;

    for (let x = 3; x >= 0; x--) {
      for (let y = 0; y < 4; y++) {
        const piece = this.cells[x][y];
        if (piece !== null) {
          const { cells } = this;
          let doubled = false;

          for (let k = x + 1; k < 4; k++) {
            if (cells[k][y] !== null) {
              if (
                cells[k][y].number === piece.number &&
                !cells[k][y].justDoubled
              ) {
                cells[k][y].double();
                piece.dispose(cells[k][y].position);
                moved = true;
                doubled = true;
              } else {
                break;
              }
            }
          }
          if (!doubled) {
            for (let k = 3; k >= 0; k--) {
              if (this.cells[k][y] === null && piece.position.x < k) {
                piece.moveTo({ x: k, y: y });
                moved = true;
                break;
              }
            }
          }
        }
      }
    }

    return moved;
  }

  moveDown() {
    let moved = false;

    for (let x = 0; x < 4; x++) {
      for (let y = 3; y >= 0; y--) {
        const piece = this.cells[x][y];
        if (piece !== null) {
          const { cells } = this;
          let doubled = false;

          for (let k = y + 1; k < 4; k++) {
            if (cells[x][k] !== null) {
              if (
                cells[x][k].number === piece.number &&
                !cells[x][k].justDoubled
              ) {
                cells[x][k].double();
                piece.dispose(cells[x][k].position);
                moved = true;
                doubled = true;
              } else {
                break;
              }
            }
          }
          if (!doubled) {
            for (let k = 4; k >= 0; k--) {
              if (this.cells[x][k] === null && piece.position.y < k) {
                piece.moveTo({ x: x, y: k });
                moved = true;
                break;
              }
            }
          }
        }
      }
    }

    return moved;
  }

  moveLeft() {
    let moved = false;

    for (let x = 0; x < 4; x++) {
      for (let y = 0; y < 4; y++) {
        const piece = this.cells[x][y];
        if (piece !== null) {
          const { cells } = this;
          let doubled = false;

          for (let k = x - 1; k >= 0; k--) {
            if (cells[k][y] !== null) {
              if (
                cells[k][y].number === piece.number &&
                !cells[k][y].justDoubled
              ) {
                cells[k][y].double();
                piece.dispose(cells[k][y].position);
                moved = true;
                doubled = true;
              } else {
                break;
              }
            }
          }
          if (!doubled) {
            for (let k = 0; k < 4; k++) {
              if (this.cells[k][y] === null && piece.position.x > k) {
                piece.moveTo({ x: k, y: y });
                moved = true;
                break;
              }
            }
          }
        }
      }
    }

    return moved;
  }
}

export default Board;
