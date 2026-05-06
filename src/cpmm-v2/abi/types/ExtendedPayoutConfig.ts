import { PayoutOptions } from './PayoutOptions';
import {
    type Address,
    beginCell,
    type Builder,
    type Cell,
    type Slice,
} from '@ton/core';
import { Optional } from '../../../core';

export interface ExtendedPayoutConfig {
    kind: 'dedust.cpmm.v2.ExtendedPayoutConfig';
    fulfill: PayoutOptions;
    reject: PayoutOptions;
    excessesTo: Address | null;
}

export namespace ExtendedPayoutConfig {
    export type Input = Optional<
        Omit<ExtendedPayoutConfig, 'kind'>,
        'fulfill' | 'reject' | 'excessesTo'
    >;

    export const create = (input: Input = {}): ExtendedPayoutConfig => ({
        ...input,
        kind: 'dedust.cpmm.v2.ExtendedPayoutConfig',
        fulfill: input.fulfill ?? PayoutOptions.create(),
        reject: input.reject ?? PayoutOptions.create(),
        excessesTo: input.excessesTo ?? null,
    });

    export const load = (source: Slice): ExtendedPayoutConfig => {
        const fulfill = PayoutOptions.load(source);
        const reject = PayoutOptions.load(source);
        const excessesTo = source.loadMaybeAddress();

        return create({
            fulfill,
            reject,
            excessesTo,
        });
    };

    export const store =
        (extendedPayoutConfig: ExtendedPayoutConfig) => (to: Builder) => {
            to.store(PayoutOptions.store(extendedPayoutConfig.fulfill))
                .store(PayoutOptions.store(extendedPayoutConfig.reject))
                .storeAddress(extendedPayoutConfig.excessesTo);
        };

    export const fromCell = (cell: Cell): ExtendedPayoutConfig =>
        load(cell.asSlice());

    export const toCell = (extendedPayoutConfig: ExtendedPayoutConfig): Cell =>
        beginCell().store(store(extendedPayoutConfig)).endCell();
}
