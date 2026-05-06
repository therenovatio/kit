import { Meme } from '../../src/uranus';
import { Address, Sender, toNano } from '@ton/core';
import { createTonClient } from '../common/createTonClient';

async function main() {
    const tonClient = createTonClient();
    const memeAddress = Address.parse('12345');
    const meme = tonClient.open(Meme.fromAddress(memeAddress));

    const sender: Sender = null as any;

    const amount = toNano('1');
    const gas = toNano('0.05');

    if (!sender.address) {
        console.error('Wallet not connected.');
        return;
    }

    await meme.sendBuyMessage(sender, amount + gas, {
        queryId: 0n,
        amount,
        minimalAmountOut: 0n, // TODO: Calculate it properly.
        excessesTo: sender.address,
        partnerConfig: null,
        referrerConfig: null,
    });
}

main();
