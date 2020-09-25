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
var _readers, _ipfs;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockchainReader = exports.UnhandledChainError = exports.MisleadingAnchorError = void 0;
const anchor_proof_1 = require("./anchor-proof");
const anchor_leaf_1 = require("./anchor-leaf");
const codec_1 = require("@vessel-kit/codec");
const merkle_path_string_codec_1 = require("./merkle-tree/merkle-path.string.codec");
const caip_1 = require("caip");
const ethereum_reader_1 = require("./ethereum/ethereum-reader");
class MisleadingAnchorError extends Error {
    constructor(record) {
        super(`Anchor proof ${record.proof.toString()}, path ${record.path} is misleading`);
    }
}
exports.MisleadingAnchorError = MisleadingAnchorError;
class UnhandledChainError extends Error {
    constructor(chain) {
        super(`Can not find reader for ${chain}`);
    }
}
exports.UnhandledChainError = UnhandledChainError;
function providerFromConnectionString(connectionString) {
    switch (connectionString.chain) {
        case 'eip155':
            return new ethereum_reader_1.EthereumReader(connectionString);
        default:
            throw new UnhandledChainError(connectionString.chain);
    }
}
class BlockchainReader {
    constructor(ipfs, readers) {
        _readers.set(this, void 0);
        _ipfs.set(this, void 0);
        __classPrivateFieldSet(this, _ipfs, ipfs);
        __classPrivateFieldSet(this, _readers, readers);
    }
    static build(ipfs, connectionStrings) {
        let readers = new Map(connectionStrings.map((connectionString) => {
            const provider = providerFromConnectionString(connectionString);
            return [connectionString.chain, provider];
        }));
        return new BlockchainReader(ipfs, readers);
    }
    async verify(recordWrap) {
        const anchorLeaf = codec_1.decodeThrow(anchor_leaf_1.AnchorLeafIpldCodec, recordWrap.load);
        const anchorLeafWrap = new codec_1.RecordWrap(anchorLeaf, recordWrap.cid);
        await this.verifyPrev(anchorLeafWrap);
        const anchorProofRecord = await this.retrieve(anchorLeaf.proof);
        const anchorProof = codec_1.decodeThrow(anchor_proof_1.AnchorProofIpldCodec, anchorProofRecord);
        await this.validateChainInclusion(anchorProof);
        return anchorProof;
    }
    async validateChainInclusion(proofRecord) {
        const chainId = new caip_1.ChainID(proofRecord.chainId);
        const handler = __classPrivateFieldGet(this, _readers).get(chainId.namespace);
        if (handler) {
            return handler.validateProof(chainId, proofRecord);
        }
        else {
            throw new UnhandledChainError(chainId.toString());
        }
    }
    async verifyPrev(anchorLeaf) {
        const originalRecordCid = await this.originalRecordCid(anchorLeaf);
        if (!originalRecordCid.equals(anchorLeaf.load.prev)) {
            throw new MisleadingAnchorError(anchorLeaf.load);
        }
    }
    async originalRecordCid(anchorRecord) {
        const proofRecord = await this.retrieve(anchorRecord.load.proof);
        if (anchorRecord.load.path && !anchorRecord.load.path.isEmpty) {
            const merklePath = anchorRecord.load.path;
            const queryPath = '/root/' + merkle_path_string_codec_1.MerklePathStringCodec.encode(merklePath.initial);
            const record = await this.retrieve(anchorRecord.load.proof, queryPath);
            return record[merklePath.last];
        }
        else {
            return proofRecord.root;
        }
    }
    async retrieve(cid, path) {
        if (path) {
            const blob = await __classPrivateFieldGet(this, _ipfs).dag.get(cid, path);
            return blob === null || blob === void 0 ? void 0 : blob.value;
        }
        else {
            const blob = await __classPrivateFieldGet(this, _ipfs).dag.get(cid);
            return blob === null || blob === void 0 ? void 0 : blob.value;
        }
    }
}
exports.BlockchainReader = BlockchainReader;
_readers = new WeakMap(), _ipfs = new WeakMap();
//# sourceMappingURL=blockchain-reader.js.map