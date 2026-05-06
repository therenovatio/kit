import { beginCell, type Builder, type Cell, type Slice } from '@ton/core';
import { Q120X120 } from './Q120X120';
import { Optional } from '../../../core';

export interface PoolFees {
    kind: 'dedust.cpmm.v2.PoolFees';
    protocolFeeX: bigint;
    protocolFeeY: bigint;
    creatorFeeX: bigint;
    creatorFeeY: bigint;
    xFeePerToken: Q120X120;
    yFeePerToken: Q120X120;
}

export namespace PoolFees {
    type Input = Optional<
        Omit<PoolFees, 'kind'>,
        | 'protocolFeeX'
        | 'protocolFeeY'
        | 'creatorFeeX'
        | 'creatorFeeY'
        | 'xFeePerToken'
        | 'yFeePerToken'
    >;

    export const create = (input: Input = {}): PoolFees => ({
        kind: 'dedust.cpmm.v2.PoolFees',
        protocolFeeX: input.protocolFeeX ?? 0n,
        protocolFeeY: input.protocolFeeY ?? 0n,
        creatorFeeX: input.creatorFeeX ?? 0n,
        creatorFeeY: input.creatorFeeY ?? 0n,
        xFeePerToken: input.xFeePerToken ?? Q120X120.zero(),
        yFeePerToken: input.yFeePerToken ?? Q120X120.zero(),
    });

    export const load = (source: Slice): PoolFees => {
        const protocolFeeX = source.loadCoins();
        const protocolFeeY = source.loadCoins();
        const creatorFeeX = source.loadCoins();
        const creatorFeeY = source.loadCoins();
        const xFeePerToken = Q120X120.load(source);
        const yFeePerToken = Q120X120.load(source);

        return create({
            protocolFeeX,
            protocolFeeY,
            creatorFeeX,
            creatorFeeY,
            xFeePerToken,
            yFeePerToken,
        });
    };

    export const store = (poolFees: PoolFees) => (to: Builder) => {
        to.storeCoins(poolFees.protocolFeeX)
            .storeCoins(poolFees.protocolFeeY)
            .storeCoins(poolFees.creatorFeeX)
            .storeCoins(poolFees.creatorFeeY)
            .store(Q120X120.store(poolFees.xFeePerToken))
            .store(Q120X120.store(poolFees.yFeePerToken));
    };

    export const toCell = (poolFees: PoolFees): Cell =>
        beginCell().store(store(poolFees)).endCell();
}
