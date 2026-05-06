import { type Address, beginCell, type Builder, type Slice } from '@ton/core';
import { type Optional } from '../../../core';

export interface SwapStep {
    kind: 'dedust.cpmm.v2.SwapStep';
    pool: Address;
    minimalAmountOut: bigint;
    deadline: number;
    next: SwapStep | null;
}

export namespace SwapStep {
    export type Input = Optional<Omit<SwapStep, 'kind'>, 'deadline' | 'next'>;

    export const create = (input: Input): SwapStep => ({
        ...input,
        kind: 'dedust.cpmm.v2.SwapStep',
        deadline: input.deadline ?? 0,
        next: input.next ?? null,
    });

    export const load = (source: Slice): SwapStep => {
        const pool = source.loadAddress();
        const minimalAmountOut = source.loadCoins();
        const deadline = source.loadUint(40);
        const next = source.loadMaybeRef();

        return create({
            pool,
            minimalAmountOut,
            deadline,
            next: next && load(next.asSlice()),
        });
    };

    export const store = (swapStep: SwapStep) => (to: Builder) => {
        to.storeAddress(swapStep.pool)
            .storeCoins(swapStep.minimalAmountOut)
            .storeUint(swapStep.deadline, 40)
            .storeMaybeRef(
                swapStep.next && beginCell().store(store(swapStep.next)),
            );
    };
}
