import { type Builder, type Slice } from '@ton/core';

export interface ReferrerConfig {
    kind: 'dedust.cpmm.v2.ReferrerConfig';
    referrerId: Buffer;
    referrerFeeBPS: number;
}

export namespace ReferrerConfig {
    export type Input = Omit<ReferrerConfig, 'kind'>;

    export const create = (input: Input): ReferrerConfig => ({
        ...input,
        kind: 'dedust.cpmm.v2.ReferrerConfig',
    });

    export const load = (source: Slice): ReferrerConfig => {
        const referrerId = source.loadBuffer(32);
        const referrerFeeBPS = source.loadUint(16);

        return create({
            referrerId,
            referrerFeeBPS,
        });
    };

    export const store = (referrerConfig: ReferrerConfig) => (to: Builder) => {
        to.storeBuffer(referrerConfig.referrerId, 32).storeUint(
            referrerConfig.referrerFeeBPS,
            16,
        );
    };
}
