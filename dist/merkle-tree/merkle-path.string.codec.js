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
exports.MerklePathStringCodec = void 0;
const Either_1 = require("fp-ts/lib/Either");
const t = __importStar(require("io-ts"));
const path_direction_string_codec_1 = require("./path-direction.string.codec");
const merkle_path_1 = require("./merkle-path");
const codec_1 = require("@vessel-kit/codec");
const PathDirectionArrayStringCodec = t.string.pipe(codec_1.splitString('/', path_direction_string_codec_1.PathDirectionStringCodec), 'PathDirectionArray-String');
exports.MerklePathStringCodec = new t.Type('MerklePath-String', (a) => a instanceof merkle_path_1.MerklePath, (input, context) => Either_1.either.chain(PathDirectionArrayStringCodec.validate(input, context), paths => {
    return t.success(new merkle_path_1.MerklePath(paths));
}), merklePath => PathDirectionArrayStringCodec.encode(merklePath.steps));
//# sourceMappingURL=merkle-path.string.codec.js.map