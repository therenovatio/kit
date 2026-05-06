import { Address } from '@ton/core';
import { createTonClient } from '../common/createTonClient';
import { Pool } from '../../src/cpmm-v2';
import { createTonConnectSender, useTonConnect } from '../ton-connect';
import { delay } from '../common/delay';

export async function main() {
    const tonClient = createTonClient();
    const tonConnect = await useTonConnect();
    const sender = createTonConnectSender(tonConnect);

    const pool = tonClient.open(
        Pool.fromAddress(
            Address.parse('kQC0P405i6zlJF_dmzGD46FdL6J_EUt_beUrTOzQDKgIGACP'),
        ),
    );

    await delay(1_000);

    const position = tonClient.open(await pool.getPosition(sender.address!));
    const positionData = await position.getData();

    console.log(positionData);

    await pool.sendWithdraw(sender, {
        liquidity:
            (positionData.totalLiquidity - positionData.lockedLiquidity) / 10n,
    });
}

main();
