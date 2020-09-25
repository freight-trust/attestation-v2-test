"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MerkleTree = exports.ipfsMerge = void 0;
const merkle_path_1 = require("./merkle-path");
const merkle_node_1 = require("./merkle-node");
const path_direction_1 = require("./path-direction");
async function grow(levels, mergeFn) {
    const currentLevel = levels[levels.length - 1];
    const isRootReached = currentLevel.length === 1;
    if (isRootReached) {
        return levels;
    }
    else {
        const nextLevel = [];
        for (let i = 0; i < currentLevel.length - 1; i += 2) {
            const merged = await mergeFn(currentLevel[i], currentLevel[i + 1]);
            nextLevel.push(merged);
        }
        if (currentLevel.length % 2 === 1) {
            nextLevel.push(currentLevel[currentLevel.length - 1]);
        }
        return grow(levels.concat([nextLevel]), mergeFn);
    }
}
function ipfsMerge(ipfs) {
    return async function (left, right) {
        const cid = await ipfs.dag.put({
            [path_direction_1.PathDirection.L]: left.id,
            [path_direction_1.PathDirection.R]: right.id,
        });
        return new merkle_node_1.MerkleNode(cid, left, right);
    };
}
exports.ipfsMerge = ipfsMerge;
class MerkleTree {
    constructor(levels) {
        this.levels = levels;
    }
    static async fromLeaves(leaves, mergeFn) {
        const layer = leaves.map((e) => new merkle_node_1.MerkleNode(e));
        const levels = await grow([layer], mergeFn);
        return new MerkleTree(levels);
    }
    get root() {
        return this.levels[this.levels.length - 1][0];
    }
    path(element) {
        const level = this.levels[0];
        const node = level.find((node) => node.id === element);
        if (node) {
            return this.nodePath(node);
        }
        else {
            return new merkle_path_1.MerklePath();
        }
    }
    nodePath(node, present = new merkle_path_1.MerklePath()) {
        if (node.uplink) {
            const uplink = node.uplink;
            if (uplink.left === node) {
                return this.nodePath(uplink, present.append(path_direction_1.PathDirection.L));
            }
            else if (uplink.right === node) {
                return this.nodePath(uplink, present.append(path_direction_1.PathDirection.R));
            }
            else {
                throw new Error(`Can not find path to ${node} down from ${uplink}`);
            }
        }
        else {
            return present.reverse();
        }
    }
}
exports.MerkleTree = MerkleTree;
//# sourceMappingURL=merkle-tree.js.map