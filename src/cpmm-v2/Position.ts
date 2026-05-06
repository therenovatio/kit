import { type Address, type ContractProvider, Dictionary } from '@ton/core';
import { PositionReward, Q120X120 } from './abi';

export interface PositionData {
    poolAddress: Address;
    ownerAddress: Address;
    totalLiquidity: bigint;
    lockedLiquidity: bigint;
    rewards: Map<number, PositionReward>;
    xPending: bigint;
    yPending: bigint;
    xFeePerTokenCheckpoint: Q120X120;
    yFeePerTokenCheckpoint: Q120X120;
}

export class Position {
    constructor(readonly address: Address) {}

    async getData(provider: ContractProvider): Promise<PositionData> {
        const { stack } = await provider.get('get_position_data', []);

        const poolAddress = stack.readAddress();
        const ownerAddress = stack.readAddress();
        const totalLiquidity = stack.readBigNumber();
        const lockedLiquidity = stack.readBigNumber();

        const rewards = new Map(
            Dictionary.loadDirect(
                Dictionary.Keys.Uint(2),
                PositionReward.createDictionaryValue(),
                stack.readCellOpt(),
            ),
        );

        const xPending = stack.readBigNumber();
        const yPending = stack.readBigNumber();
        const xFeePerTokenCheckpoint = Q120X120.create(stack.readBigNumber());
        const yFeePerTokenCheckpoint = Q120X120.create(stack.readBigNumber());

        return {
            poolAddress,
            ownerAddress,
            totalLiquidity,
            lockedLiquidity,
            rewards,
            xPending,
            yPending,
            xFeePerTokenCheckpoint,
            yFeePerTokenCheckpoint,
        };
    }

    async getAvailableFees(
        provider: ContractProvider,
        xFeePerToken: Q120X120,
        yFeePerToken: Q120X120,
    ) {
        const { stack } = await provider.get('get_available_fees', [
            {
                type: 'int',
                value: xFeePerToken.value,
            },
            {
                type: 'int',
                value: yFeePerToken.value,
            },
        ]);

        const xFee = stack.readBigNumber();
        const yFee = stack.readBigNumber();

        return {
            xFee,
            yFee,
        };
    }
}
