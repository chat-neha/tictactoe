type HintContext = {
    readonly board: readonly (readonly string[])[];
    readonly playerSign: string;
    readonly computerSign: string;
};

type Hint = {
    readonly row: number;
    readonly column: number;
    readonly explanation: string;
};

type Position = readonly [row: number, column: number];

const winStates: readonly (readonly Position[])[] = [
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]]
];

function getHint(context: HintContext): Hint | null {
    const availablePositions: Position[] = [];

    for (let row = 0; row < 3; row++){
        for (let column = 0; column < 3; column++){
            if (context.board[row]?.[column] === ""){
                availablePositions.push([row, column]);
            }
        }
    }

    if (availablePositions.length === 0){
        return null;
    }

    for (const [sign, explanation] of [
        [context.playerSign, "You can complete a line here and win."],
        [context.computerSign, "Play here to block the computer from completing a line."]
    ] as const){
        for (const state of winStates){
            const markedPositions = state.filter(([row, column]) =>
                context.board[row]?.[column] === sign
            ).length;
            const openPosition = state.find(([row, column]) =>
                context.board[row]?.[column] === ""
            );

            if (markedPositions === 2 && openPosition){
                return {
                    row: openPosition[0],
                    column: openPosition[1],
                    explanation
                };
            }
        }
    }

    const center = availablePositions.find(([row, column]) => row === 1 && column === 1);
    if (center){
        return {
            row: center[0],
            column: center[1],
            explanation: "The center gives you several ways to build a line."
        };
    }

    const corner = availablePositions.find(([row, column]) =>
        (row === 0 || row === 2) && (column === 0 || column === 2)
    );
    const position = corner ?? availablePositions[0];
    if (!position){
        return null;
    }

    return {
        row: position[0],
        column: position[1],
        explanation: "Choose an open square to keep building your line."
    };
}

export {getHint};
export type {Hint, HintContext};
