import CID from 'cids';
import { ChainID } from 'caip';
export declare class UnknownChainTxCodecError extends Error {
    constructor(chain: ChainID);
}
export declare function txCodec(chainId: ChainID): string;
export declare class BlockchainTransaction {
    readonly chainId: ChainID;
    readonly txHash: string;
    readonly blockNumber: number;
    readonly blockTimestamp: number;
    readonly cid: CID;
    constructor(chainId: ChainID, txHash: string, blockNumber: number, blockTimestamp: number);
}
