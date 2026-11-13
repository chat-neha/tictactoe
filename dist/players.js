import { signs } from "./assets";
import { play, compplay, over, updateResult, gameState } from "./logic";
function startGame(choice) {
    if (gameState.started) {
        return;
    }
    const computerSign = signs.find((sign) => sign !== choice);
    if (!signs.includes(choice) || !computerSign) {
        throw new Error("Choose a valid player sign.");
    }
    gameState.playerSign = choice;
    gameState.computerSign = computerSign;
    gameState.started = true;
    gameState.message = `Your turn (${choice}).`;
    if (choice !== signs[0]) {
        compplay(gameState.computerSign);
        updateResult(gameState.computerSign);
    }
}
function handlePlayerMove(cell) {
    if (!gameState.started || gameState.ended || over || !cell.available) {
        return;
    }
    play(gameState.playerSign, cell);
    updateResult(gameState.playerSign);
    if (!gameState.ended) {
        compplay(gameState.computerSign);
        updateResult(gameState.computerSign);
    }
}
export { startGame, handlePlayerMove };
//# sourceMappingURL=players.js.map