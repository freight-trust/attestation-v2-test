import CID from 'cids';
import { MerklePath } from './merkle-tree/merkle-path';
import * as t from 'io-ts';
export interface AnchorLeaf {
    prev: CID;
    proof: CID;
    path: MerklePath;
}
interface AnchorLeafIpld {
    prev: CID;
    proof: CID;
    path: string;
}
export declare const AnchorLeafIpldCodec: t.Type<AnchorLeaf, AnchorLeafIpld>;
export {};
