import { beginCell, type Builder, type Cell, type Slice } from '@ton/core';
import { PartnerConfig, ReferrerConfig, SwapStep } from '../types';
import { Optional } from '../../../core';

export interface SwapPayload {
    kind: 'dedust.cpmm.v2.SwapPayload';
    minimalAmountOut: bigint;
    deadline: number;
    next: SwapStep | null;
    partnerConfig: PartnerConfig | null;
    referrerConfig: ReferrerConfig | null;
}

export namespace SwapPayload {
    export const TAG = 0xc442500f;

    export type Input = Optional<
        Omit<SwapPayload, 'kind'>,
        'deadline' | 'next' | 'partnerConfig' | 'referrerConfig'
    >;

    export const create = (input: Input): SwapPayload => ({
        ...input,
        kind: 'dedust.cpmm.v2.SwapPayload',
        deadline: input.deadline ?? 0,
        next: input.next ?? null,
        partnerConfig: input.partnerConfig ?? null,
        referrerConfig: input.referrerConfig ?? null,
    });

    export const load = (source: Slice): SwapPayload => {
        source.skip(32);
        const minimalAmountOut = source.loadCoins();
        const deadline = source.loadUint(40);
        const next = source.loadMaybeRef();
        const partnerConfig = source.loadBit()
            ? PartnerConfig.load(source)
            : null;
        const referrerConfig = source.loadBit()
            ? ReferrerConfig.load(source)
            : null;

        return create({
            minimalAmountOut,
            deadline,
            next: next && SwapStep.load(next.asSlice()),
            partnerConfig,
            referrerConfig,
        });
    };

    export const store = (swapPayload: SwapPayload) => (to: Builder) => {
        to.storeUint(TAG, 32)
            .storeCoins(swapPayload.minimalAmountOut)
            .storeUint(swapPayload.deadline, 40)
            .storeMaybeRef(
                swapPayload.next &&
                    beginCell().store(SwapStep.store(swapPayload.next)),
            )
            .storeMaybeBuilder(
                swapPayload.partnerConfig &&
                    beginCell().store(
                        PartnerConfig.store(swapPayload.partnerConfig),
                    ),
            )
            .storeMaybeBuilder(
                swapPayload.referrerConfig &&
                    beginCell().store(
                        ReferrerConfig.store(swapPayload.referrerConfig),
                    ),
            );
    };

    export const createCell = (input: Input): Cell =>
        beginCell()
            .store(store(create(input)))
            .endCell();
}
