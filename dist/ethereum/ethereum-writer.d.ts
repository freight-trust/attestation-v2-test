import { ConnectionString } from '@vessel-kit/blockchain-connection-string';
import { ethers } from 'ethers';
import CID from 'cids';
import { BlockchainTransaction } from '../blockchain-transaction';
import { IBlockchainWriter } from '../blockchain-writer.interface';
export declare class InvalidKeyMaterialError extends Error {
}
export declare class EthereumWriter implements IBlockchainWriter {
    #private;
    constructor(wallet: ethers.Wallet);
    static fromConnectionString(connectionString: ConnectionString): EthereumWriter;
    createAnchor(cid: CID): Promise<BlockchainTransaction>;
}
