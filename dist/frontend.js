import { board, signs } from "./assets";
import { gameState } from "./logic";
import { startGame, handlePlayerMove } from "./players";
const boardElement = document.getElementById("board");
const statusElement = document.getElementById("status");
const playerSignSelect = document.getElementById("player-sign");
const startButton = document.getElementById("start-game");
const restartButton = document.getElementById("restart-game");
if (!(boardElement instanceof HTMLDivElement)
    || !(statusElement instanceof HTMLElement)
    || !(playerSignSelect instanceof HTMLSelectElement)
    || !(startButton instanceof HTMLButtonElement)
    || !(restartButton instanceof HTMLButtonElement)) {
    throw new Error("The game page is missing a required element.");
}
const ui = { boardElement, statusElement, playerSignSelect, startButton, restartButton };
for (const sign of signs) {
    const option = document.createElement("option");
    option.value = sign;
    option.textContent = sign;
    playerSignSelect.append(option);
}
playerSignSelect.value = gameState.playerSign;
board.forEach((row, rowIndex) => {
    row.forEach((cell, columnIndex) => {
        cell.element.type = "button";
        cell.element.className = "cell";
        cell.element.disabled = true;
        cell.element.setAttribute("aria-label", `Row ${rowIndex + 1}, column ${columnIndex + 1}`);
        cell.element.addEventListener("click", () => {
            handlePlayerMove(cell);
            renderGame();
        });
        ui.boardElement.append(cell.element);
    });
});
function renderGame() {
    ui.statusElement.textContent = gameState.message;
    ui.playerSignSelect.disabled = gameState.started;
    ui.startButton.disabled = gameState.started;
    for (const cell of board.flat()) {
        cell.element.disabled = !gameState.started || gameState.ended || !cell.available;
    }
}
ui.startButton.addEventListener("click", () => {
    startGame(ui.playerSignSelect.value);
    renderGame();
});
ui.restartButton.addEventListener("click", () => window.location.reload());
renderGame();
//# sourceMappingURL=frontend.js.map