import { MerklePath } from './merkle-path';
import { MerkleNode } from './merkle-node';
import { Ipfs } from 'ipfs';
export interface MergeFn<A> {
    (left: MerkleNode<A>, right: MerkleNode<A>): Promise<MerkleNode<A>>;
}
export declare function ipfsMerge<A>(ipfs: Ipfs): (left: MerkleNode<A>, right: MerkleNode<A>) => Promise<MerkleNode<A>>;
export declare class MerkleTree<A> {
    readonly levels: MerkleNode<A>[][];
    constructor(levels: MerkleNode<A>[][]);
    static fromLeaves<A>(leaves: A[], mergeFn: MergeFn<A>): Promise<MerkleTree<A>>;
    get root(): MerkleNode<A>;
    path(element: A): MerklePath;
    nodePath(node: MerkleNode<A>, present?: MerklePath): MerklePath;
}
