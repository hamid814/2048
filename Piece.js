import gsap from 'gsap';

class Piece {
  constructor(number, position, board) {
    this.board = board;

    this.number = number;

    this.id = Math.floor(Math.random() * 100);

    this.position = {};
    this.position.x = position.x;
    this.position.y = position.y;

    this.justDoubled = false;

    this.width = (board.misurements.width - board.misurements.gap * 5) / 4;

    this.elem = this.createElement(number);
  }

  createElement(number) {
    const { gap } = this.board.misurements;

    const elem = document.createElement('div');

    elem.className = 'piece';

    elem.style.width = this.width + 'px';
    elem.style.height = this.width + 'px';
    elem.style.borderRadius = this.board.misurements.radius + 'px';

    elem.style.left = this.position.x * (this.width + gap) + gap + 'px';
    elem.style.top = this.position.y * (this.width + gap) + gap + 'px';

    elem.innerText = String(this.number);

    this.board.elem.appendChild(elem);

    gsap.fromTo(
      elem,
      { scale: 0 },
      { scale: 1, duration: 0.25, ease: 'Power2.easeInOut' }
    );

    return elem;
  }

  moveTo(position) {
    this.board.emptyCell(this.position);

    this.position = position;
    //
    this.board.fillCell(this);

    const { gap } = this.board.misurements;

    const left = this.position.x * (this.width + gap) + gap;
    const top = this.position.y * (this.width + gap) + gap;

    gsap.to(this.elem, { duration: 0.15, left, top, ease: 'Power2.easeInOut' });
  }

  double() {
    this.number = this.number * 2;

    this.elem.innerText = String(this.number);
    this.elem.classList.add('doubled');

    this.justDoubled = true;
  }

  dispose(position) {
    this.board.emptyCell(this.position);

    const { gap } = this.board.misurements;

    const left = position.x * (this.width + gap) + gap;
    const top = position.y * (this.width + gap) + gap;

    gsap.to(this.elem, { duration: 0.15, left, top, ease: 'Power2.easeInOut' });

    setTimeout(() => {
      this.elem.remove();
    }, 150);
  }
}

export default Piece;
