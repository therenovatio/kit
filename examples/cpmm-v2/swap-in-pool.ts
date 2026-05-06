import { Address, type Sender, type SenderArguments, toNano } from '@ton/core';
import axios from 'axios';
import { JettonRoot } from '../../src/jettons';
import {
    Pool,
    SwapPayload,
    PayJetton,
    SwapStep,
    calculateClaimablePositionFees,
} from '../../src/cpmm-v2';
import { createTonClient } from '../common/createTonClient';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const emulateClient = axios.create({
    baseURL: 'https://toncenter.com/api/emulate', // or "https://testnet.toncenter.com/api/emulate/index.html"
});

const createSimulator = (from: Address): Sender => ({
    address: from,
    async send(args: SenderArguments): Promise<void> {
        const { data } = await emulateClient.post('/v1/emulateTonConnect', {
            from: from.toString(),
            messages: [
                {
                    address: args.to.toString(),
                    amount: args.value.toString(),
                    payload: args.body?.toBoc().toString('base64'),
                },
            ],
        });

        const print = (txRef: any, depth: number = 0) => {
            const tx = data.transactions[txRef.tx_hash];

            console.log(
                ' '.repeat(depth * 4) + tx.in_msg.opcode.replace(/^0x/, ''),
                `(${tx.in_msg.decoded_opcode ?? 'unknown'})`,
                Number(tx.in_msg.value) / 10 ** 9,
                'TON',
                `->`,
                `${Address.parse(tx.account).toString()}`,
                'exit code:',
                tx.description.compute_ph.exit_code,
            );

            // ext out
            tx.out_msgs
                .filter((outMessage: any) => !outMessage.destination)
                .forEach((externalOutMessage: any) => {
                    console.log(
                        ' '.repeat((depth + 1) * 4) +
                            externalOutMessage.opcode.replace(/^0x/, ''),
                        '->',
                        'nowhere',
                        'SwapEvent()',
                        // SwapEvent.fromCell(
                        //     Cell.fromBase64(
                        //         externalOutMessage.message_content.body,
                        //     ),
                        // ),
                    );
                });

            // children txs
            txRef.children.forEach((child: any) => print(child, depth + 1));
        };

        print(data.trace);
    },
});

async function main() {
    const tonClient = createTonClient();

    const pool = tonClient.open(
        Pool.fromAddress(
            Address.parse('EQCyh-Vru-56OnpeweLQyTsTm5B2z_3CWZtgqADJXwGdW3_y'),
        ),
    );

    console.log(await pool.getFullState());

    await delay(1000);

    const poolData = await pool.getData();
    console.log('Pool:', pool.address, poolData);

    await delay(1000);

    const position = tonClient.open(
        await pool.getPosition(
            Address.parse('UQDRAm4M67qgCPXj8G1TD0LYeYGUmMbZRTxnbGcxqeJdhBRL'),
        ),
    );

    await delay(1000);

    const positionData = await position.getData();
    console.log('Position:', position.address, positionData);
    console.log(calculateClaimablePositionFees(poolData, positionData));

    await delay(1000);
    //
    const trader = Address.parse(
        'UQDz0wQL6EEdgbPkFgS7nNmywzr468AvgLyhH7PIMALxPEND',
    );

    const sender = createSimulator(trader);

    console.log('\nTON -> USDT -> MUSH:');
    await pool.sendPayNative(sender, {
        amount: toNano('2'),
        paymentPayload: SwapPayload.createCell({
            minimalAmountOut: 0n,
            next: SwapStep.create({
                pool: Address.parse(
                    'EQC5YSJbs1ROfr4xFRyYkH1OVepDmhChexq1nHRD5eTlOyeM',
                ), // MUSH/USDT
                minimalAmountOut: 0n,
            }),
        }),
    });

    await delay(1000);

    const USDT = tonClient.open(
        JettonRoot.fromAddress(
            Address.parse('EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs'),
        ),
    );

    const usdtWallet = tonClient.open(await USDT.getWallet(trader));
    await delay(1000);

    console.log('\nUSDT -> TON:');

    await usdtWallet.sendTransfer(sender, {
        amount: 5_000_000n,
        to: pool.address,
        excessesTo: trader,
        forwardToncoinAmount: toNano('0.25'),
        forwardPayload: PayJetton.createSlice({
            paymentPayload: SwapPayload.createCell({
                minimalAmountOut: 0n,
            }),
        }),
    });

    await delay(1000);

    await USDT.sendProvideWalletAddress(sender, {
        ownerAddress: trader,
    });
}

main();
