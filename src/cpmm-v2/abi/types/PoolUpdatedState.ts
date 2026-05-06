import { beginCell, type Builder, type Cell, type Slice } from '@ton/core';
import { PoolFees } from './PoolFees';

export interface PoolUpdatedState {
    kind: 'dedust.cpmm.v2.PoolUpdatedState';
    reserveX: bigint;
    reserveY: bigint;
    liquidity: bigint;
    fees: PoolFees;
}

export namespace PoolUpdatedState {
    export type Input = Omit<PoolUpdatedState, 'kind'>;

    export const create = (input: Input): PoolUpdatedState => ({
        ...input,
        kind: 'dedust.cpmm.v2.PoolUpdatedState',
    });

    export const load = (source: Slice): PoolUpdatedState => {
        const reserveX = source.loadCoins();
        const reserveY = source.loadCoins();
        const liquidity = source.loadCoins();
        const fees = PoolFees.load(source.loadRef().asSlice());

        return create({
            reserveX,
            reserveY,
            liquidity,
            fees,
        });
    };

    export const store =
        (poolUpdatedState: PoolUpdatedState) => (to: Builder) => {
            to.storeCoins(poolUpdatedState.reserveX)
                .storeCoins(poolUpdatedState.reserveY)
                .storeCoins(poolUpdatedState.liquidity)
                .storeRef(PoolFees.toCell(poolUpdatedState.fees));
        };

    export const toCell = (poolUpdatedState: PoolUpdatedState): Cell =>
        beginCell().store(store(poolUpdatedState)).endCell();

    export const fromCell = (cell: Cell): PoolUpdatedState =>
        load(cell.asSlice());
}
