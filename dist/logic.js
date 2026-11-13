import { board, signs, box } from "./assets";
let over = false;
let smart = false; // toggled in every new session
const x = signs[0];
const o = signs[1];
if (!x || !o) {
    throw new Error("Please select a sign");
}
const gameState = {
    started: false,
    ended: false,
    playerSign: x,
    computerSign: o,
    message: "Choose a sign and start."
};
const winStates = [
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]]
];
//player's turn
function play(sign, cell) {
    if (cell.available) {
        cell.element.textContent = sign;
        cellAvailable(cell);
        if (checkWin(board, sign)) {
            over = true;
        }
    }
    return;
}
//computer's turn
function compplay(sign) {
    const availableCells = board.flat().filter((cell) => cell.available); //extract available cells
    if (over || availableCells.length === 0) {
        return;
    }
    let selectedCell;
    if (smart) { //computer tries to block player's winning moves
        const opponentSign = sign === x ? o : x;
        if (opponentSign) {
            for (const state of winStates) {
                const opponentMarks = state.filter(([row, column]) => board[row]?.[column]?.element.textContent === opponentSign).length;
                const openPosition = state.find(([row, column]) => {
                    const cell = board[row]?.[column];
                    return cell?.available === true && cell.element.textContent === "";
                });
                if (opponentMarks === 2 && openPosition) {
                    selectedCell = board[openPosition[0]]?.[openPosition[1]];
                    if (selectedCell) {
                        break;
                    }
                }
            }
        }
    }
    if (!selectedCell) {
        selectedCell = availableCells[Math.floor(Math.random() * availableCells.length)];
    }
    if (selectedCell?.available) {
        selectedCell.element.textContent = sign;
        cellAvailable(selectedCell);
        if (checkWin(board, sign)) {
            over = true;
        }
        smart = !smart;
    }
}
function cellAvailable(box) {
    if (box.available === true) {
        box.available = false;
    }
    return;
}
function checkWin(board, sign) {
    return winStates.some((state) => state.every(([row, column]) => board[row]?.[column]?.element.textContent === sign));
}
function isDraw() {
    return board.flat().every((cell) => !cell.available);
}
function updateResult(sign) {
    if (over) {
        gameState.ended = true;
        gameState.message = sign === gameState.playerSign
            ? `You win (${sign}).`
            : `Computer wins (${sign}).`;
    }
    else if (isDraw()) {
        gameState.ended = true;
        gameState.message = "It's a draw.";
    }
    else {
        gameState.message = `Your turn (${gameState.playerSign}).`;
    }
}
export { play, compplay, over, gameState, updateResult };
//# sourceMappingURL=logic.js.map