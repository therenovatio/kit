import { type Address, type Builder, type Cell, type Slice } from '@ton/core';
import { PoolUpdatedState, SwapFees } from '../types';

export interface SwapEvent {
    kind: 'dedust.cpmm.v2.SwapEvent';
    xToY: boolean;
    amountIn: bigint;
    amountOut: bigint;
    initiatorAddress: Address;
    recipientAddress: Address;
    nextState: PoolUpdatedState;
    fees: SwapFees;
}

export namespace SwapEvent {
    export const TAG = 0x78e79ba4;

    export type Input = Omit<SwapEvent, 'kind'>;

    export const create = (input: Input): SwapEvent => ({
        ...input,
        kind: 'dedust.cpmm.v2.SwapEvent',
    });

    export const load = (source: Slice): SwapEvent => {
        source.skip(32);
        const xToY = source.loadBit();
        const amountIn = source.loadCoins();
        const amountOut = source.loadCoins();
        const initiatorAddress = source.loadAddress();
        const recipientAddress = source.loadAddress();
        const nextState = PoolUpdatedState.fromCell(source.loadRef());
        const fees = SwapFees.fromCell(source.loadRef());

        return create({
            xToY,
            amountIn,
            amountOut,
            initiatorAddress,
            recipientAddress,
            nextState,
            fees,
        });
    };

    export const store = (event: SwapEvent) => (to: Builder) => {
        to.storeUint(TAG, 32)
            .storeBit(event.xToY)
            .storeCoins(event.amountIn)
            .storeCoins(event.amountOut)
            .storeAddress(event.initiatorAddress)
            .storeAddress(event.recipientAddress)
            .storeRef(PoolUpdatedState.toCell(event.nextState))
            .storeRef(SwapFees.toCell(event.fees));
    };

    export const fromCell = (cell: Cell): SwapEvent => load(cell.asSlice());
}
