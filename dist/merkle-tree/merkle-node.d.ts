export declare class MerkleNode<A> {
    readonly id: A;
    readonly left?: MerkleNode<A> | undefined;
    readonly right?: MerkleNode<A> | undefined;
    private _uplink?;
    constructor(id: A, left?: MerkleNode<A> | undefined, right?: MerkleNode<A> | undefined);
    get uplink(): MerkleNode<A> | undefined;
    link(node: MerkleNode<A>): void;
}
