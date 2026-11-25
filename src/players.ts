import {board, signs, type box} from "./assets";
import {play, compplay, over, updateResult, gameState} from "./logic";
import {getHint, type Hint, type HintContext} from "./hints";

function startGame(choice: string): void{
    if (gameState.started){
        return;
    }

    const computerSign = signs.find((sign) => sign !== choice);
    if (!signs.includes(choice) || !computerSign){
        throw new Error("Choose a valid player sign.");
    }

    gameState.playerSign = choice;
    gameState.computerSign = computerSign;
    gameState.started = true;
    gameState.message = `Your turn (${choice}).`;

    if (choice !== signs[0]){
        compplay(gameState.computerSign);
        updateResult(gameState.computerSign);
    }
}

function handlePlayerMove(cell: box): void{
    if (!gameState.started || gameState.ended || over || !cell.available){
        return;
    }

    play(gameState.playerSign, cell);
    updateResult(gameState.playerSign);

    if (!gameState.ended){
        compplay(gameState.computerSign);
        updateResult(gameState.computerSign);
    }
}

function requestHint(): Hint | null {
    if (!gameState.started || gameState.ended || over){
        return null;
    }

    const permittedMoves = boardPositions();
    if (permittedMoves.length === 0){
        return null;
    }

    const context: HintContext = {
        board: board.map((row) => row.map((cell) => cell.element.textContent ?? "")),
        playerSign: gameState.playerSign,
        computerSign: gameState.computerSign
    };
    const suggestion = getHint(context);
    const isPermitted = suggestion !== null
        && Number.isInteger(suggestion.row)
        && Number.isInteger(suggestion.column)
        && typeof suggestion.explanation === "string"
        && suggestion.explanation.trim().length > 0
        && permittedMoves.some(([row, column]) =>
            row === suggestion.row && column === suggestion.column
        );

    if (isPermitted && suggestion){
        return suggestion;
    }

    const fallbackMove = permittedMoves[0];
    if (!fallbackMove){
        return null;
    }

    const [row, column] = fallbackMove;
    return {
        row,
        column,
        explanation: "Choose an available square to keep building your line."
    };
}

function boardPositions(): [number, number][] {
    const positions: [number, number][] = [];
    board.forEach((row, rowIndex) => {
        row.forEach((cell, columnIndex) => {
            if (cell.available){
                positions.push([rowIndex, columnIndex]);
            }
        });
    });
    return positions;
}

export {startGame, handlePlayerMove, requestHint};
