import { type Builder, type DictionaryValue, type Slice } from '@ton/core';
import { Q120X120 } from './Q120X120';

export interface PoolReward {
    kind: 'dedust.cpmm.v2.PoolReward';
    remainingTime: number;
    remainingBudget: bigint;
    rewardsPerToken: Q120X120;
    lastUpdate: number;
}

export namespace PoolReward {
    export type Input = Omit<PoolReward, 'kind'>;

    export const create = (input: Input): PoolReward => ({
        ...input,
        kind: 'dedust.cpmm.v2.PoolReward',
    });

    export const load = (source: Slice): PoolReward => {
        const remainingTime = source.loadUint(40);
        const remainingBudget = source.loadCoins();
        const rewardsPerToken = Q120X120.load(source);
        const lastUpdate = source.loadUint(40);

        return create({
            remainingTime,
            remainingBudget,
            rewardsPerToken,
            lastUpdate,
        });
    };

    export const store = (poolReward: PoolReward) => (to: Builder) => {
        to.storeUint(poolReward.remainingTime, 40)
            .storeCoins(poolReward.remainingBudget)
            .store(Q120X120.store(poolReward.rewardsPerToken))
            .storeUint(poolReward.lastUpdate, 40);
    };

    export const createDictionaryValue = (): DictionaryValue<PoolReward> => ({
        parse: load,
        serialize: (poolReward: PoolReward, to: Builder) =>
            to.store(store(poolReward)),
    });
}
