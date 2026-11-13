import { box } from "./assets";
declare let over: boolean;
declare const gameState: {
    started: boolean;
    ended: boolean;
    playerSign: string;
    computerSign: string;
    message: string;
};
declare function play(sign: string, cell: box): void;
declare function compplay(sign: string): void;
declare function updateResult(sign: string): void;
export { play, compplay, over, gameState, updateResult };
//# sourceMappingURL=logic.d.ts.map