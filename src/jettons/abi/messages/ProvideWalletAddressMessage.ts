import {
    type Address,
    beginCell,
    type Builder,
    type Cell,
    type Slice,
} from '@ton/core';
import { Optional } from '../../../core';

export interface ProvideWalletAddressMessage {
    kind: 'jettons.ProvideWalletAddressMessage';
    queryId: bigint;
    ownerAddress: Address;
    includeOwnerAddress: boolean;
}

export namespace ProvideWalletAddressMessage {
    export const TAG = 0x2c76b973;

    export type Input = Optional<
        Omit<ProvideWalletAddressMessage, 'kind'>,
        'queryId' | 'includeOwnerAddress'
    >;

    export const create = (input: Input): ProvideWalletAddressMessage => ({
        ...input,
        kind: 'jettons.ProvideWalletAddressMessage',
        queryId: input.queryId ?? 0n,
        includeOwnerAddress: input.includeOwnerAddress ?? false,
    });

    export const load = (source: Slice): ProvideWalletAddressMessage => {
        source.skip(32);
        const queryId = source.loadUintBig(64);
        const ownerAddress = source.loadAddress();
        const includeOwnerAddress = source.loadBit();

        return create({
            queryId,
            ownerAddress,
            includeOwnerAddress,
        });
    };

    export const store =
        (message: ProvideWalletAddressMessage) => (to: Builder) => {
            to.storeUint(TAG, 32)
                .storeUint(message.queryId, 64)
                .storeAddress(message.ownerAddress)
                .storeBit(message.includeOwnerAddress);
        };

    export const toCell = (message: ProvideWalletAddressMessage): Cell =>
        beginCell().store(store(message)).endCell();

    export const createCell = (input: Input): Cell => toCell(create(input));
}
