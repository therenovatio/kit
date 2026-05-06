import { beginCell, Builder, Cell, Slice } from '@ton/core';
import { BasicPayoutConfig } from '../types';
import { Optional } from '../../../core';

export interface Withdraw {
    kind: 'dedust.cpmm.v2.Withdraw';
    queryId: bigint;
    liquidity: bigint;
    minimalXOut: bigint;
    minimalYOut: bigint;
    autoClaimFees: boolean;
    payoutConfig: BasicPayoutConfig;
}

export namespace Withdraw {
    export const TAG = 0x20b5ef89;

    export type Input = Optional<
        Omit<Withdraw, 'kind'>,
        | 'queryId'
        | 'minimalXOut'
        | 'minimalYOut'
        | 'autoClaimFees'
        | 'payoutConfig'
    >;

    export const create = (input: Input): Withdraw => ({
        ...input,
        kind: 'dedust.cpmm.v2.Withdraw',
        queryId: input.queryId ?? 0n,
        minimalXOut: input.minimalXOut ?? 0n,
        minimalYOut: input.minimalYOut ?? 0n,
        autoClaimFees: input.autoClaimFees ?? false,
        payoutConfig: input.payoutConfig ?? BasicPayoutConfig.create(),
    });

    export const load = (source: Slice): Withdraw => {
        source.skip(32);
        const queryId = source.loadUintBig(64);
        const liquidity = source.loadCoins();
        const minimalXOut = source.loadCoins();
        const minimalYOut = source.loadCoins();
        const autoClaimFees = source.loadBit();
        const payoutConfig = BasicPayoutConfig.load(source.loadRef().asSlice());

        return create({
            queryId,
            liquidity,
            minimalXOut,
            minimalYOut,
            autoClaimFees,
            payoutConfig,
        });
    };

    export const store = (message: Withdraw) => (to: Builder) => {
        to.storeUint(TAG, 32)
            .storeUint(message.queryId, 64)
            .storeCoins(message.liquidity)
            .storeCoins(message.minimalXOut)
            .storeCoins(message.minimalYOut)
            .storeBit(message.autoClaimFees)
            .storeRef(
                beginCell().store(
                    BasicPayoutConfig.store(message.payoutConfig),
                ),
            );
    };

    export const toCell = (message: Withdraw): Cell =>
        beginCell().store(store(message)).endCell();

    export const createCell = (input: Input): Cell => toCell(create(input));
}
