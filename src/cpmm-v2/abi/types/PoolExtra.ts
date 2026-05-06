import { Address, type Builder, Dictionary, type Slice } from '@ton/core';
import { Asset } from './Asset';
import { Optional } from '../../../core';

export interface PoolExtra {
    kind: 'dedust.cpmm.v2.PoolExtra';
    controller: Address;
    walletsByAssets: Dictionary<Buffer, Address>;
    assetsByWallets: Dictionary<Buffer, Asset>;
    resolutions: Dictionary<Buffer, Asset>;
}

export namespace PoolExtra {
    export const DEFAULT_CONTROLLER = Address.parse(
        'UQAzZk-YE-C_2TaxMzNi71upLfwLYBWRpWCK6M1vhbAOtJ5S',
    );

    export type Input = Optional<
        Omit<PoolExtra, 'kind'>,
        'controller' | 'walletsByAssets' | 'assetsByWallets' | 'resolutions'
    >;

    export const create = (input: Input = {}): PoolExtra => ({
        ...input,
        kind: 'dedust.cpmm.v2.PoolExtra',
        controller: input.controller ?? DEFAULT_CONTROLLER,
        walletsByAssets:
            input.walletsByAssets ?? Dictionary.empty<Buffer, Address>(),
        assetsByWallets:
            input.assetsByWallets ?? Dictionary.empty<Buffer, Asset>(),
        resolutions: input.resolutions ?? Dictionary.empty<Buffer, Asset>(),
    });

    export const load = (source: Slice): PoolExtra => {
        const controller = source.loadAddress();
        const walletsByAssets = source.loadDict(
            Dictionary.Keys.Buffer(32),
            Dictionary.Values.Address(),
        );
        const assetsByWallets = source.loadDict(
            Dictionary.Keys.Buffer(32),
            Asset.createDictionaryValue(),
        );
        const resolutions = source.loadDict(
            Dictionary.Keys.Buffer(32),
            Asset.createDictionaryValue(),
        );

        return create({
            controller,
            walletsByAssets,
            assetsByWallets,
            resolutions,
        });
    };

    export const store = (poolExtra: PoolExtra) => (to: Builder) => {
        to.storeAddress(poolExtra.controller)
            .storeDict(poolExtra.walletsByAssets)
            .storeDict(poolExtra.assetsByWallets)
            .storeDict(poolExtra.resolutions);
    };
}
