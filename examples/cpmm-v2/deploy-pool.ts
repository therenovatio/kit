import { Asset, FeeIn, Pool, PoolConfig } from '../../src/cpmm-v2';
import { Address } from '@ton/core';
import { createTonConnectSender, useTonConnect } from '../ton-connect';
import { createTonClient } from '../common/createTonClient';

async function main() {
    const tonClient = createTonClient();
    const tonConnect = await useTonConnect();
    const sender = createTonConnectSender(tonConnect);

    const usdt = Address.parse(
        'kQDyGnLFLDvyrVHiMb2MA4FLzoEwzYivy7r-M8qtdzHEXNqG',
    );

    const pool = tonClient.open(
        Pool.fromConfig(
            PoolConfig.create({
                assetX: Asset.native(),
                assetY: Asset.jetton(usdt),
                baseFeeBPS: 25,
                feeIn: FeeIn.assetY(),
            }),
        ),
    );

    await pool.sendInit(sender);
}

main();
