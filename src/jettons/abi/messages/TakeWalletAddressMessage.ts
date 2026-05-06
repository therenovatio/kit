import { type Address, beginCell, Builder, type Slice } from '@ton/core';

export interface TakeWalletAddressMessage {
    kind: 'jettons.TakeWalletAddressMessage';
    queryId: bigint;
    walletAddress: Address | null;
    ownerAddress: Address | null;
}

export namespace TakeWalletAddressMessage {
    export const TAG = 0xd1735400;

    export type Input = Omit<TakeWalletAddressMessage, 'kind'>;

    export const create = (input: Input): TakeWalletAddressMessage => ({
        ...input,
        kind: 'jettons.TakeWalletAddressMessage',
    });

    export const load = (source: Slice): TakeWalletAddressMessage => {
        source.skip(32);
        const queryId = source.loadUintBig(64);
        const walletAddress = source.loadMaybeAddress();
        const ownerAddress =
            source.loadMaybeRef()?.beginParse().loadAddress() ?? null;

        return create({
            queryId,
            walletAddress,
            ownerAddress,
        });
    };

    export const store =
        (message: TakeWalletAddressMessage) => (to: Builder) => {
            to.storeUint(TAG, 32)
                .storeUint(message.queryId, 64)
                .storeAddress(message.walletAddress)
                .storeMaybeRef(
                    message.ownerAddress &&
                        beginCell().storeAddress(message.ownerAddress),
                );
        };
}
