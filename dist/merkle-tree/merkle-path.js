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
var _steps;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MerklePath = void 0;
class MerklePath {
    constructor(steps = []) {
        _steps.set(this, void 0);
        __classPrivateFieldSet(this, _steps, steps);
    }
    get steps() {
        return __classPrivateFieldGet(this, _steps);
    }
    get last() {
        return __classPrivateFieldGet(this, _steps)[__classPrivateFieldGet(this, _steps).length - 1];
    }
    get isEmpty() {
        return __classPrivateFieldGet(this, _steps).length == 0;
    }
    get initial() {
        return new MerklePath(__classPrivateFieldGet(this, _steps).slice(0, __classPrivateFieldGet(this, _steps).length - 1));
    }
    append(step) {
        return new MerklePath(__classPrivateFieldGet(this, _steps).concat(step));
    }
    reverse() {
        return new MerklePath(__classPrivateFieldGet(this, _steps).reverse());
    }
}
exports.MerklePath = MerklePath;
_steps = new WeakMap();
//# sourceMappingURL=merkle-path.js.map