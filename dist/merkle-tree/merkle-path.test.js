"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const merkle_path_1 = require("./merkle-path");
const path_direction_1 = require("./path-direction");
describe('constructor', () => {
    test('steps', () => {
        const directions = [path_direction_1.PathDirection.L, path_direction_1.PathDirection.R];
        const merklePath = new merkle_path_1.MerklePath(directions);
        expect(merklePath.steps).toEqual(directions);
    });
    test('steps default', () => {
        const merklePath = new merkle_path_1.MerklePath();
        expect(merklePath.steps).toEqual([]);
    });
    test('steps empty', () => {
        const merklePath = new merkle_path_1.MerklePath([]);
        expect(merklePath.steps).toEqual([]);
    });
});
describe('#last', () => {
    test('ok', () => {
        const directions = [path_direction_1.PathDirection.L, path_direction_1.PathDirection.R];
        const merklePath = new merkle_path_1.MerklePath(directions);
        expect(merklePath.last).toEqual(path_direction_1.PathDirection.R);
    });
    test('empty', () => {
        const merklePath = new merkle_path_1.MerklePath();
        expect(merklePath.last).toEqual(undefined);
    });
});
describe('#isEmpty', () => {
    test('ok', () => {
        const directions = [path_direction_1.PathDirection.L, path_direction_1.PathDirection.R];
        const merklePath = new merkle_path_1.MerklePath(directions);
        expect(merklePath.isEmpty).toBeFalsy();
    });
    test('empty', () => {
        const merklePath = new merkle_path_1.MerklePath();
        expect(merklePath.isEmpty).toBeTruthy();
    });
});
describe('#initial', () => {
    test('ok', () => {
        const directions = [path_direction_1.PathDirection.L, path_direction_1.PathDirection.R, path_direction_1.PathDirection.L];
        const merklePath = new merkle_path_1.MerklePath(directions);
        expect(merklePath.initial.steps).toEqual([path_direction_1.PathDirection.L, path_direction_1.PathDirection.R]);
    });
    test('empty', () => {
        const merklePath = new merkle_path_1.MerklePath();
        expect(merklePath.initial.isEmpty).toBeTruthy();
    });
});
test('#append', () => {
    const directions = [path_direction_1.PathDirection.L, path_direction_1.PathDirection.R, path_direction_1.PathDirection.L];
    const merklePath = new merkle_path_1.MerklePath(directions);
    const a = merklePath.append(path_direction_1.PathDirection.R);
    expect(a.steps).toEqual([path_direction_1.PathDirection.L, path_direction_1.PathDirection.R, path_direction_1.PathDirection.L, path_direction_1.PathDirection.R]);
});
test('#reverse', () => {
    const directions = [path_direction_1.PathDirection.L, path_direction_1.PathDirection.R, path_direction_1.PathDirection.L, path_direction_1.PathDirection.R];
    const merklePath = new merkle_path_1.MerklePath(directions);
    expect(merklePath.reverse().steps).toEqual(directions.reverse());
});
//# sourceMappingURL=merkle-path.test.js.map