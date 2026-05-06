import { type Address, type Builder, type Cell, type Slice } from '@ton/core';
import { Optional } from '../../../core';

export interface PayoutOptions {
    kind: 'dedust.cpmm.v2.PayoutOptions';
    destination: Address | null;
    extraGas: bigint;
    payload: Cell | null;
    wrapPayload: boolean;
}

export namespace PayoutOptions {
    export type Input = Optional<
        Omit<PayoutOptions, 'kind'>,
        'destination' | 'extraGas' | 'payload' | 'wrapPayload'
    >;

    export const create = (input: Input = {}): PayoutOptions => ({
        ...input,
        kind: 'dedust.cpmm.v2.PayoutOptions',
        destination: input.destination ?? null,
        extraGas: input.extraGas ?? 0n,
        payload: input.payload ?? null,
        wrapPayload: input.wrapPayload ?? false,
    });

    export const store = (payoutOptions: PayoutOptions) => (to: Builder) => {
        to.storeAddress(payoutOptions.destination)
            .storeCoins(payoutOptions.extraGas)
            .storeMaybeRef(payoutOptions.payload)
            .storeBit(payoutOptions.wrapPayload);
    };

    export const load = (source: Slice): PayoutOptions => {
        const destination = source.loadMaybeAddress();
        const extraGas = source.loadCoins();
        const payload = source.loadMaybeRef();
        const wrapPayload = source.loadBit();

        return create({
            destination,
            extraGas,
            payload,
            wrapPayload,
        });
    };
}
