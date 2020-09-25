"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathDirectionStringCodec = void 0;
const path_direction_1 = require("./path-direction");
const codec_1 = require("@vessel-kit/codec");
exports.PathDirectionStringCodec = codec_1.enumOf(path_direction_1.PathDirection, 'PathDirection-string');
//# sourceMappingURL=path-direction.string.codec.js.map