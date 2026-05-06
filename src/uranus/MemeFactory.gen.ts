// AUTO-GENERATED, do not edit
// it's a TypeScript wrapper for a MemeFactory contract in Tolk
// @ts-nocheck
/* eslint-disable */

import * as c from '@ton/core';
import { beginCell, ContractProvider, Sender, SendMode } from '@ton/core';

// ————————————————————————————————————————————
//   predefined types and functions
//

type StoreCallback<T> = (obj: T, b: c.Builder) => void;
type LoadCallback<T> = (s: c.Slice) => T;

export type CellRef<T> = {
    ref: T;
};

function makeCellFrom<T>(self: T, storeFn_T: StoreCallback<T>): c.Cell {
    let b = beginCell();
    storeFn_T(self, b);
    return b.endCell();
}

function loadAndCheckPrefix32(
    s: c.Slice,
    expected: number,
    structName: string,
): void {
    let prefix = s.loadUint(32);
    if (prefix !== expected) {
        throw new Error(
            `Incorrect prefix for '${structName}': expected 0x${expected.toString(16).padStart(8, '0')}, got 0x${prefix.toString(16).padStart(8, '0')}`,
        );
    }
}

function lookupPrefix(
    s: c.Slice,
    expected: number,
    prefixLen: number,
): boolean {
    return (
        s.remainingBits >= prefixLen && s.preloadUint(prefixLen) === expected
    );
}

function throwNonePrefixMatch(fieldPath: string): never {
    throw new Error(
        `Incorrect prefix for '${fieldPath}': none of variants matched`,
    );
}

function storeCellRef<T>(
    cell: CellRef<T>,
    b: c.Builder,
    storeFn_T: StoreCallback<T>,
): void {
    let b_ref = c.beginCell();
    storeFn_T(cell.ref, b_ref);
    b.storeRef(b_ref.endCell());
}

function loadCellRef<T>(s: c.Slice, loadFn_T: LoadCallback<T>): CellRef<T> {
    let s_ref = s.loadRef().beginParse();
    return { ref: loadFn_T(s_ref) };
}

function storeTolkNullable<T>(
    v: T | null,
    b: c.Builder,
    storeFn_T: StoreCallback<T>,
): void {
    if (v === null) {
        b.storeUint(0, 1);
    } else {
        b.storeUint(1, 1);
        storeFn_T(v, b);
    }
}

// ————————————————————————————————————————————
//   parse get methods result from a TVM stack
//

class StackReader {
    constructor(private tuple: c.TupleItem[]) {}

    static fromGetMethod(
        expectedN: number,
        getMethodResult: { stack: c.TupleReader },
    ): StackReader {
        let tuple = [] as c.TupleItem[];
        while (getMethodResult.stack.remaining) {
            tuple.push(getMethodResult.stack.pop());
        }
        if (tuple.length !== expectedN) {
            throw new Error(
                `expected ${expectedN} stack width, got ${tuple.length}`,
            );
        }
        return new StackReader(tuple);
    }

    private popExpecting<ItemT>(itemType: string): ItemT {
        const item = this.tuple.shift();
        if (item?.type === itemType) {
            return item as ItemT;
        }
        throw new Error(`not '${itemType}' on a stack`);
    }

    private popCellLike(): c.Cell {
        const item = this.tuple.shift();
        if (
            item &&
            (item.type === 'cell' ||
                item.type === 'slice' ||
                item.type === 'builder')
        ) {
            return item.cell;
        }
        throw new Error(`not cell/slice on a stack`);
    }

    readBigInt(): bigint {
        return this.popExpecting<c.TupleItemInt>('int').value;
    }

    readBoolean(): boolean {
        return this.popExpecting<c.TupleItemInt>('int').value !== 0n;
    }

    readCell(): c.Cell {
        return this.popCellLike();
    }

    readSlice(): c.Slice {
        return this.popCellLike().beginParse();
    }
}

// ————————————————————————————————————————————
//   auto-generated serializers to/from cells
//

type coins = bigint;

type int8 = bigint;
type int16 = bigint;
type int32 = bigint;
type int256 = bigint;

type uint4 = bigint;
type uint8 = bigint;
type uint16 = bigint;
type uint32 = bigint;
type uint64 = bigint;
type uint256 = bigint;

/**
 > type MemeFactoryIncomingMessage = DeployMemeMessage
 */
export type MemeFactoryIncomingMessage = DeployMemeMessage;

export const MemeFactoryIncomingMessage = {
    fromSlice(s: c.Slice): MemeFactoryIncomingMessage {
        return DeployMemeMessage.fromSlice(s);
    },
    store(self: MemeFactoryIncomingMessage, b: c.Builder): void {
        DeployMemeMessage.store(self, b);
    },
    toCell(self: MemeFactoryIncomingMessage): c.Cell {
        return makeCellFrom<MemeFactoryIncomingMessage>(
            self,
            MemeFactoryIncomingMessage.store,
        );
    },
};

/**
 > struct MemeMetadata {
 >     uri: string
 > }
 */
export interface MemeMetadata {
    readonly $: 'MemeMetadata';
    uri: string;
}

export const MemeMetadata = {
    create(args: { uri: string }): MemeMetadata {
        return {
            $: 'MemeMetadata',
            ...args,
        };
    },
    fromSlice(s: c.Slice): MemeMetadata {
        return {
            $: 'MemeMetadata',
            uri: s.loadStringRefTail(),
        };
    },
    store(self: MemeMetadata, b: c.Builder): void {
        b.storeStringRefTail(self.uri);
    },
    toCell(self: MemeMetadata): c.Cell {
        return makeCellFrom<MemeMetadata>(self, MemeMetadata.store);
    },
};

/**
 > struct PartnerConfig {
 >     partnerId: uint256
 >     partnerFeeBps: uint16
 > }
 */
export interface PartnerConfig {
    readonly $: 'PartnerConfig';
    partnerId: uint256;
    partnerFeeBps: uint16;
}

export const PartnerConfig = {
    create(args: { partnerId: uint256; partnerFeeBps: uint16 }): PartnerConfig {
        return {
            $: 'PartnerConfig',
            ...args,
        };
    },
    fromSlice(s: c.Slice): PartnerConfig {
        return {
            $: 'PartnerConfig',
            partnerId: s.loadUintBig(256),
            partnerFeeBps: s.loadUintBig(16),
        };
    },
    store(self: PartnerConfig, b: c.Builder): void {
        b.storeUint(self.partnerId, 256);
        b.storeUint(self.partnerFeeBps, 16);
    },
    toCell(self: PartnerConfig): c.Cell {
        return makeCellFrom<PartnerConfig>(self, PartnerConfig.store);
    },
};

/**
 > struct ReferrerConfig {
 >     referrerId: uint256
 >     referrerFeeBps: uint16
 > }
 */
export interface ReferrerConfig {
    readonly $: 'ReferrerConfig';
    referrerId: uint256;
    referrerFeeBps: uint16;
}

export const ReferrerConfig = {
    create(args: {
        referrerId: uint256;
        referrerFeeBps: uint16;
    }): ReferrerConfig {
        return {
            $: 'ReferrerConfig',
            ...args,
        };
    },
    fromSlice(s: c.Slice): ReferrerConfig {
        return {
            $: 'ReferrerConfig',
            referrerId: s.loadUintBig(256),
            referrerFeeBps: s.loadUintBig(16),
        };
    },
    store(self: ReferrerConfig, b: c.Builder): void {
        b.storeUint(self.referrerId, 256);
        b.storeUint(self.referrerFeeBps, 16);
    },
    toCell(self: ReferrerConfig): c.Cell {
        return makeCellFrom<ReferrerConfig>(self, ReferrerConfig.store);
    },
};

/**
 > struct (0x796f5a0c) InitMemeMessage {
 >     queryId: uint64
 >     initialBuy: coins
 >     partnerConfig: PartnerConfig?
 >     referrerConfig: ReferrerConfig?
 > }
 */
export interface InitMemeMessage {
    readonly $: 'InitMemeMessage';
    queryId: uint64;
    initialBuy: coins;
    partnerConfig: PartnerConfig | null;
    referrerConfig: ReferrerConfig | null;
}

export const InitMemeMessage = {
    PREFIX: 0x796f5a0c,

    create(args: {
        queryId: uint64;
        initialBuy: coins;
        partnerConfig: PartnerConfig | null;
        referrerConfig: ReferrerConfig | null;
    }): InitMemeMessage {
        return {
            $: 'InitMemeMessage',
            ...args,
        };
    },
    fromSlice(s: c.Slice): InitMemeMessage {
        loadAndCheckPrefix32(s, 0x796f5a0c, 'InitMemeMessage');
        return {
            $: 'InitMemeMessage',
            queryId: s.loadUintBig(64),
            initialBuy: s.loadCoins(),
            partnerConfig: s.loadBoolean() ? PartnerConfig.fromSlice(s) : null,
            referrerConfig: s.loadBoolean()
                ? ReferrerConfig.fromSlice(s)
                : null,
        };
    },
    store(self: InitMemeMessage, b: c.Builder): void {
        b.storeUint(0x796f5a0c, 32);
        b.storeUint(self.queryId, 64);
        b.storeCoins(self.initialBuy);
        storeTolkNullable<PartnerConfig>(
            self.partnerConfig,
            b,
            PartnerConfig.store,
        );
        storeTolkNullable<ReferrerConfig>(
            self.referrerConfig,
            b,
            ReferrerConfig.store,
        );
    },
    toCell(self: InitMemeMessage): c.Cell {
        return makeCellFrom<InitMemeMessage>(self, InitMemeMessage.store);
    },
};

/**
 > struct MemeFactoryStorage {
 >     controllerAddress: address
 > }
 */
export interface MemeFactoryStorage {
    readonly $: 'MemeFactoryStorage';
    controllerAddress: c.Address;
}

export const MemeFactoryStorage = {
    create(args: { controllerAddress: c.Address }): MemeFactoryStorage {
        return {
            $: 'MemeFactoryStorage',
            ...args,
        };
    },
    fromSlice(s: c.Slice): MemeFactoryStorage {
        return {
            $: 'MemeFactoryStorage',
            controllerAddress: s.loadAddress(),
        };
    },
    store(self: MemeFactoryStorage, b: c.Builder): void {
        b.storeAddress(self.controllerAddress);
    },
    toCell(self: MemeFactoryStorage): c.Cell {
        return makeCellFrom<MemeFactoryStorage>(self, MemeFactoryStorage.store);
    },
};

/**
 > struct (0x6ff416dc) DeployMemeMessage {
 >     queryId: uint64
 >     presetId: uint4
 >     metadata: MemeMetadata
 >     initialBuy: coins
 >     partnerConfig: PartnerConfig?
 >     referrerConfig: ReferrerConfig?
 > }
 */
export interface DeployMemeMessage {
    readonly $: 'DeployMemeMessage';
    queryId: uint64;
    presetId: uint4;
    metadata: MemeMetadata;
    initialBuy: coins;
    partnerConfig: PartnerConfig | null;
    referrerConfig: ReferrerConfig | null;
}

export const DeployMemeMessage = {
    PREFIX: 0x6ff416dc,

    create(args: {
        queryId: uint64;
        presetId: uint4;
        metadata: MemeMetadata;
        initialBuy: coins;
        partnerConfig: PartnerConfig | null;
        referrerConfig: ReferrerConfig | null;
    }): DeployMemeMessage {
        return {
            $: 'DeployMemeMessage',
            ...args,
        };
    },
    fromSlice(s: c.Slice): DeployMemeMessage {
        loadAndCheckPrefix32(s, 0x6ff416dc, 'DeployMemeMessage');
        return {
            $: 'DeployMemeMessage',
            queryId: s.loadUintBig(64),
            presetId: s.loadUintBig(4),
            metadata: MemeMetadata.fromSlice(s),
            initialBuy: s.loadCoins(),
            partnerConfig: s.loadBoolean() ? PartnerConfig.fromSlice(s) : null,
            referrerConfig: s.loadBoolean()
                ? ReferrerConfig.fromSlice(s)
                : null,
        };
    },
    store(self: DeployMemeMessage, b: c.Builder): void {
        b.storeUint(0x6ff416dc, 32);
        b.storeUint(self.queryId, 64);
        b.storeUint(self.presetId, 4);
        MemeMetadata.store(self.metadata, b);
        b.storeCoins(self.initialBuy);
        storeTolkNullable<PartnerConfig>(
            self.partnerConfig,
            b,
            PartnerConfig.store,
        );
        storeTolkNullable<ReferrerConfig>(
            self.referrerConfig,
            b,
            ReferrerConfig.store,
        );
    },
    toCell(self: DeployMemeMessage): c.Cell {
        return makeCellFrom<DeployMemeMessage>(self, DeployMemeMessage.store);
    },
};

// ————————————————————————————————————————————
//    class MemeFactory
//

interface ExtraSendOptions {
    bounce?: boolean; // default: false
    sendMode?: SendMode; // default: SendMode.PAY_GAS_SEPARATELY
    extraCurrencies?: c.ExtraCurrency; // default: empty dict
}

interface DeployedAddrOptions {
    workchain?: number; // default: 0 (basechain)
    toShard?: { fixedPrefixLength: number; closeTo: c.Address };
    overrideContractCode?: c.Cell;
}

function calculateDeployedAddress(
    code: c.Cell,
    data: c.Cell,
    options: DeployedAddrOptions,
): c.Address {
    const stateInitCell = beginCell()
        .store(
            c.storeStateInit({
                code,
                data,
                splitDepth: options.toShard?.fixedPrefixLength,
                special: null,
                libraries: null,
            }),
        )
        .endCell();

    let addrHash = stateInitCell.hash();
    if (options.toShard) {
        const shardDepth = options.toShard.fixedPrefixLength;
        addrHash = beginCell()
            .storeBits(
                new c.BitString(options.toShard.closeTo.hash, 0, shardDepth),
            )
            .storeBits(
                new c.BitString(
                    stateInitCell.hash(),
                    shardDepth,
                    256 - shardDepth,
                ),
            )
            .endCell()
            .beginParse()
            .loadBuffer(32);
    }

    return new c.Address(options.workchain ?? 0, addrHash);
}

export class MemeFactory implements c.Contract {
    static CodeCell = c.Cell.fromBase64(
        'te6ccgECCQEAAnoAART/APSkE/S88sgLAQT40/iR8kCEDwHXLCN/oLbkEvL00z/TA9T6ANMAAZfT/9MPgQCBlG1tWHDiAdMAAZfT/9MPgQCClG1tWHDiAdHtRND6SNEnwgCOHPgsgSfucPg2oIIImJaAoIE/lHD4NqD4k3D4OqDjDfiXu/KXKcAD4w9Tsrnymvgl+BX4EAIDBAUAevgsgSfucPg2oIIImJaAoIFX3HD4NqCBJEJw+Dagc4EDLHD4PKBzgQPKghAJZgGAcPg3oPiTcPg6qgCgKKAASjmCMA3gtrOnZAAAgjALGivC7FAAAIIY6NSlEACCGAukO3QAgGQAtCnABI4mOYIwDeC2s6dkAACCMAsaK8LsUAAAghjo1KUQAIIYC6Q7dACBASyOLAnABZLyFuGCMA3gtrOnZAAAgjALGivC7FAAAIIY6NSlEACCGAukO3QAgQH04gP4q3+I+JKCKsaK8LsUAAAByPpSARERAfpSH8wk+gJQD/oCHst/ySRVIS7bPMjPhIAXzAEREAHLDxTKAFj6AgH6AgH6AlAL+gJQCvoCUAn6As+EAsl4+CjIz5HlvWgyHMs/UAj6AgTAAJU0NAHPgZoDz4MVy/8Tyw8S4gbAAAYHCAhCAkWtDW4Y0bc5Z5IA2j1D4VfPpbBo5HXHgWUsGUxg0D/PAHQwXbzylFEyoVIUoFMiqFRiUamEVCI1qYQhoVEzqQRREKhQA6kEIsIAlSDCAMMAkXDi8pRwcFQUABAkAI6VMDEDz4GYBc+DFcv/yw/iycjPiQgBVHQyyM+DywTPhaDMzPkWhPewBoALJNckMxLOFMv3gRUNzwt5zMzMyfgsdPsCgwb7AA==',
    );

    static Errors = {
        'ErrorCode.BondingCurveParametersMalformed': 20,
        'ErrorCode.SlippageExceeded': 21,
        'ErrorCode.PresetNotExist': 22,
        'ErrorCode.MessageValueTooLow': 23,
        'ErrorCode.InitialBuyLimitExceeded': 26,
        'ErrorCode.UnknownOperation': 65535,
    };

    readonly address: c.Address;
    readonly init?: { code: c.Cell; data: c.Cell };

    private constructor(
        address: c.Address,
        init?: { code: c.Cell; data: c.Cell },
    ) {
        this.address = address;
        this.init = init;
    }

    static fromAddress(address: c.Address) {
        return new MemeFactory(address);
    }

    static fromStorage(
        emptyStorage: {
            controllerAddress: c.Address;
        },
        deployedOptions?: DeployedAddrOptions,
    ) {
        const initialState = {
            code: deployedOptions?.overrideContractCode ?? MemeFactory.CodeCell,
            data: MemeFactoryStorage.toCell(
                MemeFactoryStorage.create(emptyStorage),
            ),
        };
        const address = calculateDeployedAddress(
            initialState.code,
            initialState.data,
            deployedOptions ?? {},
        );
        return new MemeFactory(address, initialState);
    }

    static createCellOfMemeFactoryIncomingMessage(
        body: MemeFactoryIncomingMessage,
    ) {
        return MemeFactoryIncomingMessage.toCell(body);
    }

    async sendDeploy(
        provider: ContractProvider,
        via: Sender,
        msgValue: coins,
        extraOptions?: ExtraSendOptions,
    ) {
        return provider.internal(via, {
            value: msgValue,
            body: c.Cell.EMPTY,
            ...extraOptions,
        });
    }

    async sendMemeFactoryIncomingMessage(
        provider: ContractProvider,
        via: Sender,
        msgValue: coins,
        body: MemeFactoryIncomingMessage,
        extraOptions?: ExtraSendOptions,
    ) {
        return provider.internal(via, {
            value: msgValue,
            body: MemeFactoryIncomingMessage.toCell(body),
            ...extraOptions,
        });
    }
}
