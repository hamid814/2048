import gsap from 'gsap';

class Piece {
  constructor(number, position, board) {
    this.board = board;

    this.number = number;

    this.position = {};
    this.position.x = position.x;
    this.position.y = position.y;

    this.width = (board.misurements.width - board.misurements.gap * 5) / 4;

    this.elem = this.createElement(number);
  }

  createElement(number, position) {
    const { gap } = this.board.misurements;

    const elem = document.createElement('div');

    elem.className = 'piece';

    elem.style.width = this.width + 'px';
    elem.style.height = this.width + 'px';
    elem.style.borderRadius = this.board.misurements.radius + 'px';

    elem.style.left = this.position.x * (this.width + gap) + gap + 'px';
    elem.style.top = this.position.y * (this.width + gap) + gap + 'px';

    elem.innerText = String(number);

    this.board.elem.appendChild(elem);

    gsap.fromTo(elem, { duration: 0.05, scale: 0 }, { scale: 1 });

    return elem;
  }

  moveTo(position) {
    this.position = position;

    gsap.to(this.elem, { duration: 0.3, x: position.x, y: position.y });
  }
}

export default Piece;
