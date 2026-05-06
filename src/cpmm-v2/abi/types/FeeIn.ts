import { type Builder, type Slice } from '@ton/core';

export type FeeIn =
    | {
          kind: 'dedust.cpmm.v2.FeeIn';
          type: 'both';
      }
    | {
          kind: 'dedust.cpmm.v2.FeeIn';
          type: 'assetX';
      }
    | {
          kind: 'dedust.cpmm.v2.FeeIn';
          type: 'assetY';
      };

export namespace FeeIn {
    export const both = (): FeeIn => ({
        kind: 'dedust.cpmm.v2.FeeIn',
        type: 'both',
    });

    export const assetX = (): FeeIn => ({
        kind: 'dedust.cpmm.v2.FeeIn',
        type: 'assetX',
    });

    export const assetY = (): FeeIn => ({
        kind: 'dedust.cpmm.v2.FeeIn',
        type: 'assetY',
    });

    export const load = (source: Slice): FeeIn => {
        switch (source.loadUint(2)) {
            case 0b00:
                return both();
            case 0b01:
                return assetX();
            case 0b10:
                return assetY();
            default:
                throw new Error('Unknown FeeIn type.');
        }
    };

    export const store = (feeIn: FeeIn) => (to: Builder) => {
        switch (feeIn.type) {
            case 'both':
                return to.storeUint(0b00, 2);
            case 'assetX':
                return to.storeUint(0b01, 2);
            case 'assetY':
                return to.storeUint(0b10, 2);
        }
    };
}
