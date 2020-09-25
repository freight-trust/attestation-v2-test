import { ConnectionString } from '@vessel-kit/blockchain-connection-string';
import { IBlockchainWriter } from './blockchain-writer.interface';
export declare class UnknownBlockchainWriterChainError extends Error {
    constructor(chain: string);
}
export declare class BlockchainWriter {
    static fromConnectionString(connectionString: ConnectionString): IBlockchainWriter;
}
