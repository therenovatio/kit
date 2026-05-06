import { createTonClient } from '../common/createTonClient';
import { Pool } from '../../src/cpmm-v2';
import { Address } from '@ton/core';
import { inspect } from 'node:util';

export async function main() {
    const tonClient = createTonClient();
    const pool = tonClient.open(
        Pool.fromAddress(
            Address.parse('kQC0P405i6zlJF_dmzGD46FdL6J_EUt_beUrTOzQDKgIGACP'),
        ),
    );

    console.log(
        inspect(await pool.getFullState(), {
            depth: 8,
            colors: true,
        }),
    );
}

main();
