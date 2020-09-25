import { PathDirection } from './path-direction';
export declare class MerklePath {
    #private;
    constructor(steps?: PathDirection[]);
    get steps(): PathDirection[];
    get last(): PathDirection | undefined;
    get isEmpty(): boolean;
    get initial(): MerklePath;
    append(step: PathDirection): MerklePath;
    reverse(): MerklePath;
}
