import CID from 'cids';
import { ChainID } from 'caip';
import * as t from 'io-ts';
export interface AnchorProof {
    readonly blockNumber: number;
    readonly blockTimestamp: number;
    readonly chainId: ChainID;
    readonly root: CID;
    readonly txHash: CID;
}
interface IAnchorProofIpld {
    readonly blockNumber: number;
    readonly blockTimestamp: number;
    readonly root: CID;
    readonly chainId: string;
    readonly txHash: CID;
}
export declare const AnchorProofIpldCodec: t.Type<AnchorProof, IAnchorProofIpld>;
export {};
