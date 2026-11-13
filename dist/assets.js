//each box on the board
class box {
    constructor(available, element) {
        this.available = available;
        this.element = element;
        this.available = available;
        this.element = element;
    }
}
//board -> 2D array of boxes
const board = Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => new box(true, document.createElement('button'))));
const signs = ["X", "O"];
export { board, signs, box };
//# sourceMappingURL=assets.js.map