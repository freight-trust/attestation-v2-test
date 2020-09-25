import { Observable } from 'rxjs';
import CID from 'cids';
import { DocId } from '@vessel-kit/codec';
import * as t from 'io-ts';
import { AnchorResponsePayload } from './anchor-response-payload';
import { AnchoringStatus } from '../anchoring-status';
export declare type AnchorResponsePayloadType = t.TypeOf<typeof AnchorResponsePayload>;
export declare class AnchoringHttpClient {
    #private;
    constructor(anchoringEndpoint: string, period?: number);
    anchorStatus$(docId: DocId): Observable<AnchorResponsePayloadType>;
    requestAnchor(docId: DocId, cid: CID): void;
    startRequestingAnchorStatus(docId: DocId, cid: CID): void;
    requestAnchorStatus(cid: CID): Promise<AnchoringStatus | null>;
}
