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
exports.AnchorLeafIpldCodec = void 0;
const t = __importStar(require("io-ts"));
const codec_1 = require("@vessel-kit/codec");
const merkle_path_string_codec_1 = require("./merkle-tree/merkle-path.string.codec");
exports.AnchorLeafIpldCodec = t.type({
    prev: codec_1.CidIpldCodec,
    proof: codec_1.CidIpldCodec,
    path: t.string.pipe(merkle_path_string_codec_1.MerklePathStringCodec)
});
//# sourceMappingURL=anchor-leaf.js.map