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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EthereumReader = exports.InvalidBlockchainProofError = void 0;
const multihashes_1 = require("multihashes");
const hex = __importStar(require("@stablelib/hex"));
const ETHEREUM_NAMESPACE = 'eip155';
class InvalidBlockchainProofError extends Error {
}
exports.InvalidBlockchainProofError = InvalidBlockchainProofError;
const EthereumNetworks = new Map([
    ['1', 'mainnet'],
    ['3', 'ropsten'],
    ['4', 'rinkeby'],
]);
class EthereumReader {
    constructor(ethereumEndpoint) {
        this.ethereumEndpoint = ethereumEndpoint;
    }
    canAccept(chainID) {
        const namespace = chainID.namespace;
        return namespace === ETHEREUM_NAMESPACE;
    }
    async validateProof(chainId, proofRecord) {
        const network = EthereumNetworks.get(chainId.namespace);
        const providers = await Promise.resolve().then(() => __importStar(require('@ethersproject/providers')));
        const provider = network
            ? providers.getDefaultProvider(network)
            : new providers.JsonRpcProvider(this.ethereumEndpoint.transport);
        const txDigest = multihashes_1.decode(proofRecord.txHash.multihash).digest;
        const txid = '0x' + multihashes_1.toHexString(txDigest);
        const transaction = await provider.getTransaction(txid);
        if (transaction && transaction.blockHash) {
            const block = await provider.getBlock(transaction.blockHash);
            const txData = hex.decode(transaction.data.replace('0x', ''));
            const root = proofRecord.root.bytes;
            const equal = txData.every((byte, i) => byte == root[i]);
            if (!equal) {
                throw new InvalidBlockchainProofError(`Proof Merkle root ${proofRecord.root} is not in transaction ${txid}`);
            }
            if (proofRecord.blockNumber !== transaction.blockNumber) {
                throw new InvalidBlockchainProofError(`Block numbers diverge: ${proofRecord.blockNumber} in proof vs ${transaction.blockNumber} in tx`);
            }
            if (proofRecord.blockTimestamp !== block.timestamp) {
                throw new InvalidBlockchainProofError(`Block timestamps diverge: ${proofRecord.blockTimestamp} in proof vs ${block.timestamp} in block`);
            }
        }
        else {
            throw new InvalidBlockchainProofError(`Can not find transaction`);
        }
    }
}
exports.EthereumReader = EthereumReader;
//# sourceMappingURL=ethereum-reader.js.map