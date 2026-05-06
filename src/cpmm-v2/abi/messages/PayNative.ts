import { beginCell, type Builder, type Cell, type Slice } from '@ton/core';
import { ExtendedPayoutConfig } from '../types';
import { Optional } from '../../../core';

export interface PayNative {
    kind: 'dedust.cpmm.v2.PayNative';
    queryId: bigint;
    amount: bigint;
    paymentPayload: Cell;
    payoutConfig: ExtendedPayoutConfig;
}

export namespace PayNative {
    export const TAG = 0xa5a7cbf8;

    export type Input = Optional<
        Omit<PayNative, 'kind'>,
        'queryId' | 'payoutConfig'
    >;

    export const create = (input: Input): PayNative => ({
        ...input,
        kind: 'dedust.cpmm.v2.PayNative',
        queryId: input.queryId ?? 0n,
        payoutConfig: input.payoutConfig ?? ExtendedPayoutConfig.create(),
    });

    export const load = (source: Slice): PayNative => {
        source.skip(32);
        const queryId = source.loadUintBig(64);
        const amount = source.loadCoins();
        const paymentPayload = source.loadRef();
        const payoutConfig = ExtendedPayoutConfig.fromCell(source.loadRef());

        return create({
            queryId,
            amount,
            paymentPayload,
            payoutConfig,
        });
    };

    export const store = (payNative: PayNative) => (to: Builder) => {
        to.storeUint(TAG, 32)
            .storeUint(payNative.queryId, 64)
            .storeCoins(payNative.amount)
            .storeRef(payNative.paymentPayload)
            .storeRef(ExtendedPayoutConfig.toCell(payNative.payoutConfig));
    };

    export const createCell = (input: Input): Cell =>
        beginCell()
            .store(store(create(input)))
            .endCell();
}
