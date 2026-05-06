import { PayoutOptions } from './PayoutOptions';
import { type Address, type Builder, type Slice } from '@ton/core';
import { Optional } from '../../../core';

export interface BasicPayoutConfig {
    kind: 'dedust.cpmm.v2.BasicPayoutConfig';
    options: PayoutOptions;
    excessesTo: Address | null;
}

export namespace BasicPayoutConfig {
    export type Input = Optional<
        Omit<BasicPayoutConfig, 'kind'>,
        'options' | 'excessesTo'
    >;

    export const create = (input: Input = {}): BasicPayoutConfig => ({
        ...input,
        kind: 'dedust.cpmm.v2.BasicPayoutConfig',
        options: input.options ?? PayoutOptions.create(),
        excessesTo: input.excessesTo ?? null,
    });

    export const load = (source: Slice): BasicPayoutConfig => {
        const options = PayoutOptions.load(source);
        const excessesTo = source.loadMaybeAddress();

        return create({
            options,
            excessesTo,
        });
    };

    export const store =
        (basicPayoutConfig: BasicPayoutConfig) => (to: Builder) => {
            to.store(
                PayoutOptions.store(basicPayoutConfig.options),
            ).storeAddress(basicPayoutConfig.excessesTo);
        };
}
