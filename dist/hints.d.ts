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
declare function getHint(context: HintContext): Hint | null;
export { getHint };
export type { Hint, HintContext };
//# sourceMappingURL=hints.d.ts.map