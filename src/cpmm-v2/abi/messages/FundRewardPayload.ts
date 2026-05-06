import { Builder, Slice } from '@ton/core';

export interface FundReward {
    kind: 'dedust.cpmm.v2.FundReward';
    till: number;
}

export namespace FundReward {
    export const TAG = 0x2eb87df9;

    export type Input = Omit<FundReward, 'kind'>;

    export const create = (input: Input): FundReward => ({
        ...input,
        kind: 'dedust.cpmm.v2.FundReward',
    });

    export const load = (source: Slice): FundReward => {
        source.skip(32);
        const till = source.loadUint(40);

        return create({
            till,
        });
    };

    export const store = (payload: FundReward) => (to: Builder) => {
        to.storeUint(TAG, 32).storeUint(payload.till, 40);
    };
}
