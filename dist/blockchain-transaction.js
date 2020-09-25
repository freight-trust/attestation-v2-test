"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockchainTransaction = exports.txCodec = exports.UnknownChainTxCodecError = void 0;
const multihashes_1 = require("multihashes");
const cids_1 = __importDefault(require("cids"));
const hex = __importStar(require("@stablelib/hex"));
class UnknownChainTxCodecError extends Error {
    constructor(chain) {
        super(`Unkown CID tx codec for chain namespace ${chain.namespace}`);
    }
}
exports.UnknownChainTxCodecError = UnknownChainTxCodecError;
function txCodec(chainId) {
    switch (chainId.namespace) {
        case 'eip155':
            return 'eth-tx';
        case 'ethereum':
            return 'eth-tx';
        default:
            throw new UnknownChainTxCodecError(chainId);
    }
}
exports.txCodec = txCodec;
class BlockchainTransaction {
    constructor(chainId, txHash, blockNumber, blockTimestamp) {
        this.chainId = chainId;
        this.txHash = txHash;
        this.blockNumber = blockNumber;
        this.blockTimestamp = blockTimestamp;
        const bytes = hex.decode(txHash.replace(/0x/, ''));
        const multihash = multihashes_1.encode(bytes, 'keccak-256');
        const cidVersion = 1;
        const codec = txCodec(chainId);
        this.cid = new cids_1.default(cidVersion, codec, multihash);
    }
}
exports.BlockchainTransaction = BlockchainTransaction;
//# sourceMappingURL=blockchain-transaction.js.map