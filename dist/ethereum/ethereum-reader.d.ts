import { IBlockchainReaderHandler } from '../blockchain-reader-handler.interface';
import { AnchorProof } from '../anchor-proof';
import { ChainID } from 'caip';
import { ConnectionString } from '@vessel-kit/blockchain-connection-string';
export declare class InvalidBlockchainProofError extends Error {
}
export declare class EthereumReader implements IBlockchainReaderHandler {
    readonly ethereumEndpoint: ConnectionString;
    constructor(ethereumEndpoint: ConnectionString);
    canAccept(chainID: ChainID): Boolean;
    validateProof(chainId: ChainID, proofRecord: AnchorProof): Promise<void>;
}
