import {
    type Address,
    type Builder,
    type Cell,
    type DictionaryValue,
    type ExternalAddress,
    type Slice,
} from '@ton/core';

const customInspectSymbol = Symbol.for('nodejs.util.inspect.custom');

export interface Asset {
    kind: 'dedust.cpmm.v2.Asset';
    value: Address | ExternalAddress | null;
    [customInspectSymbol]: () => string;
}

export namespace Asset {
    export type Input = Address | ExternalAddress | null;

    export const create = (input: Input): Asset => ({
        kind: 'dedust.cpmm.v2.Asset',
        value: input,
        [customInspectSymbol]: () =>
            input === null ? '<Asset NATIVE>' : `<Asset ${input.toString()}>`,
    });

    export const load = (source: Slice): Asset =>
        create(source.loadAddressAny());

    export const store = (asset: Asset) => (to: Builder) =>
        to.storeAddress(asset.value);

    export const fromCell = (cell: Cell) => load(cell.asSlice());

    export const createDictionaryValue = (): DictionaryValue<Asset> => ({
        parse: load,
        serialize: (src: Asset, to: Builder) => to.store(store(src)),
    });

    export const native = () => create(null);

    export const jetton = (jettonRoot: Address) => create(jettonRoot);
}
