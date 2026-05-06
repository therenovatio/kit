import { type Address, type Builder, type Slice } from '@ton/core';

export interface ClaimReward {
    kind: 'dedust.cpmm.v2.ClaimReward';
    queryId: bigint;
    rewardIndex: number;
    excessesTo: Address;
}

export namespace ClaimReward {
    export const TAG = 0x909fdb65;

    export type Input = Omit<ClaimReward, 'kind'>;

    export const create = (input: Input): ClaimReward => ({
        ...input,
        kind: 'dedust.cpmm.v2.ClaimReward',
    });

    export const load = (source: Slice) => {
        source.skip(32);
        const queryId = source.loadUintBig(64);
        const rewardIndex = source.loadUint(2);
        const excessesTo = source.loadAddress();

        return create({
            queryId,
            rewardIndex,
            excessesTo,
        });
    };

    export const store = (message: ClaimReward) => (to: Builder) => {
        to.storeUint(TAG, 32)
            .storeUint(message.queryId, 64)
            .storeUint(message.rewardIndex, 2)
            .storeAddress(message.excessesTo);
    };
}
