import {
    type Address,
    beginCell,
    type ContractProvider,
    type Sender,
    toNano,
} from '@ton/core';
import { JettonWallet } from './JettonWallet';
import { ProvideWalletAddressMessage } from './abi/messages/ProvideWalletAddressMessage';

export class JettonRoot {
    protected constructor(readonly address: Address) {}

    static fromAddress(address: Address) {
        return new JettonRoot(address);
    }

    async getData(provider: ContractProvider) {
        const { stack } = await provider.get('get_jetton_data', []);

        const totalSupply = stack.readBigNumber();
        const mintable = stack.readBoolean();
        const adminAddress = stack.readAddressOpt();
        const content = stack.readCell();
        const walletCode = stack.readCell();

        return {
            totalSupply,
            mintable,
            adminAddress,
            content,
            walletCode,
        };
    }

    async getWallet(
        provider: ContractProvider,
        ownerAddress: Address,
    ): Promise<JettonWallet> {
        const { stack } = await provider.get('get_wallet_address', [
            {
                type: 'slice',
                cell: beginCell().storeAddress(ownerAddress).endCell(),
            },
        ]);

        return new JettonWallet(stack.readAddress());
    }

    async sendProvideWalletAddress(
        provider: ContractProvider,
        via: Sender,
        input: ProvideWalletAddressMessage.Input,
    ) {
        await provider.internal(via, {
            value: toNano('0.05'),
            body: ProvideWalletAddressMessage.createCell(input),
        });
    }
}
