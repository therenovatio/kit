import { beginCell, type Builder, type Cell, type Slice } from '@ton/core';
import { ExtendedPayoutConfig } from '../types';
import { Optional } from '../../../core';

export interface PayJetton {
    kind: 'dedust.cpmm.v2.PayNative';
    paymentPayload: Cell;
    payoutConfig: ExtendedPayoutConfig;
}

export namespace PayJetton {
    export const TAG = 0xcbc33949;

    export type Input = Optional<Omit<PayJetton, 'kind'>, 'payoutConfig'>;

    export const create = (input: Input): PayJetton => ({
        ...input,
        kind: 'dedust.cpmm.v2.PayNative',
        payoutConfig: input.payoutConfig ?? ExtendedPayoutConfig.create(),
    });

    export const load = (source: Slice) => {
        source.skip(32);
        const paymentPayload = source.loadRef();
        const payoutConfig = ExtendedPayoutConfig.fromCell(source.loadRef());

        return create({
            paymentPayload,
            payoutConfig,
        });
    };

    export const store = (payJetton: PayJetton) => (to: Builder) => {
        to.storeUint(TAG, 32)
            .storeRef(payJetton.paymentPayload)
            .storeRef(ExtendedPayoutConfig.toCell(payJetton.payoutConfig));
    };

    export const toSlice = (payJetton: PayJetton): Slice =>
        beginCell().store(store(payJetton)).asSlice();

    export const createSlice = (input: Input): Slice => toSlice(create(input));
}
