"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockchainWriter = exports.UnknownBlockchainWriterChainError = void 0;
const ethereum_writer_1 = require("./ethereum/ethereum-writer");
class UnknownBlockchainWriterChainError extends Error {
    constructor(chain) {
        super(`No anchoring writer for chain ${chain}`);
    }
}
exports.UnknownBlockchainWriterChainError = UnknownBlockchainWriterChainError;
class BlockchainWriter {
    static fromConnectionString(connectionString) {
        switch (connectionString.chain) {
            case 'eip155':
                return ethereum_writer_1.EthereumWriter.fromConnectionString(connectionString);
            default:
                throw new UnknownBlockchainWriterChainError(connectionString.chain);
        }
    }
}
exports.BlockchainWriter = BlockchainWriter;
//# sourceMappingURL=blockchain-writer.js.map