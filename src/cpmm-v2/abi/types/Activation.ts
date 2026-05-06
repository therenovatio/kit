import { type Address, type Builder, type Slice } from '@ton/core';

export type Activation =
    | {
          kind: 'dedust.cpmm.v2.Activation';
          type: 'time';
          activeSince: number;
      }
    | {
          kind: 'dedust.cpmm.v2.Activation';
          type: 'initiator';
          initiatorAddress: Address;
      };

export namespace Activation {
    export const time = (activeSince: number): Activation => ({
        kind: 'dedust.cpmm.v2.Activation',
        type: 'time',
        activeSince,
    });

    export const initiator = (initiatorAddress: Address): Activation => ({
        kind: 'dedust.cpmm.v2.Activation',
        type: 'initiator',
        initiatorAddress,
    });

    export const load = (source: Slice): Activation => {
        switch (source.loadUint(8)) {
            case 0x01:
                return time(source.loadUint(40));
            case 0x02:
                return initiator(source.loadAddress());
            default:
                throw new Error('Unknown Activation type.');
        }
    };

    export const store = (activation: Activation) => (to: Builder) => {
        switch (activation.type) {
            case 'time':
                return to
                    .storeUint(0x01, 8)
                    .storeUint(activation.activeSince, 40);
            case 'initiator':
                return to
                    .storeUint(0x02, 8)
                    .storeAddress(activation.initiatorAddress);
        }
    };
}
