import { board, signs } from "./assets";
import { gameState } from "./logic";
import { startGame, handlePlayerMove, requestHint } from "./players";
const boardElement = document.getElementById("board");
const statusElement = document.getElementById("status");
const playerSignSelect = document.getElementById("player-sign");
const startButton = document.getElementById("start-game");
const restartButton = document.getElementById("restart-game");
const hintButton = document.getElementById("get-hint");
const hintElement = document.getElementById("hint");
if (!(boardElement instanceof HTMLDivElement)
    || !(statusElement instanceof HTMLElement)
    || !(playerSignSelect instanceof HTMLSelectElement)
    || !(startButton instanceof HTMLButtonElement)
    || !(restartButton instanceof HTMLButtonElement)
    || !(hintButton instanceof HTMLButtonElement)
    || !(hintElement instanceof HTMLElement)) {
    throw new Error("The game page is missing a required element.");
}
const ui = {
    boardElement,
    statusElement,
    playerSignSelect,
    startButton,
    restartButton,
    hintButton,
    hintElement
};
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
            ui.hintElement.textContent = "";
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
    ui.hintButton.disabled = !gameState.started || gameState.ended;
    for (const cell of board.flat()) {
        cell.element.disabled = !gameState.started || gameState.ended || !cell.available;
    }
}
ui.startButton.addEventListener("click", () => {
    ui.hintElement.textContent = "";
    startGame(ui.playerSignSelect.value);
    renderGame();
});
ui.hintButton.addEventListener("click", () => {
    const hint = requestHint();
    ui.hintElement.textContent = hint
        ? `Try row ${hint.row + 1}, column ${hint.column + 1}. ${hint.explanation}`
        : "No hint is available right now.";
});
ui.restartButton.addEventListener("click", () => window.location.reload());
renderGame();
//# sourceMappingURL=frontend.js.map