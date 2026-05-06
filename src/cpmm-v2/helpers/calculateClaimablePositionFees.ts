import { PositionData } from '../Position';
import { PoolData } from '../Pool';
import { Q120X120 } from '../abi';

export const calculateClaimablePositionFees = (
    poolData: Pick<PoolData, 'xFeePerLiquidity' | 'yFeePerLiquidity'>,
    positionData: Pick<
        PositionData,
        | 'totalLiquidity'
        | 'xPending'
        | 'xFeePerTokenCheckpoint'
        | 'yPending'
        | 'yFeePerTokenCheckpoint'
    >,
) => ({
    xFee:
        positionData.xPending +
        Q120X120.mul(
            Q120X120.sub(
                poolData.xFeePerLiquidity,
                positionData.xFeePerTokenCheckpoint,
            ),
            positionData.totalLiquidity,
        ),
    yFee:
        positionData.yPending +
        Q120X120.mul(
            Q120X120.sub(
                poolData.yFeePerLiquidity,
                positionData.yFeePerTokenCheckpoint,
            ),
            positionData.totalLiquidity,
        ),
});
