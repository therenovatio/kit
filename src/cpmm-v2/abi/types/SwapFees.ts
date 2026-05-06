import { beginCell, type Builder, type Cell, type Slice } from '@ton/core';

export interface SwapFees {
    kind: 'dedust.cpmm.v2.SwapFees';
    isX: boolean;
    lpFee: bigint;
    creatorFee: bigint;
    protocolFee: bigint;
    partnerFee: bigint;
    referrerFee: bigint;
}

export namespace SwapFees {
    export type Input = Omit<SwapFees, 'kind'>;

    export const create = (input: Input): SwapFees => ({
        ...input,
        kind: 'dedust.cpmm.v2.SwapFees',
    });

    export const load = (source: Slice): SwapFees => {
        const isX = source.loadBit();
        const lpFee = source.loadCoins();
        const creatorFee = source.loadCoins();
        const protocolFee = source.loadCoins();
        const partnerFee = source.loadCoins();
        const referrerFee = source.loadCoins();

        return create({
            isX,
            lpFee,
            creatorFee,
            protocolFee,
            partnerFee,
            referrerFee,
        });
    };

    export const store = (swapFees: SwapFees) => (to: Builder) => {
        to.storeBit(swapFees.isX)
            .storeCoins(swapFees.lpFee)
            .storeCoins(swapFees.creatorFee)
            .storeCoins(swapFees.protocolFee)
            .storeCoins(swapFees.partnerFee)
            .storeCoins(swapFees.referrerFee);
    };

    export const toCell = (swapFees: SwapFees): Cell =>
        beginCell().store(store(swapFees)).endCell();

    export const fromCell = (cell: Cell): SwapFees => load(cell.asSlice());
}
