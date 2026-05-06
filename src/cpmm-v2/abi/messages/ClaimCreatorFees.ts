import { type Address, type Builder, type Slice } from '@ton/core';
import { type Optional } from '../../../core';

export interface ClaimCreatorFees {
    kind: 'dedust.cpmm.v2.ClaimCreatorFees';
    queryId: bigint;
    to: Address;
    excessesTo: Address;
}

export namespace ClaimCreatorFees {
    export const TAG = 0xbe3e3179;

    export type Input = Optional<Omit<ClaimCreatorFees, 'kind'>, 'queryId'>;

    export const create = (input: Input): ClaimCreatorFees => ({
        ...input,
        kind: 'dedust.cpmm.v2.ClaimCreatorFees',
        queryId: input.queryId ?? 0n,
    });

    export const load = (source: Slice) => {
        source.skip(32);
        const queryId = source.loadUintBig(64);
        const to = source.loadAddress();
        const excessesTo = source.loadAddress();

        return create({
            queryId,
            to,
            excessesTo,
        });
    };

    export const store = (message: ClaimCreatorFees) => (to: Builder) => {
        to.storeUint(TAG, 32)
            .storeUint(message.queryId, 64)
            .storeAddress(message.to)
            .storeAddress(message.excessesTo);
    };
}
