/**
 *  * struct (0x5652f1df) ClaimPositionFees {
 *     queryId: uint64
 *     excessesTo: address
 * }
 *  */
import { Address, beginCell, Builder, Cell, Slice } from '@ton/core';

export interface ClaimPositionFees {
    kind: 'dedust.cpmm.v2.ClaimPositionFees';
    queryId: bigint;
    excessesTo: Address;
}

export namespace ClaimPositionFees {
    export const TAG = 0x5652f1df;

    export type Input = Omit<ClaimPositionFees, 'kind'>;

    export const create = (input: Input): ClaimPositionFees => ({
        ...input,
        kind: 'dedust.cpmm.v2.ClaimPositionFees',
    });

    export const load = (source: Slice) => {
        source.skip(32);
        const queryId = source.loadUintBig(64);
        const excessesTo = source.loadAddress();
        return create({ queryId, excessesTo });
    };

    export const store = (message: ClaimPositionFees) => (to: Builder) => {
        to.storeUint(TAG, 32)
            .storeUint(message.queryId, 64)
            .storeAddress(message.excessesTo);
    };

    export const toCell = (message: ClaimPositionFees): Cell =>
        beginCell().store(store(message)).endCell();
}
