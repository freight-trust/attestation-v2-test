"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MerkleNode = void 0;
class MerkleNode {
    constructor(id, left, right) {
        this.id = id;
        this.left = left;
        this.right = right;
        if (left) {
            left.link(this);
        }
        if (right) {
            right.link(this);
        }
    }
    get uplink() {
        return this._uplink;
    }
    link(node) {
        this._uplink = node;
    }
}
exports.MerkleNode = MerkleNode;
//# sourceMappingURL=merkle-node.js.map