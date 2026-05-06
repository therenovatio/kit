import {
    IStorage,
    SendTransactionRequest,
    TonConnect,
    Wallet,
} from '@tonconnect/sdk';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { Address, beginCell, Sender, SenderArguments } from '@ton/core';
import { storeStateInit } from '@ton/ton';

export class FileStorage implements IStorage {
    private data: { [key: string]: string } = {};

    constructor(readonly filePath: string) {
        if (!existsSync(filePath)) return;
        this.load();
    }

    private load() {
        this.data = JSON.parse(readFileSync(this.filePath).toString());
    }

    private flush() {
        writeFileSync(this.filePath, JSON.stringify(this.data));
    }

    async setItem(key: string, value: string): Promise<void> {
        this.data[key] = value;
        this.flush();
    }

    async getItem(key: string): Promise<string | null> {
        return this.data[key] ?? null;
    }

    async removeItem(key: string): Promise<void> {
        delete this.data[key];
        this.flush();
    }
}

export const useTonConnect = ({
    network,
}: { network?: string } = {}): Promise<TonConnect> =>
    new Promise(async (resolve, reject) => {
        const storage = new FileStorage('storage.json');
        const connector: TonConnect = new TonConnect({
            manifestUrl: `https://dedust.io/tonconnect-manifest.json`,
            storage,
        });

        (connector as any).analytics?.setEnabled(false);

        if (network) {
            connector.setConnectionNetwork(network);
        }

        connector.onStatusChange(
            (wallet: Wallet | null) => {
                if (wallet) {
                    resolve(connector);
                }
            },
            (error) => {
                reject(error);
            },
        );

        await connector.restoreConnection();

        if (!connector.connected) {
            const link = connector.connect({
                universalLink: 'https://connect.mytonwallet.org',
                bridgeUrl: 'https://tonconnectbridge.mytonwallet.org/bridge/',
            });

            console.log('Connect:', link);
        }
    });

export const createTonConnectSender = (tonConnect: TonConnect): Sender =>
    ({
        address: tonConnect.account
            ? Address.parse(tonConnect.account.address)
            : undefined,
        send: async (args: SenderArguments): Promise<void> => {
            try {
                const result = await tonConnect.sendTransaction({
                    validUntil: Math.floor(Date.now() / 1000) + 60,
                    messages: [
                        {
                            address: args.to.toString(),
                            amount: args.value.toString(),
                            extraCurrency: args.extracurrency
                                ? Object.fromEntries(
                                      Object.entries(args.extracurrency).map(
                                          ([currencyId, balance]): [
                                              number,
                                              string,
                                          ] => [
                                              parseInt(currencyId, 10),
                                              balance.toString(),
                                          ],
                                      ),
                                  )
                                : undefined,
                            stateInit: args.init
                                ? beginCell()
                                      .store(storeStateInit(args.init))
                                      .endCell()
                                      .toBoc()
                                      .toString('base64')
                                : undefined,
                            payload: args.body
                                ? args.body.toBoc().toString('base64')
                                : undefined,
                        },
                    ],
                } as SendTransactionRequest);

                console.log('result:', result);
            } catch (error) {
                console.error('error:', error);
            }
        },
    }) as Sender;
