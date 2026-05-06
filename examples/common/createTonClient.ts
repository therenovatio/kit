import { TonClient } from '@ton/ton';

export const createTonClient = () =>
    new TonClient({
        endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC',
    });
