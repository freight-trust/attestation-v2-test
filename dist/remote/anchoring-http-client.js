"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _tasks, _observation$, _anchoringEndpoint, _period, _schedule;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnchoringHttpClient = void 0;
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const axios_1 = __importDefault(require("axios"));
const codec_1 = require("@vessel-kit/codec");
const anchor_response_payload_1 = require("./anchor-response-payload");
const anchor_request_payload_1 = require("./anchor-request-payload");
const anchoring_status_1 = require("../anchoring-status");
class NamedSchedule {
    constructor() {
        _tasks.set(this, new Set());
    }
    add(name, task) {
        if (!__classPrivateFieldGet(this, _tasks).has(name)) {
            __classPrivateFieldGet(this, _tasks).add(name);
            rxjs_1.queueScheduler.schedule(async () => {
                await task();
                __classPrivateFieldGet(this, _tasks).delete(name);
            });
        }
    }
}
_tasks = new WeakMap();
class AnchoringHttpClient {
    constructor(anchoringEndpoint, period = 5000) {
        _observation$.set(this, new rxjs_1.Subject());
        _anchoringEndpoint.set(this, void 0);
        _period.set(this, void 0);
        _schedule.set(this, new NamedSchedule());
        __classPrivateFieldSet(this, _anchoringEndpoint, anchoringEndpoint);
        __classPrivateFieldSet(this, _period, period);
    }
    anchorStatus$(docId) {
        const subject = new rxjs_1.Subject();
        __classPrivateFieldGet(this, _observation$).pipe(operators_1.filter((o) => o.docId.toString() === docId.toString())).subscribe(subject);
        return subject.asObservable();
    }
    requestAnchor(docId, cid) {
        rxjs_1.queueScheduler.schedule(async () => {
            const endpoint = `${__classPrivateFieldGet(this, _anchoringEndpoint)}/api/v0/requests`;
            const payload = anchor_request_payload_1.AnchorRequestPayload.encode({
                docId,
                cid,
            });
            const response = await axios_1.default.post(endpoint, payload);
            const decoded = codec_1.decodeThrow(anchor_response_payload_1.AnchorResponsePayload, response.data);
            __classPrivateFieldGet(this, _observation$).next(decoded);
            this.startRequestingAnchorStatus(docId, cid);
        });
    }
    startRequestingAnchorStatus(docId, cid) {
        const taskName = `${docId}:${cid}`;
        __classPrivateFieldGet(this, _schedule).add(taskName, () => {
            return new Promise((resolve) => {
                const doRequest = async () => {
                    const status = await this.requestAnchorStatus(cid);
                    if (status === anchoring_status_1.AnchoringStatus.ANCHORED ||
                        status === anchoring_status_1.AnchoringStatus.FAILED ||
                        status === anchoring_status_1.AnchoringStatus.OUTDATED) {
                        resolve();
                    }
                    else {
                        rxjs_1.queueScheduler.schedule(() => doRequest(), __classPrivateFieldGet(this, _period));
                    }
                };
                return doRequest();
            });
        });
    }
    async requestAnchorStatus(cid) {
        try {
            const endpoint = `${__classPrivateFieldGet(this, _anchoringEndpoint)}/api/v0/requests/${cid.toString()}`;
            const response = await axios_1.default.get(endpoint);
            const decoded = codec_1.decodeThrow(anchor_response_payload_1.AnchorResponsePayload, response.data);
            const status = response.data.status;
            __classPrivateFieldGet(this, _observation$).next(decoded);
            return status;
        }
        catch (e) {
            __classPrivateFieldGet(this, _observation$).error(e);
            return null;
        }
    }
}
exports.AnchoringHttpClient = AnchoringHttpClient;
_observation$ = new WeakMap(), _anchoringEndpoint = new WeakMap(), _period = new WeakMap(), _schedule = new WeakMap();
//# sourceMappingURL=anchoring-http-client.js.map