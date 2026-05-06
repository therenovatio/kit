import { beginCell, Builder, Cell, Slice } from '@ton/core';

export interface DepositPayload {
    kind: 'dedust.cpmm.v2.DepositPayload';
    amountX: bigint;
    amountY: bigint;
    minimalLiquidity: bigint;
    lockedLiquidityShare: number;
}

export namespace DepositPayload {
    export const TAG = 0xc9a015da;

    export type Input = Omit<DepositPayload, 'kind'>;

    export const create = (input: Input): DepositPayload => ({
        ...input,
        kind: 'dedust.cpmm.v2.DepositPayload',
    });

    export const load = (source: Slice) => {
        source.skip(32);
        const amountX = source.loadCoins();
        const amountY = source.loadCoins();
        const minimalLiquidity = source.loadCoins();
        const lockedLiquidityShare = source.loadUint(16);

        return create({
            amountX,
            amountY,
            minimalLiquidity,
            lockedLiquidityShare,
        });
    };

    export const store = (payload: DepositPayload) => (to: Builder) => {
        to.storeUint(TAG, 32)
            .storeCoins(payload.amountX)
            .storeCoins(payload.amountY)
            .storeCoins(payload.minimalLiquidity)
            .storeUint(payload.lockedLiquidityShare, 16);
    };

    export const toCell = (payload: DepositPayload): Cell =>
        beginCell().store(store(payload)).endCell();

    export const createCell = (input: Input): Cell => createCell(create(input));
}
