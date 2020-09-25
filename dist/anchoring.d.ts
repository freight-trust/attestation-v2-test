import { ConnectionString } from '@vessel-kit/blockchain-connection-string';
import { IAnchoringRequest } from './anchoring-request.interface';
import { MerkleTree } from './merkle-tree/merkle-tree';
import { Ipfs } from 'ipfs';
import { BlockchainTransaction } from './blockchain-transaction';
import CID from 'cids';
import { IAnchoringResponse } from './anchoring-response.interface';
export interface AnchoringCreation<A extends IAnchoringRequest> {
    responses: IAnchoringResponse<A>[];
    transaction: BlockchainTransaction;
}
export declare class Anchoring {
    #private;
    constructor(ipfs: Ipfs, connectionString: ConnectionString);
    create<A extends IAnchoringRequest>(requests: A[]): Promise<AnchoringCreation<A>>;
    putAnchorProof(transaction: BlockchainTransaction, root: CID): Promise<any>;
    merkleTree(records: IAnchoringRequest[]): Promise<MerkleTree<string>>;
}
