import { type Builder, type DictionaryValue, type Slice } from '@ton/core';
import { Q120X120 } from './Q120X120';

export interface PositionReward {
    kind: 'dedust.cpmm.v2.PositionReward';
    unclaimed: bigint;
    rewardsPerTokenCheckpoint: Q120X120;
}

export namespace PositionReward {
    export type Input = Omit<PositionReward, 'kind'>;

    export const create = (input: Input): PositionReward => ({
        ...input,
        kind: 'dedust.cpmm.v2.PositionReward',
    });

    export const load = (source: Slice): PositionReward => {
        const unclaimed = source.loadCoins();
        const rewardsPerTokenCheckpoint = Q120X120.load(source);

        return create({
            unclaimed,
            rewardsPerTokenCheckpoint,
        });
    };

    export const store = (value: PositionReward) => (to: Builder) => {
        to.storeCoins(value.unclaimed).store(
            Q120X120.store(value.rewardsPerTokenCheckpoint),
        );
    };

    export const createDictionaryValue =
        (): DictionaryValue<PositionReward> => ({
            parse: load,
            serialize: (src: PositionReward, to: Builder) =>
                to.store(store(src)),
        });
}
