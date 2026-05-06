import {
    type Address,
    type ContractProvider,
    type Sender,
    toNano,
} from '@ton/core';
import { TransferMessage } from './abi/messages/TransferMessage';

export class JettonWallet {
    constructor(readonly address: Address) {}

    async sendTransfer(
        provider: ContractProvider,
        via: Sender,
        input: TransferMessage.Input,
        extraGas?: bigint,
    ) {
        await provider.internal(via, {
            value:
                (extraGas ?? toNano('0.05')) +
                (input.forwardToncoinAmount ?? 0n),
            body: TransferMessage.createCell(input),
        });
    }

    async getData(provider: ContractProvider) {
        const { stack } = await provider.get('get_wallet_data', []);

        const balance = stack.readBigNumber();
        const ownerAddress = stack.readAddress();
        const rootAddress = stack.readAddress();
        const walletCode = stack.readCell();

        return {
            balance,
            ownerAddress,
            rootAddress,
            walletCode,
        };
    }

    async getBalance(provider: ContractProvider): Promise<bigint> {
        const { balance } = await this.getData(provider);
        return balance;
    }
}
