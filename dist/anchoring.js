"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _writer, _ipfs;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Anchoring = void 0;
const blockchain_writer_1 = require("./blockchain-writer");
const merkle_tree_1 = require("./merkle-tree/merkle-tree");
const cids_1 = __importDefault(require("cids"));
const anchor_proof_1 = require("./anchor-proof");
const anchor_leaf_1 = require("./anchor-leaf");
class Anchoring {
    constructor(ipfs, connectionString) {
        _writer.set(this, void 0);
        _ipfs.set(this, void 0);
        __classPrivateFieldSet(this, _writer, blockchain_writer_1.BlockchainWriter.fromConnectionString(connectionString));
        __classPrivateFieldSet(this, _ipfs, ipfs);
    }
    async create(requests) {
        const merkleTree = await this.merkleTree(requests);
        const merkleRoot = new cids_1.default(merkleTree.root.id);
        const transaction = await __classPrivateFieldGet(this, _writer).createAnchor(merkleRoot);
        const proofCid = await this.putAnchorProof(transaction, merkleRoot);
        const promises = requests.map(async (request) => {
            const path = merkleTree.path(request.cid);
            const leaf = {
                prev: new cids_1.default(request.cid),
                proof: proofCid,
                path: path,
            };
            const ipld = anchor_leaf_1.AnchorLeafIpldCodec.encode(leaf);
            const leafCid = await __classPrivateFieldGet(this, _ipfs).dag.put(ipld);
            return {
                request: request,
                proofCid: proofCid,
                path: path,
                leafCid: leafCid,
            };
        });
        const responses = await Promise.all(promises);
        return {
            responses: responses,
            transaction: transaction,
        };
    }
    putAnchorProof(transaction, root) {
        const anchorProof = {
            blockNumber: transaction.blockNumber,
            blockTimestamp: transaction.blockTimestamp,
            root: root,
            chainId: transaction.chainId,
            txHash: transaction.cid,
        };
        const ipld = anchor_proof_1.AnchorProofIpldCodec.encode(anchorProof);
        return __classPrivateFieldGet(this, _ipfs).dag.put(ipld);
    }
    async merkleTree(records) {
        const leaves = records.sort((a, b) => a.docId.localeCompare(b.docId)).map((r) => r.cid);
        return merkle_tree_1.MerkleTree.fromLeaves(leaves, merkle_tree_1.ipfsMerge(__classPrivateFieldGet(this, _ipfs)));
    }
}
exports.Anchoring = Anchoring;
_writer = new WeakMap(), _ipfs = new WeakMap();
//# sourceMappingURL=anchoring.js.map