import { Pool } from './Pool';
import { type Address, beginCell, type Cell, CellType } from '@ton/core';
import { PoolConfig, PoolStorage } from './abi';
import { contractAddress, StateInit } from '@ton/ton';

export class PoolV2 extends Pool {
    static readonly LIBRARY_HASH =
        0x6045e67b617e73486aac445cfcad0dbead6d315ccc8f4aede3f2e23ad14da4b0n;

    static fromAddress(poolAddress: Address): PoolV2 {
        return new PoolV2(poolAddress);
    }

    static fromConfig(config: PoolConfig): PoolV2 {
        const init: StateInit = {
            code: PoolV2.createPoolCode(),
            data: PoolStorage.createCell({
                config,
            }),
        };

        return new PoolV2(contractAddress(0, init), init);
    }

    static createPoolCode(): Cell {
        return beginCell()
            .storeUint(CellType.Library, 8)
            .storeUint(PoolV2.LIBRARY_HASH, 256)
            .endCell({ exotic: true });
    }
}
