import { createTonConnectSender, useTonConnect } from '../ton-connect';
import { createTonClient } from '../common/createTonClient';
import { DepositPayload, ExtendedPayoutConfig, Pool } from '../../src/cpmm-v2';
import { Address, toNano } from '@ton/core';
import { CHAIN } from '@tonconnect/sdk';

export async function main() {
    const tonConnect = await useTonConnect({ network: CHAIN.TESTNET });
    const sender = createTonConnectSender(tonConnect);
    const tonClient = createTonClient();

    const pool = tonClient.open(
        Pool.fromAddress(
            Address.parse('kQC0P405i6zlJF_dmzGD46FdL6J_EUt_beUrTOzQDKgIGACP'),
        ),
    );

    await pool.sendPayNative(sender, {
        amount: toNano('5'),
        paymentPayload: DepositPayload.createCell({
            amountX: toNano('5'),
            amountY: toNano('10'),
            minimalLiquidity: 0n,
            lockedLiquidityShare: 0,
        }),
        payoutConfig: ExtendedPayoutConfig.create({
            excessesTo: sender.address!,
        }),
    });
}

main();
