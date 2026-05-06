import { beginCell, Builder, type Cell, Slice } from '@ton/core';
import { Optional } from '../../../core';

export interface Init {
    kind: 'dedust.cpmm.v2.Init';
    queryId: bigint;
    customPayload: Cell | null;
}

export namespace Init {
    export const TAG = 0xde8402ce;

    export type Input = Optional<
        Omit<Init, 'kind'>,
        'queryId' | 'customPayload'
    >;

    export const create = (input: Input = {}): Init => ({
        kind: 'dedust.cpmm.v2.Init',
        queryId: input.queryId ?? 0n,
        customPayload: input.customPayload ?? null,
    });

    export const load = (source: Slice): Init => {
        source.skip(32);
        const queryId = source.loadUintBig(64);
        const customPayload = source.loadMaybeRef();

        return create({
            queryId,
            customPayload,
        });
    };

    export const store = (message: Init) => (to: Builder) => {
        to.storeUint(TAG, 32)
            .storeUint(message.queryId, 64)
            .storeMaybeRef(message.customPayload);
    };

    export const toCell = (message: Init): Cell =>
        beginCell().store(store(message)).endCell();

    export const createCell = (input: Input = {}): Cell =>
        toCell(create(input));
}
