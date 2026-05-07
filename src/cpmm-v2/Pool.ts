import {
    Address,
    beginCell,
    Cell,
    CellType,
    Contract,
    type ContractProvider,
    Dictionary,
    type DictionaryKey,
    type Sender,
    toNano,
} from '@ton/core';
import { Position } from './Position';
import {
    Asset,
    BasicPayoutConfig,
    ClaimPositionFees,
    Init,
    PayNative,
    PoolConfig,
    PoolReward,
    PoolStorage,
    Q120X120,
} from './abi';
import { PoolStatusCode } from './consts';
import { Withdraw } from './abi/messages/Withdraw';
import { contractAddress, StateInit } from '@ton/ton';

export interface PoolData {
    status: PoolStatusCode;
    depositActive: boolean;
    swapActive: boolean;
    assetX: Asset;
    assetY: Asset;
    walletsByAssets: Map<Address, Address>;
    assetsByWallets: Map<Address, Asset>;
    walletsResolutions: Map<Address, Address>;
    baseFeeBPS: number;
    reserveX: bigint;
    reserveY: bigint;
    liquidity: bigint;
    protocolFeeX: bigint;
    protocolFeeY: bigint;
    creatorFeeX: bigint;
    creatorFeeY: bigint;
    xFeePerLiquidity: Q120X120;
    yFeePerLiquidity: Q120X120;
    rewards: Map<number, PoolReward>;
}

export abstract class Pool implements Contract {
    protected constructor(
        readonly address: Address,
        readonly init?: StateInit,
    ) {}

    async getFullState(provider: ContractProvider) {
        const state = await provider.getState();

        if (
            state.state.type !== 'active' ||
            !state.state.code ||
            !state.state.data
        ) {
            throw new Error('Not an active pool.');
        }

        const code = Cell.fromBoc(state.state.code)[0]!;
        const data = Cell.fromBoc(state.state.data)[0]!;

        let codeHash: Buffer;
        switch (code.type) {
            case CellType.Ordinary:
                codeHash = code.hash();
                break;
            case CellType.Library:
                codeHash = code.beginParse(true).skip(8).loadBuffer(32);
                break;
            default:
                throw new Error('Cell type not supported.');
        }

        return {
            codeHash,
            storage: PoolStorage.fromCell(data),
        };
    }

    async getData(provider: ContractProvider): Promise<PoolData> {
        const { stack } = await provider.get('get_pool_data', []);

        const status = stack.readNumber();
        const depositActive = stack.readBoolean();
        const swapActive = stack.readBoolean();
        const assetX = Asset.fromCell(stack.readCell());
        const assetY = Asset.fromCell(stack.readCell());

        const addressHashAsDictionaryKey: DictionaryKey<Address> = {
            bits: 256,
            serialize: (src: Address) =>
                BigInt(`0x${src.hash.toString('hex')}`),
            parse: (src: bigint) =>
                Address.parse(`0:${src.toString(16).padStart(64, '0')}`),
        };

        const walletsByAssets = new Map(
            Dictionary.loadDirect(
                addressHashAsDictionaryKey,
                Dictionary.Values.Address(),
                stack.readCellOpt(),
            ),
        );

        const assetsByWallets = new Map(
            Dictionary.loadDirect(
                addressHashAsDictionaryKey,
                Asset.createDictionaryValue(),
                stack.readCellOpt(),
            ),
        );

        const walletsResolutions = new Map(
            Dictionary.loadDirect(
                addressHashAsDictionaryKey,
                Dictionary.Values.Address(),
                stack.readCellOpt(),
            ),
        );

        const baseFeeBPS = stack.readNumber();
        const reserveX = stack.readBigNumber();
        const reserveY = stack.readBigNumber();
        const liquidity = stack.readBigNumber();
        const protocolFeeX = stack.readBigNumber();
        const protocolFeeY = stack.readBigNumber();
        const creatorFeeX = stack.readBigNumber();
        const creatorFeeY = stack.readBigNumber();
        const xFeePerLiquidity = Q120X120.create(stack.readBigNumber());
        const yFeePerLiquidity = Q120X120.create(stack.readBigNumber());

        const rewards = new Map(
            Dictionary.loadDirect(
                Dictionary.Keys.Uint(2),
                PoolReward.createDictionaryValue(),
                stack.readCellOpt(),
            ),
        );

        return {
            status,
            depositActive,
            swapActive,
            assetX,
            assetY,
            walletsByAssets,
            assetsByWallets,
            walletsResolutions,
            baseFeeBPS,
            reserveX,
            reserveY,
            liquidity,
            protocolFeeX,
            protocolFeeY,
            creatorFeeX,
            creatorFeeY,
            xFeePerLiquidity,
            yFeePerLiquidity,
            rewards,
        };
    }

    async getPosition(
        provider: ContractProvider,
        ownerAddress: Address,
    ): Promise<Position> {
        const { stack } = await provider.get('get_position_address', [
            {
                type: 'slice',
                cell: beginCell().storeAddress(ownerAddress).endCell(),
            },
        ]);

        return new Position(stack.readAddress());
    }

    async sendPayNative(
        provider: ContractProvider,
        via: Sender,
        input: PayNative.Input,
        extraGas?: bigint,
    ) {
        await provider.internal(via, {
            value: (extraGas ?? toNano('0.15')) + input.amount,
            body: PayNative.createCell(input),
        });
    }

    async sendInit(
        provider: ContractProvider,
        via: Sender,
        {
            queryId,
            customPayload,
        }: {
            queryId?: bigint;
            customPayload?: Cell | null;
        } = {},
        extraGas?: bigint,
    ) {
        await provider.internal(via, {
            value: extraGas ?? toNano('0.25'),
            body: Init.createCell({
                queryId,
                customPayload,
            } as Init.Input),
        });
    }

    async sendClaimPositionFees(
        provider: ContractProvider,
        via: Sender,
        { queryId, excessesTo }: { queryId?: bigint; excessesTo: Address },
    ) {
        await provider.internal(via, {
            value: toNano('0.15'),
            body: ClaimPositionFees.toCell(
                ClaimPositionFees.create({
                    queryId: queryId ?? 0n,
                    excessesTo,
                }),
            ),
        });
    }

    async sendWithdraw(
        provider: ContractProvider,
        via: Sender,
        {
            queryId,
            liquidity,
            minimalXOut,
            minimalYOut,
            autoClaimFees,
            payoutConfig,
        }: {
            queryId?: bigint;
            liquidity: bigint;
            minimalXOut?: bigint;
            minimalYOut?: bigint;
            autoClaimFees?: boolean;
            payoutConfig?: BasicPayoutConfig;
        },
    ) {
        await provider.internal(via, {
            value: toNano('0.15'),
            body: Withdraw.createCell({
                queryId,
                liquidity,
                minimalXOut,
                minimalYOut,
                autoClaimFees,
                payoutConfig,
            } as Withdraw.Input),
        });
    }
}
