//each box on the board
class box {
  constructor(public available: boolean, public element: HTMLButtonElement) {
    this.available = available;
    this.element = element;
  }}

  //board -> 2D array of boxes
const board: box[][] = Array.from({ length: 3 }, () =>
  Array.from({ length: 3 }, () => new box(true, document.createElement('button')))
);
const signs: string[] = ["X", "O"];
export {board, signs, box};