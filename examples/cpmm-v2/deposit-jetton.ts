import { createTonConnectSender, useTonConnect } from '../ton-connect';
import { createTonClient } from '../common/createTonClient';
import {
    DepositPayload,
    ExtendedPayoutConfig,
    PayJetton,
    Pool,
} from '../../src/cpmm-v2';
import { Address, beginCell, toNano } from '@ton/core';
import { JettonRoot } from '../../src/jettons';
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

    const jettonRoot = tonClient.open(
        JettonRoot.fromAddress(
            Address.parse('kQDyGnLFLDvyrVHiMb2MA4FLzoEwzYivy7r-M8qtdzHEXNqG'),
        ),
    );

    const jettonWallet = tonClient.open(
        await jettonRoot.getWallet(sender.address!),
    );

    await new Promise((resolve) => setTimeout(resolve, 1000));

    await jettonWallet.sendTransfer(sender, {
        amount: toNano('10'),
        to: pool.address,
        excessesTo: sender.address!,
        forwardToncoinAmount: toNano('0.2'),
        forwardPayload: PayJetton.createSlice({
            paymentPayload: beginCell()
                .store(
                    DepositPayload.store(
                        DepositPayload.create({
                            amountX: toNano('5'),
                            amountY: toNano('10'),
                            minimalLiquidity: 0n,
                            lockedLiquidityShare: 0,
                        }),
                    ),
                )
                .endCell(),
            payoutConfig: ExtendedPayoutConfig.create({
                excessesTo: sender.address!,
            }),
        }),
    });
}

main();
