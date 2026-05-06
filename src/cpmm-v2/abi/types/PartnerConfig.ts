import { type Builder, type Slice } from '@ton/core';

export interface PartnerConfig {
    kind: 'dedust.cpmm.v2.PartnerConfig';
    partnerId: Buffer;
    partnerFeeBPS: number;
}

export namespace PartnerConfig {
    export type Input = Omit<PartnerConfig, 'kind'>;

    export const create = (input: Input): PartnerConfig => ({
        ...input,
        kind: 'dedust.cpmm.v2.PartnerConfig',
    });

    export const load = (source: Slice): PartnerConfig => {
        const partnerId = source.loadBuffer(32);
        const partnerFeeBPS = source.loadUint(16);

        return create({
            partnerId,
            partnerFeeBPS,
        });
    };

    export const store = (partnerConfig: PartnerConfig) => (to: Builder) => {
        to.storeBuffer(partnerConfig.partnerId, 32).storeUint(
            partnerConfig.partnerFeeBPS,
            16,
        );
    };
}
