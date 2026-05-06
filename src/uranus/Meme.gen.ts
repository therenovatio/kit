// AUTO-GENERATED, do not edit
// it's a TypeScript wrapper for a Meme contract in Tolk
// @ts-nocheck
/* eslint-disable */

import * as c from '@ton/core';
import { beginCell, ContractProvider, Sender, SendMode } from '@ton/core';

// ————————————————————————————————————————————
//   predefined types and functions
//

type RemainingBitsAndRefs = c.Slice;

export type any_address = c.Address | c.ExternalAddress | 'none';

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

function storeTolkAddressAny(a: any_address, b: c.Builder): void {
    let maybe_addr = a === 'none' ? null : a;
    b.storeAddress(maybe_addr);
}

function loadTolkAddressAny(s: c.Slice): any_address {
    let maybe_addr = s.loadAddressAny();
    return maybe_addr === null ? 'none' : maybe_addr;
}

function storeTolkRemaining(v: RemainingBitsAndRefs, b: c.Builder): void {
    b.storeSlice(v);
}

function loadTolkRemaining(s: c.Slice): RemainingBitsAndRefs {
    let rest = s.clone();
    s.loadBits(s.remainingBits);
    while (s.remainingRefs) {
        s.loadRef();
    }
    return rest;
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

type uint8 = bigint;
type uint16 = bigint;
type uint32 = bigint;
type uint64 = bigint;
type uint128 = bigint;
type uint256 = bigint;

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
 > struct MemeConfig {
 >     creatorAddress: address
 >     controllerAddress: address
 >     metadata: MemeMetadata
 >     raisingFunds: coins
 >     liquidityTokens: coins
 >     seed: uint128
 > }
 */
export interface MemeConfig {
    readonly $: 'MemeConfig';
    creatorAddress: c.Address;
    controllerAddress: c.Address;
    metadata: MemeMetadata;
    raisingFunds: coins;
    liquidityTokens: coins;
    seed: uint128; /* = 0 */
}

export const MemeConfig = {
    create(args: {
        creatorAddress: c.Address;
        controllerAddress: c.Address;
        metadata: MemeMetadata;
        raisingFunds: coins;
        liquidityTokens: coins;
        seed?: uint128; /* = 0 */
    }): MemeConfig {
        return {
            $: 'MemeConfig',
            seed: 0n,
            ...args,
        };
    },
    fromSlice(s: c.Slice): MemeConfig {
        return {
            $: 'MemeConfig',
            creatorAddress: s.loadAddress(),
            controllerAddress: s.loadAddress(),
            metadata: MemeMetadata.fromSlice(s),
            raisingFunds: s.loadCoins(),
            liquidityTokens: s.loadCoins(),
            seed: s.loadUintBig(128),
        };
    },
    store(self: MemeConfig, b: c.Builder): void {
        b.storeAddress(self.creatorAddress);
        b.storeAddress(self.controllerAddress);
        MemeMetadata.store(self.metadata, b);
        b.storeCoins(self.raisingFunds);
        b.storeCoins(self.liquidityTokens);
        b.storeUint(self.seed, 128);
    },
    toCell(self: MemeConfig): c.Cell {
        return makeCellFrom<MemeConfig>(self, MemeConfig.store);
    },
};

/**
 > struct BondingCurve {
 >     graduated: bool
 >     alpha: coins
 >     beta: coins
 >     onSellSupply: coins
 >     raisedFunds: coins
 >     currentSupply: coins
 > }
 */
export interface BondingCurve {
    readonly $: 'BondingCurve';
    graduated: boolean; /* = false */
    alpha: coins;
    beta: coins;
    onSellSupply: coins;
    raisedFunds: coins; /* = 0 */
    currentSupply: coins; /* = 0 */
}

export const BondingCurve = {
    create(args: {
        graduated?: boolean; /* = false */
        alpha: coins;
        beta: coins;
        onSellSupply: coins;
        raisedFunds?: coins; /* = 0 */
        currentSupply?: coins; /* = 0 */
    }): BondingCurve {
        return {
            $: 'BondingCurve',
            graduated: false,
            raisedFunds: 0n,
            currentSupply: 0n,
            ...args,
        };
    },
    fromSlice(s: c.Slice): BondingCurve {
        return {
            $: 'BondingCurve',
            graduated: s.loadBoolean(),
            alpha: s.loadCoins(),
            beta: s.loadCoins(),
            onSellSupply: s.loadCoins(),
            raisedFunds: s.loadCoins(),
            currentSupply: s.loadCoins(),
        };
    },
    store(self: BondingCurve, b: c.Builder): void {
        b.storeBit(self.graduated);
        b.storeCoins(self.alpha);
        b.storeCoins(self.beta);
        b.storeCoins(self.onSellSupply);
        b.storeCoins(self.raisedFunds);
        b.storeCoins(self.currentSupply);
    },
    toCell(self: BondingCurve): c.Cell {
        return makeCellFrom<BondingCurve>(self, BondingCurve.store);
    },
};

/**
 > struct MemeStorage {
 >     initialized: bool
 >     migrated: bool
 >     config: Cell<MemeConfig>
 >     baseFeeBps: uint16
 >     curve: BondingCurve
 >     totalSupply: coins
 >     creatorFee: coins
 >     protocolFee: coins
 > }
 */
export interface MemeStorage {
    readonly $: 'MemeStorage';
    initialized: boolean; /* = false */
    migrated: boolean; /* = false */
    config: CellRef<MemeConfig>;
    baseFeeBps: uint16;
    curve: BondingCurve;
    totalSupply: coins; /* = 0 */
    creatorFee: coins; /* = 0 */
    protocolFee: coins; /* = 0 */
}

export const MemeStorage = {
    create(args: {
        initialized?: boolean; /* = false */
        migrated?: boolean; /* = false */
        config: CellRef<MemeConfig>;
        baseFeeBps: uint16;
        curve: BondingCurve;
        totalSupply?: coins; /* = 0 */
        creatorFee?: coins; /* = 0 */
        protocolFee?: coins; /* = 0 */
    }): MemeStorage {
        return {
            $: 'MemeStorage',
            initialized: false,
            migrated: false,
            totalSupply: 0n,
            creatorFee: 0n,
            protocolFee: 0n,
            ...args,
        };
    },
    fromSlice(s: c.Slice): MemeStorage {
        return {
            $: 'MemeStorage',
            initialized: s.loadBoolean(),
            migrated: s.loadBoolean(),
            config: loadCellRef<MemeConfig>(s, MemeConfig.fromSlice),
            baseFeeBps: s.loadUintBig(16),
            curve: BondingCurve.fromSlice(s),
            totalSupply: s.loadCoins(),
            creatorFee: s.loadCoins(),
            protocolFee: s.loadCoins(),
        };
    },
    store(self: MemeStorage, b: c.Builder): void {
        b.storeBit(self.initialized);
        b.storeBit(self.migrated);
        storeCellRef<MemeConfig>(self.config, b, MemeConfig.store);
        b.storeUint(self.baseFeeBps, 16);
        BondingCurve.store(self.curve, b);
        b.storeCoins(self.totalSupply);
        b.storeCoins(self.creatorFee);
        b.storeCoins(self.protocolFee);
    },
    toCell(self: MemeStorage): c.Cell {
        return makeCellFrom<MemeStorage>(self, MemeStorage.store);
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
 > struct (0x94826557) BuyMessage {
 >     queryId: uint64
 >     amount: coins
 >     minimalAmountOut: coins
 >     excessesTo: address
 >     partnerConfig: Cell<PartnerConfig>?
 >     referrerConfig: Cell<ReferrerConfig>?
 > }
 */
export interface BuyMessage {
    readonly $: 'BuyMessage';
    queryId: uint64;
    amount: coins;
    minimalAmountOut: coins;
    excessesTo: c.Address;
    partnerConfig: CellRef<PartnerConfig> | null;
    referrerConfig: CellRef<ReferrerConfig> | null;
}

export const BuyMessage = {
    PREFIX: 0x94826557,

    create(args: {
        queryId: uint64;
        amount: coins;
        minimalAmountOut: coins;
        excessesTo: c.Address;
        partnerConfig: CellRef<PartnerConfig> | null;
        referrerConfig: CellRef<ReferrerConfig> | null;
    }): BuyMessage {
        return {
            $: 'BuyMessage',
            ...args,
        };
    },
    fromSlice(s: c.Slice): BuyMessage {
        loadAndCheckPrefix32(s, 0x94826557, 'BuyMessage');
        return {
            $: 'BuyMessage',
            queryId: s.loadUintBig(64),
            amount: s.loadCoins(),
            minimalAmountOut: s.loadCoins(),
            excessesTo: s.loadAddress(),
            partnerConfig: s.loadBoolean()
                ? loadCellRef<PartnerConfig>(s, PartnerConfig.fromSlice)
                : null,
            referrerConfig: s.loadBoolean()
                ? loadCellRef<ReferrerConfig>(s, ReferrerConfig.fromSlice)
                : null,
        };
    },
    store(self: BuyMessage, b: c.Builder): void {
        b.storeUint(0x94826557, 32);
        b.storeUint(self.queryId, 64);
        b.storeCoins(self.amount);
        b.storeCoins(self.minimalAmountOut);
        b.storeAddress(self.excessesTo);
        storeTolkNullable<CellRef<PartnerConfig>>(
            self.partnerConfig,
            b,
            (v, b) => storeCellRef<PartnerConfig>(v, b, PartnerConfig.store),
        );
        storeTolkNullable<CellRef<ReferrerConfig>>(
            self.referrerConfig,
            b,
            (v, b) => storeCellRef<ReferrerConfig>(v, b, ReferrerConfig.store),
        );
    },
    toCell(self: BuyMessage): c.Cell {
        return makeCellFrom<BuyMessage>(self, BuyMessage.store);
    },
};

/**
 > struct (0x646ad424) SellMessage {
 >     queryId: uint64
 >     amount: coins
 >     minimalAmountOut: coins
 >     from: address
 >     excessesTo: address?
 >     partnerConfig: Cell<PartnerConfig>?
 >     referrerConfig: Cell<ReferrerConfig>?
 > }
 */
export interface SellMessage {
    readonly $: 'SellMessage';
    queryId: uint64;
    amount: coins;
    minimalAmountOut: coins;
    from: c.Address;
    excessesTo: c.Address | null;
    partnerConfig: CellRef<PartnerConfig> | null;
    referrerConfig: CellRef<ReferrerConfig> | null;
}

export const SellMessage = {
    PREFIX: 0x646ad424,

    create(args: {
        queryId: uint64;
        amount: coins;
        minimalAmountOut: coins;
        from: c.Address;
        excessesTo: c.Address | null;
        partnerConfig: CellRef<PartnerConfig> | null;
        referrerConfig: CellRef<ReferrerConfig> | null;
    }): SellMessage {
        return {
            $: 'SellMessage',
            ...args,
        };
    },
    fromSlice(s: c.Slice): SellMessage {
        loadAndCheckPrefix32(s, 0x646ad424, 'SellMessage');
        return {
            $: 'SellMessage',
            queryId: s.loadUintBig(64),
            amount: s.loadCoins(),
            minimalAmountOut: s.loadCoins(),
            from: s.loadAddress(),
            excessesTo: s.loadMaybeAddress(),
            partnerConfig: s.loadBoolean()
                ? loadCellRef<PartnerConfig>(s, PartnerConfig.fromSlice)
                : null,
            referrerConfig: s.loadBoolean()
                ? loadCellRef<ReferrerConfig>(s, ReferrerConfig.fromSlice)
                : null,
        };
    },
    store(self: SellMessage, b: c.Builder): void {
        b.storeUint(0x646ad424, 32);
        b.storeUint(self.queryId, 64);
        b.storeCoins(self.amount);
        b.storeCoins(self.minimalAmountOut);
        b.storeAddress(self.from);
        b.storeAddress(self.excessesTo);
        storeTolkNullable<CellRef<PartnerConfig>>(
            self.partnerConfig,
            b,
            (v, b) => storeCellRef<PartnerConfig>(v, b, PartnerConfig.store),
        );
        storeTolkNullable<CellRef<ReferrerConfig>>(
            self.referrerConfig,
            b,
            (v, b) => storeCellRef<ReferrerConfig>(v, b, ReferrerConfig.store),
        );
    },
    toCell(self: SellMessage): c.Cell {
        return makeCellFrom<SellMessage>(self, SellMessage.store);
    },
};

/**
 > struct (0x2c76b973) RequestWalletAddressMessage {
 >     queryId: uint64
 >     ownerAddress: any_address
 >     includeOwnerAddress: bool
 > }
 */
export interface RequestWalletAddressMessage {
    readonly $: 'RequestWalletAddressMessage';
    queryId: uint64;
    ownerAddress: any_address;
    includeOwnerAddress: boolean; /* = false */
}

export const RequestWalletAddressMessage = {
    PREFIX: 0x2c76b973,

    create(args: {
        queryId: uint64;
        ownerAddress: any_address;
        includeOwnerAddress?: boolean; /* = false */
    }): RequestWalletAddressMessage {
        return {
            $: 'RequestWalletAddressMessage',
            includeOwnerAddress: false,
            ...args,
        };
    },
    fromSlice(s: c.Slice): RequestWalletAddressMessage {
        loadAndCheckPrefix32(s, 0x2c76b973, 'RequestWalletAddressMessage');
        return {
            $: 'RequestWalletAddressMessage',
            queryId: s.loadUintBig(64),
            ownerAddress: loadTolkAddressAny(s),
            includeOwnerAddress: s.loadBoolean(),
        };
    },
    store(self: RequestWalletAddressMessage, b: c.Builder): void {
        b.storeUint(0x2c76b973, 32);
        b.storeUint(self.queryId, 64);
        storeTolkAddressAny(self.ownerAddress, b);
        b.storeBit(self.includeOwnerAddress);
    },
    toCell(self: RequestWalletAddressMessage): c.Cell {
        return makeCellFrom<RequestWalletAddressMessage>(
            self,
            RequestWalletAddressMessage.store,
        );
    },
};

/**
 > struct (0xd1735400) ReplyWalletAddressMessage {
 >     queryId: uint64
 >     walletAddress: address?
 >     ownerAddress: Cell<any_address>?
 > }
 */
export interface ReplyWalletAddressMessage {
    readonly $: 'ReplyWalletAddressMessage';
    queryId: uint64;
    walletAddress: c.Address | null;
    ownerAddress: CellRef<any_address> | null;
}

export const ReplyWalletAddressMessage = {
    PREFIX: 0xd1735400,

    create(args: {
        queryId: uint64;
        walletAddress: c.Address | null;
        ownerAddress: CellRef<any_address> | null;
    }): ReplyWalletAddressMessage {
        return {
            $: 'ReplyWalletAddressMessage',
            ...args,
        };
    },
    fromSlice(s: c.Slice): ReplyWalletAddressMessage {
        loadAndCheckPrefix32(s, 0xd1735400, 'ReplyWalletAddressMessage');
        return {
            $: 'ReplyWalletAddressMessage',
            queryId: s.loadUintBig(64),
            walletAddress: s.loadMaybeAddress(),
            ownerAddress: s.loadBoolean()
                ? loadCellRef<any_address>(s, loadTolkAddressAny)
                : null,
        };
    },
    store(self: ReplyWalletAddressMessage, b: c.Builder): void {
        b.storeUint(0xd1735400, 32);
        b.storeUint(self.queryId, 64);
        b.storeAddress(self.walletAddress);
        storeTolkNullable<CellRef<any_address>>(self.ownerAddress, b, (v, b) =>
            storeCellRef<any_address>(v, b, storeTolkAddressAny),
        );
    },
    toCell(self: ReplyWalletAddressMessage): c.Cell {
        return makeCellFrom<ReplyWalletAddressMessage>(
            self,
            ReplyWalletAddressMessage.store,
        );
    },
};

/**
 > struct (0xad7269a8) ClaimCreatorFeeMessage {
 >     queryId: uint64
 >     to: address?
 >     excessesTo: address?
 > }
 */
export interface ClaimCreatorFeeMessage {
    readonly $: 'ClaimCreatorFeeMessage';
    queryId: uint64;
    to: c.Address | null;
    excessesTo: c.Address | null;
}

export const ClaimCreatorFeeMessage = {
    PREFIX: 0xad7269a8,

    create(args: {
        queryId: uint64;
        to: c.Address | null;
        excessesTo: c.Address | null;
    }): ClaimCreatorFeeMessage {
        return {
            $: 'ClaimCreatorFeeMessage',
            ...args,
        };
    },
    fromSlice(s: c.Slice): ClaimCreatorFeeMessage {
        loadAndCheckPrefix32(s, 0xad7269a8, 'ClaimCreatorFeeMessage');
        return {
            $: 'ClaimCreatorFeeMessage',
            queryId: s.loadUintBig(64),
            to: s.loadMaybeAddress(),
            excessesTo: s.loadMaybeAddress(),
        };
    },
    store(self: ClaimCreatorFeeMessage, b: c.Builder): void {
        b.storeUint(0xad7269a8, 32);
        b.storeUint(self.queryId, 64);
        b.storeAddress(self.to);
        b.storeAddress(self.excessesTo);
    },
    toCell(self: ClaimCreatorFeeMessage): c.Cell {
        return makeCellFrom<ClaimCreatorFeeMessage>(
            self,
            ClaimCreatorFeeMessage.store,
        );
    },
};

/**
 > struct (0xf14b54f3) ResetGasMessage {
 >     queryId: uint64
 >     excessesTo: address?
 > }
 */
export interface ResetGasMessage {
    readonly $: 'ResetGasMessage';
    queryId: uint64;
    excessesTo: c.Address | null;
}

export const ResetGasMessage = {
    PREFIX: 0xf14b54f3,

    create(args: {
        queryId: uint64;
        excessesTo: c.Address | null;
    }): ResetGasMessage {
        return {
            $: 'ResetGasMessage',
            ...args,
        };
    },
    fromSlice(s: c.Slice): ResetGasMessage {
        loadAndCheckPrefix32(s, 0xf14b54f3, 'ResetGasMessage');
        return {
            $: 'ResetGasMessage',
            queryId: s.loadUintBig(64),
            excessesTo: s.loadMaybeAddress(),
        };
    },
    store(self: ResetGasMessage, b: c.Builder): void {
        b.storeUint(0xf14b54f3, 32);
        b.storeUint(self.queryId, 64);
        b.storeAddress(self.excessesTo);
    },
    toCell(self: ResetGasMessage): c.Cell {
        return makeCellFrom<ResetGasMessage>(self, ResetGasMessage.store);
    },
};

/**
 > struct (0x66c8ad72) PayoutMessage {
 >     queryId: uint64
 > }
 */
export interface PayoutMessage {
    readonly $: 'PayoutMessage';
    queryId: uint64;
}

export const PayoutMessage = {
    PREFIX: 0x66c8ad72,

    create(args: { queryId: uint64 }): PayoutMessage {
        return {
            $: 'PayoutMessage',
            ...args,
        };
    },
    fromSlice(s: c.Slice): PayoutMessage {
        loadAndCheckPrefix32(s, 0x66c8ad72, 'PayoutMessage');
        return {
            $: 'PayoutMessage',
            queryId: s.loadUintBig(64),
        };
    },
    store(self: PayoutMessage, b: c.Builder): void {
        b.storeUint(0x66c8ad72, 32);
        b.storeUint(self.queryId, 64);
    },
    toCell(self: PayoutMessage): c.Cell {
        return makeCellFrom<PayoutMessage>(self, PayoutMessage.store);
    },
};

/**
 > struct TradeFees {
 >     creatorFee: coins
 >     protocolFee: coins
 >     partnerFee: coins
 >     referrerFee: coins
 > }
 */
export interface TradeFees {
    readonly $: 'TradeFees';
    creatorFee: coins;
    protocolFee: coins;
    partnerFee: coins;
    referrerFee: coins;
}

export const TradeFees = {
    create(args: {
        creatorFee: coins;
        protocolFee: coins;
        partnerFee: coins;
        referrerFee: coins;
    }): TradeFees {
        return {
            $: 'TradeFees',
            ...args,
        };
    },
    fromSlice(s: c.Slice): TradeFees {
        return {
            $: 'TradeFees',
            creatorFee: s.loadCoins(),
            protocolFee: s.loadCoins(),
            partnerFee: s.loadCoins(),
            referrerFee: s.loadCoins(),
        };
    },
    store(self: TradeFees, b: c.Builder): void {
        b.storeCoins(self.creatorFee);
        b.storeCoins(self.protocolFee);
        b.storeCoins(self.partnerFee);
        b.storeCoins(self.referrerFee);
    },
    toCell(self: TradeFees): c.Cell {
        return makeCellFrom<TradeFees>(self, TradeFees.store);
    },
};

/**
 > struct (0xa0aa6bc2) BuyEvent {
 >     traderAddress: address
 >     amountIn: coins
 >     amountOut: coins
 >     fees: TradeFees
 >     currentSupply: coins
 >     raisedFunds: coins
 >     isGraduated: bool
 > }
 */
export interface BuyEvent {
    readonly $: 'BuyEvent';
    traderAddress: c.Address;
    amountIn: coins;
    amountOut: coins;
    fees: TradeFees;
    currentSupply: coins;
    raisedFunds: coins;
    isGraduated: boolean;
}

export const BuyEvent = {
    PREFIX: 0xa0aa6bc2,

    create(args: {
        traderAddress: c.Address;
        amountIn: coins;
        amountOut: coins;
        fees: TradeFees;
        currentSupply: coins;
        raisedFunds: coins;
        isGraduated: boolean;
    }): BuyEvent {
        return {
            $: 'BuyEvent',
            ...args,
        };
    },
    fromSlice(s: c.Slice): BuyEvent {
        loadAndCheckPrefix32(s, 0xa0aa6bc2, 'BuyEvent');
        return {
            $: 'BuyEvent',
            traderAddress: s.loadAddress(),
            amountIn: s.loadCoins(),
            amountOut: s.loadCoins(),
            fees: TradeFees.fromSlice(s),
            currentSupply: s.loadCoins(),
            raisedFunds: s.loadCoins(),
            isGraduated: s.loadBoolean(),
        };
    },
    store(self: BuyEvent, b: c.Builder): void {
        b.storeUint(0xa0aa6bc2, 32);
        b.storeAddress(self.traderAddress);
        b.storeCoins(self.amountIn);
        b.storeCoins(self.amountOut);
        TradeFees.store(self.fees, b);
        b.storeCoins(self.currentSupply);
        b.storeCoins(self.raisedFunds);
        b.storeBit(self.isGraduated);
    },
    toCell(self: BuyEvent): c.Cell {
        return makeCellFrom<BuyEvent>(self, BuyEvent.store);
    },
};

/**
 > struct (0x3ab0fccc) SellEvent {
 >     traderAddress: address
 >     amountIn: coins
 >     amountOut: coins
 >     fees: TradeFees
 >     currentSupply: coins
 >     raisedFunds: coins
 > }
 */
export interface SellEvent {
    readonly $: 'SellEvent';
    traderAddress: c.Address;
    amountIn: coins;
    amountOut: coins;
    fees: TradeFees;
    currentSupply: coins;
    raisedFunds: coins;
}

export const SellEvent = {
    PREFIX: 0x3ab0fccc,

    create(args: {
        traderAddress: c.Address;
        amountIn: coins;
        amountOut: coins;
        fees: TradeFees;
        currentSupply: coins;
        raisedFunds: coins;
    }): SellEvent {
        return {
            $: 'SellEvent',
            ...args,
        };
    },
    fromSlice(s: c.Slice): SellEvent {
        loadAndCheckPrefix32(s, 0x3ab0fccc, 'SellEvent');
        return {
            $: 'SellEvent',
            traderAddress: s.loadAddress(),
            amountIn: s.loadCoins(),
            amountOut: s.loadCoins(),
            fees: TradeFees.fromSlice(s),
            currentSupply: s.loadCoins(),
            raisedFunds: s.loadCoins(),
        };
    },
    store(self: SellEvent, b: c.Builder): void {
        b.storeUint(0x3ab0fccc, 32);
        b.storeAddress(self.traderAddress);
        b.storeCoins(self.amountIn);
        b.storeCoins(self.amountOut);
        TradeFees.store(self.fees, b);
        b.storeCoins(self.currentSupply);
        b.storeCoins(self.raisedFunds);
    },
    toCell(self: SellEvent): c.Cell {
        return makeCellFrom<SellEvent>(self, SellEvent.store);
    },
};

/**
 > struct GetJettonDataReply {
 >     totalSupply: coins
 >     isMintable: bool
 >     adminAddress: any_address
 >     metadata: cell
 >     memeWalletCode: cell
 > }
 */
export interface GetJettonDataReply {
    readonly $: 'GetJettonDataReply';
    totalSupply: coins;
    isMintable: boolean; /* = false */
    adminAddress: any_address;
    metadata: c.Cell;
    memeWalletCode: c.Cell;
}

export const GetJettonDataReply = {
    create(args: {
        totalSupply: coins;
        isMintable?: boolean; /* = false */
        adminAddress: any_address;
        metadata: c.Cell;
        memeWalletCode: c.Cell;
    }): GetJettonDataReply {
        return {
            $: 'GetJettonDataReply',
            isMintable: false,
            ...args,
        };
    },
    fromSlice(s: c.Slice): GetJettonDataReply {
        return {
            $: 'GetJettonDataReply',
            totalSupply: s.loadCoins(),
            isMintable: s.loadBoolean(),
            adminAddress: loadTolkAddressAny(s),
            metadata: s.loadRef(),
            memeWalletCode: s.loadRef(),
        };
    },
    store(self: GetJettonDataReply, b: c.Builder): void {
        b.storeCoins(self.totalSupply);
        b.storeBit(self.isMintable);
        storeTolkAddressAny(self.adminAddress, b);
        b.storeRef(self.metadata);
        b.storeRef(self.memeWalletCode);
    },
    toCell(self: GetJettonDataReply): c.Cell {
        return makeCellFrom<GetJettonDataReply>(self, GetJettonDataReply.store);
    },
};

/**
 > struct GetMemeDataReply {
 >     initialized: bool
 >     migrated: bool
 >     controllerAddress: address
 >     creatorAddress: address
 >     creatorFee: coins
 >     seed: uint128
 >     isGraduated: bool
 >     alpha: coins
 >     beta: coins
 >     onSellSupply: coins
 >     tradeFeeBps: uint16
 >     raisedFunds: coins
 >     currentSupply: coins
 > }
 */
export interface GetMemeDataReply {
    readonly $: 'GetMemeDataReply';
    initialized: boolean;
    migrated: boolean;
    controllerAddress: c.Address;
    creatorAddress: c.Address;
    creatorFee: coins;
    seed: uint128;
    isGraduated: boolean;
    alpha: coins;
    beta: coins;
    onSellSupply: coins;
    tradeFeeBps: uint16;
    raisedFunds: coins;
    currentSupply: coins;
}

export const GetMemeDataReply = {
    create(args: {
        initialized: boolean;
        migrated: boolean;
        controllerAddress: c.Address;
        creatorAddress: c.Address;
        creatorFee: coins;
        seed: uint128;
        isGraduated: boolean;
        alpha: coins;
        beta: coins;
        onSellSupply: coins;
        tradeFeeBps: uint16;
        raisedFunds: coins;
        currentSupply: coins;
    }): GetMemeDataReply {
        return {
            $: 'GetMemeDataReply',
            ...args,
        };
    },
    fromSlice(s: c.Slice): GetMemeDataReply {
        return {
            $: 'GetMemeDataReply',
            initialized: s.loadBoolean(),
            migrated: s.loadBoolean(),
            controllerAddress: s.loadAddress(),
            creatorAddress: s.loadAddress(),
            creatorFee: s.loadCoins(),
            seed: s.loadUintBig(128),
            isGraduated: s.loadBoolean(),
            alpha: s.loadCoins(),
            beta: s.loadCoins(),
            onSellSupply: s.loadCoins(),
            tradeFeeBps: s.loadUintBig(16),
            raisedFunds: s.loadCoins(),
            currentSupply: s.loadCoins(),
        };
    },
    store(self: GetMemeDataReply, b: c.Builder): void {
        b.storeBit(self.initialized);
        b.storeBit(self.migrated);
        b.storeAddress(self.controllerAddress);
        b.storeAddress(self.creatorAddress);
        b.storeCoins(self.creatorFee);
        b.storeUint(self.seed, 128);
        b.storeBit(self.isGraduated);
        b.storeCoins(self.alpha);
        b.storeCoins(self.beta);
        b.storeCoins(self.onSellSupply);
        b.storeUint(self.tradeFeeBps, 16);
        b.storeCoins(self.raisedFunds);
        b.storeCoins(self.currentSupply);
    },
    toCell(self: GetMemeDataReply): c.Cell {
        return makeCellFrom<GetMemeDataReply>(self, GetMemeDataReply.store);
    },
};

/**
 > struct (0x178d4519) ReceiveTokensMessage {
 >     queryId: uint64
 >     amount: coins
 >     from: address?
 >     excessesTo: address?
 >     forwardAmount: coins
 >     forwardPayload: RemainingBitsAndRefs | cell
 > }
 */
export interface ReceiveTokensMessage {
    readonly $: 'ReceiveTokensMessage';
    queryId: uint64;
    amount: coins;
    from: c.Address | null;
    excessesTo: c.Address | null;
    forwardAmount: coins; /* = 0 */
    forwardPayload:
        | { $: 'RemainingBitsAndRefs'; value: RemainingBitsAndRefs }
        | { $: 'cell'; value: c.Cell };
}

export const ReceiveTokensMessage = {
    PREFIX: 0x178d4519,

    create(args: {
        queryId: uint64;
        amount: coins;
        from: c.Address | null;
        excessesTo: c.Address | null;
        forwardAmount?: coins; /* = 0 */
        forwardPayload:
            | { $: 'RemainingBitsAndRefs'; value: RemainingBitsAndRefs }
            | { $: 'cell'; value: c.Cell };
    }): ReceiveTokensMessage {
        return {
            $: 'ReceiveTokensMessage',
            forwardAmount: 0n,
            ...args,
        };
    },
    fromSlice(s: c.Slice): ReceiveTokensMessage {
        loadAndCheckPrefix32(s, 0x178d4519, 'ReceiveTokensMessage');
        return {
            $: 'ReceiveTokensMessage',
            queryId: s.loadUintBig(64),
            amount: s.loadCoins(),
            from: s.loadMaybeAddress(),
            excessesTo: s.loadMaybeAddress(),
            forwardAmount: s.loadCoins(),
            forwardPayload: s.loadBoolean()
                ? { $: 'cell', value: s.loadRef() }
                : { $: 'RemainingBitsAndRefs', value: loadTolkRemaining(s) },
        };
    },
    store(self: ReceiveTokensMessage, b: c.Builder): void {
        b.storeUint(0x178d4519, 32);
        b.storeUint(self.queryId, 64);
        b.storeCoins(self.amount);
        b.storeAddress(self.from);
        b.storeAddress(self.excessesTo);
        b.storeCoins(self.forwardAmount);
        switch (self.forwardPayload.$) {
            case 'RemainingBitsAndRefs':
                b.storeUint(0b0, 1);
                storeTolkRemaining(self.forwardPayload.value, b);
                break;
            case 'cell':
                b.storeUint(0b1, 1);
                b.storeRef(self.forwardPayload.value);
                break;
        }
    },
    toCell(self: ReceiveTokensMessage): c.Cell {
        return makeCellFrom<ReceiveTokensMessage>(
            self,
            ReceiveTokensMessage.store,
        );
    },
};

/**
 > struct (0xd53276db) ExcessesMessage {
 >     queryId: uint64
 > }
 */
export interface ExcessesMessage {
    readonly $: 'ExcessesMessage';
    queryId: uint64;
}

export const ExcessesMessage = {
    PREFIX: 0xd53276db,

    create(args: { queryId: uint64 }): ExcessesMessage {
        return {
            $: 'ExcessesMessage',
            ...args,
        };
    },
    fromSlice(s: c.Slice): ExcessesMessage {
        loadAndCheckPrefix32(s, 0xd53276db, 'ExcessesMessage');
        return {
            $: 'ExcessesMessage',
            queryId: s.loadUintBig(64),
        };
    },
    store(self: ExcessesMessage, b: c.Builder): void {
        b.storeUint(0xd53276db, 32);
        b.storeUint(self.queryId, 64);
    },
    toCell(self: ExcessesMessage): c.Cell {
        return makeCellFrom<ExcessesMessage>(self, ExcessesMessage.store);
    },
};

/**
 > struct (0x7bdd97de) BurnNotificationMessage {
 >     queryId: uint64
 >     amount: coins
 >     from: address
 >     excessesTo: address?
 > }
 */
export interface BurnNotificationMessage {
    readonly $: 'BurnNotificationMessage';
    queryId: uint64;
    amount: coins;
    from: c.Address;
    excessesTo: c.Address | null;
}

export const BurnNotificationMessage = {
    PREFIX: 0x7bdd97de,

    create(args: {
        queryId: uint64;
        amount: coins;
        from: c.Address;
        excessesTo: c.Address | null;
    }): BurnNotificationMessage {
        return {
            $: 'BurnNotificationMessage',
            ...args,
        };
    },
    fromSlice(s: c.Slice): BurnNotificationMessage {
        loadAndCheckPrefix32(s, 0x7bdd97de, 'BurnNotificationMessage');
        return {
            $: 'BurnNotificationMessage',
            queryId: s.loadUintBig(64),
            amount: s.loadCoins(),
            from: s.loadAddress(),
            excessesTo: s.loadMaybeAddress(),
        };
    },
    store(self: BurnNotificationMessage, b: c.Builder): void {
        b.storeUint(0x7bdd97de, 32);
        b.storeUint(self.queryId, 64);
        b.storeCoins(self.amount);
        b.storeAddress(self.from);
        b.storeAddress(self.excessesTo);
    },
    toCell(self: BurnNotificationMessage): c.Cell {
        return makeCellFrom<BurnNotificationMessage>(
            self,
            BurnNotificationMessage.store,
        );
    },
};

/**
 > struct (0x773faf30) AffiliateFeeMessage {
 >     queryId: uint64
 > }
 */
export interface AffiliateFeeMessage {
    readonly $: 'AffiliateFeeMessage';
    queryId: uint64;
}

export const AffiliateFeeMessage = {
    PREFIX: 0x773faf30,

    create(args: { queryId: uint64 }): AffiliateFeeMessage {
        return {
            $: 'AffiliateFeeMessage',
            ...args,
        };
    },
    fromSlice(s: c.Slice): AffiliateFeeMessage {
        loadAndCheckPrefix32(s, 0x773faf30, 'AffiliateFeeMessage');
        return {
            $: 'AffiliateFeeMessage',
            queryId: s.loadUintBig(64),
        };
    },
    store(self: AffiliateFeeMessage, b: c.Builder): void {
        b.storeUint(0x773faf30, 32);
        b.storeUint(self.queryId, 64);
    },
    toCell(self: AffiliateFeeMessage): c.Cell {
        return makeCellFrom<AffiliateFeeMessage>(
            self,
            AffiliateFeeMessage.store,
        );
    },
};

/**
 > struct PayoutOptions {
 >     destination: address?
 >     extraGas: coins
 >     payload: cell?
 >     wrapPayload: bool
 > }
 */
export interface PayoutOptions {
    readonly $: 'PayoutOptions';
    destination: c.Address | null; /* = null */
    extraGas: coins; /* = 0 */
    payload: c.Cell | null; /* = null */
    wrapPayload: boolean; /* = false */
}

export const PayoutOptions = {
    create(args: {
        destination?: c.Address | null; /* = null */
        extraGas?: coins; /* = 0 */
        payload?: c.Cell | null; /* = null */
        wrapPayload?: boolean; /* = false */
    }): PayoutOptions {
        return {
            $: 'PayoutOptions',
            destination: null,
            extraGas: 0n,
            payload: null,
            wrapPayload: false,
            ...args,
        };
    },
    fromSlice(s: c.Slice): PayoutOptions {
        return {
            $: 'PayoutOptions',
            destination: s.loadMaybeAddress(),
            extraGas: s.loadCoins(),
            payload: s.loadBoolean() ? s.loadRef() : null,
            wrapPayload: s.loadBoolean(),
        };
    },
    store(self: PayoutOptions, b: c.Builder): void {
        b.storeAddress(self.destination);
        b.storeCoins(self.extraGas);
        storeTolkNullable<c.Cell>(self.payload, b, (v, b) => b.storeRef(v));
        b.storeBit(self.wrapPayload);
    },
    toCell(self: PayoutOptions): c.Cell {
        return makeCellFrom<PayoutOptions>(self, PayoutOptions.store);
    },
};

/**
 > struct ExtendedPayoutConfig {
 >     fulfill: PayoutOptions
 >     reject: PayoutOptions
 >     excessesTo: address?
 > }
 */
export interface ExtendedPayoutConfig {
    readonly $: 'ExtendedPayoutConfig';
    fulfill: PayoutOptions; /* = PayoutOptions { null, 0, null, false } */
    reject: PayoutOptions; /* = PayoutOptions { null, 0, null, false } */
    excessesTo: c.Address | null;
}

export const ExtendedPayoutConfig = {
    create(args: {
        fulfill?: PayoutOptions; /* = PayoutOptions { null, 0, null, false } */
        reject?: PayoutOptions; /* = PayoutOptions { null, 0, null, false } */
        excessesTo: c.Address | null;
    }): ExtendedPayoutConfig {
        return {
            $: 'ExtendedPayoutConfig',
            fulfill: {
                $: 'PayoutOptions',
                destination: null,
                extraGas: 0n,
                payload: null,
                wrapPayload: false,
            },
            reject: {
                $: 'PayoutOptions',
                destination: null,
                extraGas: 0n,
                payload: null,
                wrapPayload: false,
            },
            ...args,
        };
    },
    fromSlice(s: c.Slice): ExtendedPayoutConfig {
        return {
            $: 'ExtendedPayoutConfig',
            fulfill: PayoutOptions.fromSlice(s),
            reject: PayoutOptions.fromSlice(s),
            excessesTo: s.loadMaybeAddress(),
        };
    },
    store(self: ExtendedPayoutConfig, b: c.Builder): void {
        PayoutOptions.store(self.fulfill, b);
        PayoutOptions.store(self.reject, b);
        b.storeAddress(self.excessesTo);
    },
    toCell(self: ExtendedPayoutConfig): c.Cell {
        return makeCellFrom<ExtendedPayoutConfig>(
            self,
            ExtendedPayoutConfig.store,
        );
    },
};

/**
 > struct (0xde8402ce) InitPoolMessage {
 >     queryId: uint64
 >     customPayload: cell?
 > }
 */
export interface InitPoolMessage {
    readonly $: 'InitPoolMessage';
    queryId: uint64;
    customPayload: c.Cell | null; /* = null */
}

export const InitPoolMessage = {
    PREFIX: 0xde8402ce,

    create(args: {
        queryId: uint64;
        customPayload?: c.Cell | null; /* = null */
    }): InitPoolMessage {
        return {
            $: 'InitPoolMessage',
            customPayload: null,
            ...args,
        };
    },
    fromSlice(s: c.Slice): InitPoolMessage {
        loadAndCheckPrefix32(s, 0xde8402ce, 'InitPoolMessage');
        return {
            $: 'InitPoolMessage',
            queryId: s.loadUintBig(64),
            customPayload: s.loadBoolean() ? s.loadRef() : null,
        };
    },
    store(self: InitPoolMessage, b: c.Builder): void {
        b.storeUint(0xde8402ce, 32);
        b.storeUint(self.queryId, 64);
        storeTolkNullable<c.Cell>(self.customPayload, b, (v, b) =>
            b.storeRef(v),
        );
    },
    toCell(self: InitPoolMessage): c.Cell {
        return makeCellFrom<InitPoolMessage>(self, InitPoolMessage.store);
    },
};

/**
 > struct (0xce185bd7) InitPoolResultMessage {
 >     queryId: uint64
 >     exitCode: int32
 >     customPayload: cell?
 > }
 */
export interface InitPoolResultMessage {
    readonly $: 'InitPoolResultMessage';
    queryId: uint64;
    exitCode: int32; /* = 0 */
    customPayload: c.Cell | null; /* = null */
}

export const InitPoolResultMessage = {
    PREFIX: 0xce185bd7,

    create(args: {
        queryId: uint64;
        exitCode?: int32; /* = 0 */
        customPayload?: c.Cell | null; /* = null */
    }): InitPoolResultMessage {
        return {
            $: 'InitPoolResultMessage',
            exitCode: 0n,
            customPayload: null,
            ...args,
        };
    },
    fromSlice(s: c.Slice): InitPoolResultMessage {
        loadAndCheckPrefix32(s, 0xce185bd7, 'InitPoolResultMessage');
        return {
            $: 'InitPoolResultMessage',
            queryId: s.loadUintBig(64),
            exitCode: s.loadIntBig(32),
            customPayload: s.loadBoolean() ? s.loadRef() : null,
        };
    },
    store(self: InitPoolResultMessage, b: c.Builder): void {
        b.storeUint(0xce185bd7, 32);
        b.storeUint(self.queryId, 64);
        b.storeInt(self.exitCode, 32);
        storeTolkNullable<c.Cell>(self.customPayload, b, (v, b) =>
            b.storeRef(v),
        );
    },
    toCell(self: InitPoolResultMessage): c.Cell {
        return makeCellFrom<InitPoolResultMessage>(
            self,
            InitPoolResultMessage.store,
        );
    },
};

/**
 > struct (0xa5a7cbf8) PayNativeMessage {
 >     queryId: uint64
 >     amount: coins
 >     paymentPayload: cell
 >     payoutConfig: Cell<ExtendedPayoutConfig>
 > }
 */
export interface PayNativeMessage {
    readonly $: 'PayNativeMessage';
    queryId: uint64;
    amount: coins;
    paymentPayload: c.Cell;
    payoutConfig: CellRef<ExtendedPayoutConfig>;
}

export const PayNativeMessage = {
    PREFIX: 0xa5a7cbf8,

    create(args: {
        queryId: uint64;
        amount: coins;
        paymentPayload: c.Cell;
        payoutConfig: CellRef<ExtendedPayoutConfig>;
    }): PayNativeMessage {
        return {
            $: 'PayNativeMessage',
            ...args,
        };
    },
    fromSlice(s: c.Slice): PayNativeMessage {
        loadAndCheckPrefix32(s, 0xa5a7cbf8, 'PayNativeMessage');
        return {
            $: 'PayNativeMessage',
            queryId: s.loadUintBig(64),
            amount: s.loadCoins(),
            paymentPayload: s.loadRef(),
            payoutConfig: loadCellRef<ExtendedPayoutConfig>(
                s,
                ExtendedPayoutConfig.fromSlice,
            ),
        };
    },
    store(self: PayNativeMessage, b: c.Builder): void {
        b.storeUint(0xa5a7cbf8, 32);
        b.storeUint(self.queryId, 64);
        b.storeCoins(self.amount);
        b.storeRef(self.paymentPayload);
        storeCellRef<ExtendedPayoutConfig>(
            self.payoutConfig,
            b,
            ExtendedPayoutConfig.store,
        );
    },
    toCell(self: PayNativeMessage): c.Cell {
        return makeCellFrom<PayNativeMessage>(self, PayNativeMessage.store);
    },
};

// ————————————————————————————————————————————
//    class Meme
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

export class Meme implements c.Contract {
    static CodeCell = c.Cell.fromBase64(
        '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',
    );

    static Errors = {
        'ErrorCode.BondingCurveParametersMalformed': 20,
        'ErrorCode.SlippageExceeded': 21,
        'ErrorCode.MessageValueTooLow': 23,
        'ErrorCode.AlreadyInitialized': 24,
        'ErrorCode.SenderUnauthorized': 25,
        'ErrorCode.NotInitialized': 28,
        'ErrorCode.AlreadyGraduated': 29,
        'ErrorCode.NotMigrated': 32,
        'ErrorCode.UnknownOperation': 65535,
    };

    readonly address: c.Address;
    readonly init?: { code: c.Cell; data: c.Cell };

    protected constructor(
        address: c.Address,
        init?: { code: c.Cell; data: c.Cell },
    ) {
        this.address = address;
        this.init = init;
    }

    static fromAddress(address: c.Address) {
        return new Meme(address);
    }

    static fromStorage(
        emptyStorage: {
            initialized?: boolean; /* = false */
            migrated?: boolean; /* = false */
            config: CellRef<MemeConfig>;
            baseFeeBps: uint16;
            curve: BondingCurve;
            totalSupply?: coins; /* = 0 */
            creatorFee?: coins; /* = 0 */
            protocolFee?: coins; /* = 0 */
        },
        deployedOptions?: DeployedAddrOptions,
    ) {
        const initialState = {
            code: deployedOptions?.overrideContractCode ?? Meme.CodeCell,
            data: MemeStorage.toCell(MemeStorage.create(emptyStorage)),
        };
        const address = calculateDeployedAddress(
            initialState.code,
            initialState.data,
            deployedOptions ?? {},
        );
        return new Meme(address, initialState);
    }

    static createCellOfInitMemeMessage(body: {
        queryId: uint64;
        initialBuy: coins;
        partnerConfig: PartnerConfig | null;
        referrerConfig: ReferrerConfig | null;
    }) {
        return InitMemeMessage.toCell(InitMemeMessage.create(body));
    }

    static createCellOfBuyMessage(body: {
        queryId: uint64;
        amount: coins;
        minimalAmountOut: coins;
        excessesTo: c.Address;
        partnerConfig: CellRef<PartnerConfig> | null;
        referrerConfig: CellRef<ReferrerConfig> | null;
    }) {
        return BuyMessage.toCell(BuyMessage.create(body));
    }

    static createCellOfSellMessage(body: {
        queryId: uint64;
        amount: coins;
        minimalAmountOut: coins;
        from: c.Address;
        excessesTo: c.Address | null;
        partnerConfig: CellRef<PartnerConfig> | null;
        referrerConfig: CellRef<ReferrerConfig> | null;
    }) {
        return SellMessage.toCell(SellMessage.create(body));
    }

    static createCellOfBurnNotificationMessage(body: {
        queryId: uint64;
        amount: coins;
        from: c.Address;
        excessesTo: c.Address | null;
    }) {
        return BurnNotificationMessage.toCell(
            BurnNotificationMessage.create(body),
        );
    }

    static createCellOfRequestWalletAddressMessage(body: {
        queryId: uint64;
        ownerAddress: any_address;
        includeOwnerAddress?: boolean; /* = false */
    }) {
        return RequestWalletAddressMessage.toCell(
            RequestWalletAddressMessage.create(body),
        );
    }

    static createCellOfClaimCreatorFeeMessage(body: {
        queryId: uint64;
        to: c.Address | null;
        excessesTo: c.Address | null;
    }) {
        return ClaimCreatorFeeMessage.toCell(
            ClaimCreatorFeeMessage.create(body),
        );
    }

    static createCellOfResetGasMessage(body: {
        queryId: uint64;
        excessesTo: c.Address | null;
    }) {
        return ResetGasMessage.toCell(ResetGasMessage.create(body));
    }

    static createCellOfExcessesMessage(body: { queryId: uint64 }) {
        return ExcessesMessage.toCell(ExcessesMessage.create(body));
    }

    static createCellOfInitPoolResultMessage(body: {
        queryId: uint64;
        exitCode?: int32; /* = 0 */
        customPayload?: c.Cell | null; /* = null */
    }) {
        return InitPoolResultMessage.toCell(InitPoolResultMessage.create(body));
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

    async sendInitMemeMessage(
        provider: ContractProvider,
        via: Sender,
        msgValue: coins,
        body: {
            queryId: uint64;
            initialBuy: coins;
            partnerConfig: PartnerConfig | null;
            referrerConfig: ReferrerConfig | null;
        },
        extraOptions?: ExtraSendOptions,
    ) {
        return provider.internal(via, {
            value: msgValue,
            body: InitMemeMessage.toCell(InitMemeMessage.create(body)),
            ...extraOptions,
        });
    }

    async sendBuyMessage(
        provider: ContractProvider,
        via: Sender,
        msgValue: coins,
        body: {
            queryId: uint64;
            amount: coins;
            minimalAmountOut: coins;
            excessesTo: c.Address;
            partnerConfig: CellRef<PartnerConfig> | null;
            referrerConfig: CellRef<ReferrerConfig> | null;
        },
        extraOptions?: ExtraSendOptions,
    ) {
        return provider.internal(via, {
            value: msgValue,
            body: BuyMessage.toCell(BuyMessage.create(body)),
            ...extraOptions,
        });
    }

    async sendSellMessage(
        provider: ContractProvider,
        via: Sender,
        msgValue: coins,
        body: {
            queryId: uint64;
            amount: coins;
            minimalAmountOut: coins;
            from: c.Address;
            excessesTo: c.Address | null;
            partnerConfig: CellRef<PartnerConfig> | null;
            referrerConfig: CellRef<ReferrerConfig> | null;
        },
        extraOptions?: ExtraSendOptions,
    ) {
        return provider.internal(via, {
            value: msgValue,
            body: SellMessage.toCell(SellMessage.create(body)),
            ...extraOptions,
        });
    }

    async sendBurnNotificationMessage(
        provider: ContractProvider,
        via: Sender,
        msgValue: coins,
        body: {
            queryId: uint64;
            amount: coins;
            from: c.Address;
            excessesTo: c.Address | null;
        },
        extraOptions?: ExtraSendOptions,
    ) {
        return provider.internal(via, {
            value: msgValue,
            body: BurnNotificationMessage.toCell(
                BurnNotificationMessage.create(body),
            ),
            ...extraOptions,
        });
    }

    async sendRequestWalletAddressMessage(
        provider: ContractProvider,
        via: Sender,
        msgValue: coins,
        body: {
            queryId: uint64;
            ownerAddress: any_address;
            includeOwnerAddress?: boolean; /* = false */
        },
        extraOptions?: ExtraSendOptions,
    ) {
        return provider.internal(via, {
            value: msgValue,
            body: RequestWalletAddressMessage.toCell(
                RequestWalletAddressMessage.create(body),
            ),
            ...extraOptions,
        });
    }

    async sendClaimCreatorFeeMessage(
        provider: ContractProvider,
        via: Sender,
        msgValue: coins,
        body: {
            queryId: uint64;
            to: c.Address | null;
            excessesTo: c.Address | null;
        },
        extraOptions?: ExtraSendOptions,
    ) {
        return provider.internal(via, {
            value: msgValue,
            body: ClaimCreatorFeeMessage.toCell(
                ClaimCreatorFeeMessage.create(body),
            ),
            ...extraOptions,
        });
    }

    async sendResetGasMessage(
        provider: ContractProvider,
        via: Sender,
        msgValue: coins,
        body: {
            queryId: uint64;
            excessesTo: c.Address | null;
        },
        extraOptions?: ExtraSendOptions,
    ) {
        return provider.internal(via, {
            value: msgValue,
            body: ResetGasMessage.toCell(ResetGasMessage.create(body)),
            ...extraOptions,
        });
    }

    async sendExcessesMessage(
        provider: ContractProvider,
        via: Sender,
        msgValue: coins,
        body: {
            queryId: uint64;
        },
        extraOptions?: ExtraSendOptions,
    ) {
        return provider.internal(via, {
            value: msgValue,
            body: ExcessesMessage.toCell(ExcessesMessage.create(body)),
            ...extraOptions,
        });
    }

    async sendInitPoolResultMessage(
        provider: ContractProvider,
        via: Sender,
        msgValue: coins,
        body: {
            queryId: uint64;
            exitCode?: int32; /* = 0 */
            customPayload?: c.Cell | null; /* = null */
        },
        extraOptions?: ExtraSendOptions,
    ) {
        return provider.internal(via, {
            value: msgValue,
            body: InitPoolResultMessage.toCell(
                InitPoolResultMessage.create(body),
            ),
            ...extraOptions,
        });
    }

    async getWalletAddress(
        provider: ContractProvider,
        ownerAddress: c.Address,
    ): Promise<c.Address> {
        const r = StackReader.fromGetMethod(
            1,
            await provider.get('get_wallet_address', [
                {
                    type: 'slice',
                    cell: makeCellFrom<c.Address>(ownerAddress, (v, b) =>
                        b.storeAddress(v),
                    ),
                },
            ]),
        );
        return r.readSlice().loadAddress();
    }

    async getJettonData(
        provider: ContractProvider,
    ): Promise<GetJettonDataReply> {
        const r = StackReader.fromGetMethod(
            5,
            await provider.get('get_jetton_data', []),
        );
        return {
            $: 'GetJettonDataReply',
            totalSupply: r.readBigInt(),
            isMintable: r.readBoolean(),
            adminAddress: loadTolkAddressAny(r.readSlice()),
            metadata: r.readCell(),
            memeWalletCode: r.readCell(),
        };
    }

    async getMemeData(provider: ContractProvider): Promise<GetMemeDataReply> {
        const r = StackReader.fromGetMethod(
            13,
            await provider.get('get_meme_data', []),
        );
        return {
            $: 'GetMemeDataReply',
            initialized: r.readBoolean(),
            migrated: r.readBoolean(),
            controllerAddress: r.readSlice().loadAddress(),
            creatorAddress: r.readSlice().loadAddress(),
            creatorFee: r.readBigInt(),
            seed: r.readBigInt(),
            isGraduated: r.readBoolean(),
            alpha: r.readBigInt(),
            beta: r.readBigInt(),
            onSellSupply: r.readBigInt(),
            tradeFeeBps: r.readBigInt(),
            raisedFunds: r.readBigInt(),
            currentSupply: r.readBigInt(),
        };
    }
}
