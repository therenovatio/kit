import { type Address, type Builder, type Slice } from '@ton/core';

export type PoolStatus =
    | {
          kind: 'dedust.cpmm.v2.PoolStatus';
          status: 'uninitialized';
      }
    | {
          kind: 'dedust.cpmm.v2.PoolStatus';
          status: 'initializing';
          initiatorAddress: Address;
      }
    | {
          kind: 'dedust.cpmm.v2.PoolStatus';
          status: 'initialized';
      };

export namespace PoolStatus {
    export const uninitialized = (): PoolStatus => ({
        kind: 'dedust.cpmm.v2.PoolStatus',
        status: 'uninitialized',
    });

    export const initializing = (initiatorAddress: Address): PoolStatus => ({
        kind: 'dedust.cpmm.v2.PoolStatus',
        status: 'initializing',
        initiatorAddress,
    });

    export const initialized = (): PoolStatus => ({
        kind: 'dedust.cpmm.v2.PoolStatus',
        status: 'initialized',
    });

    export const load = (source: Slice): PoolStatus => {
        switch (source.loadUint(2)) {
            case 0b00:
                return uninitialized();
            case 0b01:
                return initializing(source.loadAddress());
            case 0b10:
                return initialized();
            default:
                throw new Error('Prefix malformed.');
        }
    };

    export const store = (status: PoolStatus) => (to: Builder) => {
        switch (status.status) {
            case 'uninitialized':
                return to.storeUint(0b00, 2);
            case 'initializing':
                return to
                    .storeUint(0b01, 2)
                    .storeAddress(status.initiatorAddress);
            case 'initialized':
                return to.storeUint(0b10, 2);
        }
    };
}
