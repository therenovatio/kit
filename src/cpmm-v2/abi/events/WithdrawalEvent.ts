import { type Address, type Builder, type Slice } from '@ton/core';
import { PoolUpdatedState } from '../types';

export interface WithdrawalEvent {
    kind: 'dedust.cpmm.v2.WithdrawalEvent';
    liquidity: bigint;
    amountXOut: bigint;
    amountYOut: bigint;
    initiatorAddress: Address;
    recipientAddress: Address;
    nextState: PoolUpdatedState;
}

export namespace WithdrawalEvent {
    export const TAG = 0xc0d77b54;

    export type Input = Omit<WithdrawalEvent, 'kind'>;

    export const create = (input: Input): WithdrawalEvent => ({
        ...input,
        kind: 'dedust.cpmm.v2.WithdrawalEvent',
    });

    export const load = (source: Slice): WithdrawalEvent => {
        source.skip(32);
        const liquidity = source.loadCoins();
        const amountXOut = source.loadCoins();
        const amountYOut = source.loadCoins();
        const initiatorAddress = source.loadAddress();
        const recipientAddress = source.loadAddress();
        const nextState = PoolUpdatedState.fromCell(source.loadRef());

        return create({
            liquidity,
            amountXOut,
            amountYOut,
            initiatorAddress,
            recipientAddress,
            nextState,
        });
    };

    export const store = (event: WithdrawalEvent) => (to: Builder) => {
        to.storeUint(TAG, 32)
            .storeCoins(event.liquidity)
            .storeCoins(event.amountXOut)
            .storeCoins(event.amountYOut)
            .storeAddress(event.initiatorAddress)
            .storeAddress(event.recipientAddress)
            .storeRef(PoolUpdatedState.toCell(event.nextState));
    };
}
