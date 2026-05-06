import { type Builder, type DictionaryValue, type Slice } from '@ton/core';
import { Asset } from './Asset';

export interface RewardConfig {
    kind: 'dedust.cpmm.v2.RewardConfig';
    asset: Asset;
    maxDuration: number;
}

export namespace RewardConfig {
    export type Input = Omit<RewardConfig, 'kind'>;

    export const create = (input: Input): RewardConfig => ({
        ...input,
        kind: 'dedust.cpmm.v2.RewardConfig',
    });

    export const load = (source: Slice) => {
        const asset = Asset.load(source);
        const maxDuration = source.loadUint(40);

        return create({ asset, maxDuration });
    };

    export const store = (rewardConfig: RewardConfig) => (to: Builder) => {
        to.store(Asset.store(rewardConfig.asset)).storeUint(
            rewardConfig.maxDuration,
            40,
        );
    };

    export const createDictionaryValue = (): DictionaryValue<RewardConfig> => ({
        parse: load,
        serialize: (src: RewardConfig, to: Builder) => to.store(store(src)),
    });
}
