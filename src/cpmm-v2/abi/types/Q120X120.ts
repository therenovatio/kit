import { type Builder, type Slice } from '@ton/core';

export type Q120X120 = {
    kind: 'dedust.cpmm.v2.Q120X120';
    value: bigint;
};

export namespace Q120X120 {
    export const create = (input: bigint): Q120X120 => ({
        kind: 'dedust.cpmm.v2.Q120X120',
        value: input,
    });

    export const load = (source: Slice): Q120X120 =>
        create(source.loadVarUintBig(5));

    export const store = (value: Q120X120) => (to: Builder) => {
        to.storeVarUint(value.value, 5);
    };

    export const sub = (x: Q120X120, y: Q120X120) => create(x.value - y.value);

    export const mul = (x: Q120X120, y: bigint) => (x.value * y) >> 120n;

    export const zero = () => create(0n);
}
