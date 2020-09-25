import { IBlockchainReaderHandler } from './blockchain-reader-handler.interface';
import type { Ipfs } from 'ipfs';
import { AnchorProof } from './anchor-proof';
import { AnchorLeaf } from './anchor-leaf';
import { RecordWrap } from '@vessel-kit/codec';
import CID from 'cids';
import { ConnectionString } from '@vessel-kit/blockchain-connection-string';
export declare class MisleadingAnchorError extends Error {
    constructor(record: any);
}
export declare class UnhandledChainError extends Error {
    constructor(chain: string);
}
export interface IBlockchainReader {
    verify(recordWrap: RecordWrap<any>): Promise<AnchorProof>;
}
export declare class BlockchainReader implements IBlockchainReader {
    #private;
    constructor(ipfs: Ipfs, readers: Map<string, IBlockchainReaderHandler>);
    static build(ipfs: Ipfs, connectionStrings: ConnectionString[]): IBlockchainReader;
    verify(recordWrap: RecordWrap<any>): Promise<AnchorProof>;
    validateChainInclusion(proofRecord: AnchorProof): Promise<void>;
    verifyPrev(anchorLeaf: RecordWrap<AnchorLeaf>): Promise<void>;
    originalRecordCid(anchorRecord: RecordWrap<AnchorLeaf>): Promise<CID>;
    retrieve(cid: CID, path?: string): Promise<any>;
}
