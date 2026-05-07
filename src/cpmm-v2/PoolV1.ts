import { Pool } from './Pool';
import { Address, beginCell, Cell, CellType } from '@ton/core';
import { PoolConfig, PoolStorage } from './abi';
import { contractAddress, StateInit } from '@ton/ton';

export class PoolV1 extends Pool {
    static readonly LIBRARY_HASH =
        0x87b566c019a1c6fc691dcc5042559368db755428ef8e0f45eb23ade0118c4c36n;

    static fromAddress(poolAddress: Address): PoolV1 {
        return new PoolV1(poolAddress);
    }

    /**
     * @deprecated Use `PoolV2` instead.
     */
    static fromConfig(config: PoolConfig): PoolV1 {
        const init: StateInit = {
            code: PoolV1.createPoolCode(),
            data: PoolStorage.createCell({
                config,
            }),
        };

        return new PoolV1(contractAddress(0, init), init);
    }

    static createPoolCode(): Cell {
        return beginCell()
            .storeUint(CellType.Library, 8)
            .storeUint(PoolV1.LIBRARY_HASH, 256)
            .endCell({ exotic: true });
    }
}
