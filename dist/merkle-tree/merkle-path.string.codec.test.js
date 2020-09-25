"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const merkle_path_1 = require("./merkle-path");
const path_direction_1 = require("./path-direction");
const merkle_path_string_codec_1 = require("./merkle-path.string.codec");
const codec_1 = require("@vessel-kit/codec");
test('encode', () => {
    const merklePath = new merkle_path_1.MerklePath([path_direction_1.PathDirection.R, path_direction_1.PathDirection.L, path_direction_1.PathDirection.R]);
    const asString = merkle_path_string_codec_1.MerklePathStringCodec.encode(merklePath);
    expect(asString).toEqual('R/L/R');
});
test('encode empty', () => {
    const merklePath = new merkle_path_1.MerklePath();
    const asString = merkle_path_string_codec_1.MerklePathStringCodec.encode(merklePath);
    expect(asString).toEqual('');
});
test('decode', () => {
    const merklePath = codec_1.decodeThrow(merkle_path_string_codec_1.MerklePathStringCodec, 'R/L/R');
    expect(merklePath).toBeInstanceOf(merkle_path_1.MerklePath);
    expect(merklePath.steps).toEqual([path_direction_1.PathDirection.R, path_direction_1.PathDirection.L, path_direction_1.PathDirection.R]);
});
test('decode empty', () => {
    const merklePath = codec_1.decodeThrow(merkle_path_string_codec_1.MerklePathStringCodec, '');
    expect(merklePath).toBeInstanceOf(merkle_path_1.MerklePath);
    expect(merklePath.steps).toEqual([]);
});
test('decode garbage', () => {
    expect(() => {
        codec_1.decodeThrow(merkle_path_string_codec_1.MerklePathStringCodec, 'R/as/L');
    }).toThrow();
});
describe('validate', () => {
    test('instance', () => {
        const merklePath = new merkle_path_1.MerklePath();
        expect(merkle_path_string_codec_1.MerklePathStringCodec.is(merklePath)).toBeTruthy();
    });
    test('garbage', () => {
        expect(merkle_path_string_codec_1.MerklePathStringCodec.is('garbage')).toBeFalsy();
    });
});
//# sourceMappingURL=merkle-path.string.codec.test.js.map