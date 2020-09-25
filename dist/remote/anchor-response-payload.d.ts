import * as t from 'io-ts';
import { AnchoringStatus } from '../anchoring-status';
export declare const AnchorResponsePayload: t.UnionC<[t.TypeC<{
    status: t.LiteralC<AnchoringStatus.ANCHORED>;
    id: t.StringC;
    cid: t.Type<any, string, unknown>;
    docId: t.Type<any, string, unknown>;
    anchorRecord: t.Type<any, string, unknown>;
    createdAt: t.Type<any, string, unknown>;
    updatedAt: t.Type<any, string, unknown>;
}>, t.TypeC<{
    status: t.UnionC<[t.LiteralC<AnchoringStatus.PENDING>, t.LiteralC<AnchoringStatus.PROCESSING>]>;
    id: t.StringC;
    cid: t.Type<any, string, unknown>;
    docId: t.Type<any, string, unknown>;
    createdAt: t.Type<any, string, unknown>;
    updatedAt: t.Type<any, string, unknown>;
    scheduledAt: t.Type<any, number, unknown>;
}>, t.TypeC<{
    status: t.UnionC<[t.LiteralC<AnchoringStatus.FAILED>, t.LiteralC<AnchoringStatus.NOT_REQUESTED>, t.LiteralC<AnchoringStatus.OUTDATED>]>;
    id: t.StringC;
    cid: t.Type<any, string, unknown>;
    docId: t.Type<any, string, unknown>;
    createdAt: t.Type<any, string, unknown>;
    updatedAt: t.Type<any, string, unknown>;
}>]>;
