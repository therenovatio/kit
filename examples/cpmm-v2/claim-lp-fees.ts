import { createTonConnectSender, useTonConnect } from '../ton-connect';
import { createTonClient } from '../common/createTonClient';
import { calculateClaimablePositionFees, Pool } from '../../src/cpmm-v2';
import { Address } from '@ton/core';
import { CHAIN } from '@tonconnect/sdk';
import { delay } from '../common/delay';

export async function main() {
    const tonConnect = await useTonConnect({ network: CHAIN.TESTNET });
    const sender = createTonConnectSender(tonConnect);
    const tonClient = createTonClient();

    console.log(
        'Wallet:',
        sender.address!.toString({ testOnly: true, bounceable: false }),
    );

    const pool = tonClient.open(
        Pool.fromAddress(
            Address.parse('kQC0P405i6zlJF_dmzGD46FdL6J_EUt_beUrTOzQDKgIGACP'),
        ),
    );

    const position = tonClient.open(await pool.getPosition(sender.address!));
    await delay(1_000);
    const poolData = await pool.getData();
    await delay(1_000);
    const positionData = await position.getData();

    const availableFees = calculateClaimablePositionFees(
        poolData,
        positionData,
    );

    console.log(availableFees);

    await delay(1_000);

    await pool.sendClaimPositionFees(sender, {
        excessesTo: sender.address!,
    });
}

main();
