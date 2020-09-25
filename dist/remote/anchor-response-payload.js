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
exports.AnchorResponsePayload = void 0;
const t = __importStar(require("io-ts"));
const anchoring_status_1 = require("../anchoring-status");
const codec_1 = require("@vessel-kit/codec");
const NotAnchored = t.type({
    status: t.union([
        t.literal(anchoring_status_1.AnchoringStatus.FAILED),
        t.literal(anchoring_status_1.AnchoringStatus.NOT_REQUESTED),
        t.literal(anchoring_status_1.AnchoringStatus.OUTDATED),
    ]),
    id: t.string,
    cid: t.string.pipe(codec_1.CidStringCodec),
    docId: t.string.pipe(codec_1.DocIdStringCodec),
    createdAt: t.string.pipe(codec_1.DateISO8601Codec),
    updatedAt: t.string.pipe(codec_1.DateISO8601Codec),
});
const Pending = t.type({
    status: t.union([t.literal(anchoring_status_1.AnchoringStatus.PENDING), t.literal(anchoring_status_1.AnchoringStatus.PROCESSING)]),
    id: t.string,
    cid: t.string.pipe(codec_1.CidStringCodec),
    docId: t.string.pipe(codec_1.DocIdStringCodec),
    createdAt: t.string.pipe(codec_1.DateISO8601Codec),
    updatedAt: t.string.pipe(codec_1.DateISO8601Codec),
    scheduledAt: t.number.pipe(codec_1.DateNumberCodec),
});
const Anchored = t.type({
    status: t.literal(anchoring_status_1.AnchoringStatus.ANCHORED),
    id: t.string,
    cid: t.string.pipe(codec_1.CidStringCodec),
    docId: t.string.pipe(codec_1.DocIdStringCodec),
    anchorRecord: t.string.pipe(codec_1.CidStringCodec),
    createdAt: t.string.pipe(codec_1.DateISO8601Codec),
    updatedAt: t.string.pipe(codec_1.DateISO8601Codec),
});
exports.AnchorResponsePayload = t.union([Anchored, Pending, NotAnchored]);
//# sourceMappingURL=anchor-response-payload.js.map