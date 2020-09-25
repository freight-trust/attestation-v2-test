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
var _wallet;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EthereumWriter = exports.InvalidKeyMaterialError = void 0;
const ethers_1 = require("ethers");
const caip_1 = require("caip");
const blockchain_transaction_1 = require("../blockchain-transaction");
const multihashes_1 = require("multihashes");
class InvalidKeyMaterialError extends Error {
}
exports.InvalidKeyMaterialError = InvalidKeyMaterialError;
function walletFromConnectionString(connectionString) {
    const options = connectionString.options;
    const privateKeyHex = options.get('privateKeyHex');
    const mnemonic = options.get('mnemonic');
    if (privateKeyHex) {
        return new ethers_1.ethers.Wallet(privateKeyHex);
    }
    else if (mnemonic) {
        const hdPath = options.get('path');
        return ethers_1.ethers.Wallet.fromMnemonic(mnemonic, hdPath);
    }
    else {
        throw new InvalidKeyMaterialError(`Mnemonic or private key is expected`);
    }
}
class EthereumWriter {
    constructor(wallet) {
        _wallet.set(this, void 0);
        __classPrivateFieldSet(this, _wallet, wallet);
    }
    static fromConnectionString(connectionString) {
        const provider = new ethers_1.ethers.providers.JsonRpcProvider(connectionString.transport);
        const wallet = walletFromConnectionString(connectionString).connect(provider);
        return new EthereumWriter(wallet);
    }
    async createAnchor(cid) {
        const hex = '0x' + multihashes_1.toHexString(cid.bytes);
        const transaction = await __classPrivateFieldGet(this, _wallet).sendTransaction({
            to: __classPrivateFieldGet(this, _wallet).address,
            data: hex,
        });
        const receipt = await __classPrivateFieldGet(this, _wallet).provider.waitForTransaction(transaction.hash);
        const block = await __classPrivateFieldGet(this, _wallet).provider.getBlock(receipt.blockHash);
        const chainId = new caip_1.ChainID(`eip155:${transaction.chainId}`);
        return new blockchain_transaction_1.BlockchainTransaction(chainId, receipt.transactionHash, receipt.blockNumber, block.timestamp);
    }
}
exports.EthereumWriter = EthereumWriter;
_wallet = new WeakMap();
//# sourceMappingURL=ethereum-writer.js.map