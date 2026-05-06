import { type Address, type Builder, type Slice } from '@ton/core';
import { PoolUpdatedState } from '../types';

export interface DepositEvent {
    kind: 'dedust.cpmm.v2.DepositEvent';
    amountXIn: bigint;
    amountYIn: bigint;
    liquidity: bigint;
    initiatorAddress: Address;
    recipientAddress: Address;
    nextState: PoolUpdatedState;
}

export namespace DepositEvent {
    export const TAG = 0x35df2e12;

    export type Input = Omit<DepositEvent, 'kind'>;

    export const create = (input: Input): DepositEvent => ({
        ...input,
        kind: 'dedust.cpmm.v2.DepositEvent',
    });

    export const load = (source: Slice): DepositEvent => {
        source.skip(32);
        const amountXIn = source.loadCoins();
        const amountYIn = source.loadCoins();
        const liquidity = source.loadCoins();
        const initiatorAddress = source.loadAddress();
        const recipientAddress = source.loadAddress();
        const nextState = PoolUpdatedState.fromCell(source.loadRef());

        return create({
            amountXIn,
            amountYIn,
            liquidity,
            initiatorAddress,
            recipientAddress,
            nextState,
        });
    };

    export const store = (event: DepositEvent) => (to: Builder) => {
        to.storeUint(TAG, 32)
            .storeCoins(event.amountXIn)
            .storeCoins(event.amountYIn)
            .storeCoins(event.liquidity)
            .storeAddress(event.initiatorAddress)
            .storeAddress(event.recipientAddress)
            .storeRef(PoolUpdatedState.toCell(event.nextState));
    };
}
