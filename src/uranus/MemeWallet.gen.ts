// AUTO-GENERATED, do not edit
// it's a TypeScript wrapper for a MemeWallet contract in Tolk
// @ts-nocheck
/* eslint-disable */

import * as c from '@ton/core';
import { beginCell, ContractProvider, Sender, SendMode } from '@ton/core';

// ————————————————————————————————————————————
//   predefined types and functions
//

type RemainingBitsAndRefs = c.Slice;

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
type uint256 = bigint;

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
 > struct MemeWalletStorage {
 >     balance: coins
 >     ownerAddress: address
 >     memeAddress: address
 > }
 */
export interface MemeWalletStorage {
    readonly $: 'MemeWalletStorage';
    balance: coins; /* = 0 */
    ownerAddress: c.Address;
    memeAddress: c.Address;
}

export const MemeWalletStorage = {
    create(args: {
        balance?: coins; /* = 0 */
        ownerAddress: c.Address;
        memeAddress: c.Address;
    }): MemeWalletStorage {
        return {
            $: 'MemeWalletStorage',
            balance: 0n,
            ...args,
        };
    },
    fromSlice(s: c.Slice): MemeWalletStorage {
        return {
            $: 'MemeWalletStorage',
            balance: s.loadCoins(),
            ownerAddress: s.loadAddress(),
            memeAddress: s.loadAddress(),
        };
    },
    store(self: MemeWalletStorage, b: c.Builder): void {
        b.storeCoins(self.balance);
        b.storeAddress(self.ownerAddress);
        b.storeAddress(self.memeAddress);
    },
    toCell(self: MemeWalletStorage): c.Cell {
        return makeCellFrom<MemeWalletStorage>(self, MemeWalletStorage.store);
    },
};

/**
 > struct GetMemeWalletDataReply {
 >     balance: coins
 >     ownerAddress: address
 >     memeAddress: address
 >     walletCode: cell
 > }
 */
export interface GetMemeWalletDataReply {
    readonly $: 'GetMemeWalletDataReply';
    balance: coins;
    ownerAddress: c.Address;
    memeAddress: c.Address;
    walletCode: c.Cell;
}

export const GetMemeWalletDataReply = {
    create(args: {
        balance: coins;
        ownerAddress: c.Address;
        memeAddress: c.Address;
        walletCode: c.Cell;
    }): GetMemeWalletDataReply {
        return {
            $: 'GetMemeWalletDataReply',
            ...args,
        };
    },
    fromSlice(s: c.Slice): GetMemeWalletDataReply {
        return {
            $: 'GetMemeWalletDataReply',
            balance: s.loadCoins(),
            ownerAddress: s.loadAddress(),
            memeAddress: s.loadAddress(),
            walletCode: s.loadRef(),
        };
    },
    store(self: GetMemeWalletDataReply, b: c.Builder): void {
        b.storeCoins(self.balance);
        b.storeAddress(self.ownerAddress);
        b.storeAddress(self.memeAddress);
        b.storeRef(self.walletCode);
    },
    toCell(self: GetMemeWalletDataReply): c.Cell {
        return makeCellFrom<GetMemeWalletDataReply>(
            self,
            GetMemeWalletDataReply.store,
        );
    },
};

/**
 > struct (0x0f8a7ea5) TransferTokensMessage {
 >     queryId: uint64
 >     amount: coins
 >     to: address
 >     excessesTo: address?
 >     customPayload: cell?
 >     forwardToncoinAmount: coins
 >     forwardPayload: RemainingBitsAndRefs | cell
 > }
 */
export interface TransferTokensMessage {
    readonly $: 'TransferTokensMessage';
    queryId: uint64;
    amount: coins;
    to: c.Address;
    excessesTo: c.Address | null;
    customPayload: c.Cell | null; /* = null */
    forwardToncoinAmount: coins; /* = 0 */
    forwardPayload:
        | { $: 'RemainingBitsAndRefs'; value: RemainingBitsAndRefs }
        | { $: 'cell'; value: c.Cell };
}

export const TransferTokensMessage = {
    PREFIX: 0x0f8a7ea5,

    create(args: {
        queryId: uint64;
        amount: coins;
        to: c.Address;
        excessesTo: c.Address | null;
        customPayload?: c.Cell | null; /* = null */
        forwardToncoinAmount?: coins; /* = 0 */
        forwardPayload:
            | { $: 'RemainingBitsAndRefs'; value: RemainingBitsAndRefs }
            | { $: 'cell'; value: c.Cell };
    }): TransferTokensMessage {
        return {
            $: 'TransferTokensMessage',
            customPayload: null,
            forwardToncoinAmount: 0n,
            ...args,
        };
    },
    fromSlice(s: c.Slice): TransferTokensMessage {
        loadAndCheckPrefix32(s, 0x0f8a7ea5, 'TransferTokensMessage');
        return {
            $: 'TransferTokensMessage',
            queryId: s.loadUintBig(64),
            amount: s.loadCoins(),
            to: s.loadAddress(),
            excessesTo: s.loadMaybeAddress(),
            customPayload: s.loadBoolean() ? s.loadRef() : null,
            forwardToncoinAmount: s.loadCoins(),
            forwardPayload: s.loadBoolean()
                ? { $: 'cell', value: s.loadRef() }
                : { $: 'RemainingBitsAndRefs', value: loadTolkRemaining(s) },
        };
    },
    store(self: TransferTokensMessage, b: c.Builder): void {
        b.storeUint(0x0f8a7ea5, 32);
        b.storeUint(self.queryId, 64);
        b.storeCoins(self.amount);
        b.storeAddress(self.to);
        b.storeAddress(self.excessesTo);
        storeTolkNullable<c.Cell>(self.customPayload, b, (v, b) =>
            b.storeRef(v),
        );
        b.storeCoins(self.forwardToncoinAmount);
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
    toCell(self: TransferTokensMessage): c.Cell {
        return makeCellFrom<TransferTokensMessage>(
            self,
            TransferTokensMessage.store,
        );
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
 > struct (0x7362d09c) TransferNotificationMessage {
 >     queryId: uint64
 >     amount: coins
 >     from: address?
 >     forwardPayload: RemainingBitsAndRefs | cell
 > }
 */
export interface TransferNotificationMessage {
    readonly $: 'TransferNotificationMessage';
    queryId: uint64;
    amount: coins;
    from: c.Address | null;
    forwardPayload:
        | { $: 'RemainingBitsAndRefs'; value: RemainingBitsAndRefs }
        | { $: 'cell'; value: c.Cell };
}

export const TransferNotificationMessage = {
    PREFIX: 0x7362d09c,

    create(args: {
        queryId: uint64;
        amount: coins;
        from: c.Address | null;
        forwardPayload:
            | { $: 'RemainingBitsAndRefs'; value: RemainingBitsAndRefs }
            | { $: 'cell'; value: c.Cell };
    }): TransferNotificationMessage {
        return {
            $: 'TransferNotificationMessage',
            ...args,
        };
    },
    fromSlice(s: c.Slice): TransferNotificationMessage {
        loadAndCheckPrefix32(s, 0x7362d09c, 'TransferNotificationMessage');
        return {
            $: 'TransferNotificationMessage',
            queryId: s.loadUintBig(64),
            amount: s.loadCoins(),
            from: s.loadMaybeAddress(),
            forwardPayload: s.loadBoolean()
                ? { $: 'cell', value: s.loadRef() }
                : { $: 'RemainingBitsAndRefs', value: loadTolkRemaining(s) },
        };
    },
    store(self: TransferNotificationMessage, b: c.Builder): void {
        b.storeUint(0x7362d09c, 32);
        b.storeUint(self.queryId, 64);
        b.storeCoins(self.amount);
        b.storeAddress(self.from);
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
    toCell(self: TransferNotificationMessage): c.Cell {
        return makeCellFrom<TransferNotificationMessage>(
            self,
            TransferNotificationMessage.store,
        );
    },
};

/**
 > struct (0x595f07bc) BurnTokensMessage {
 >     queryId: uint64
 >     amount: coins
 >     excessesTo: address?
 >     customPayload: cell?
 > }
 */
export interface BurnTokensMessage {
    readonly $: 'BurnTokensMessage';
    queryId: uint64;
    amount: coins;
    excessesTo: c.Address | null;
    customPayload: c.Cell | null; /* = null */
}

export const BurnTokensMessage = {
    PREFIX: 0x595f07bc,

    create(args: {
        queryId: uint64;
        amount: coins;
        excessesTo: c.Address | null;
        customPayload?: c.Cell | null; /* = null */
    }): BurnTokensMessage {
        return {
            $: 'BurnTokensMessage',
            customPayload: null,
            ...args,
        };
    },
    fromSlice(s: c.Slice): BurnTokensMessage {
        loadAndCheckPrefix32(s, 0x595f07bc, 'BurnTokensMessage');
        return {
            $: 'BurnTokensMessage',
            queryId: s.loadUintBig(64),
            amount: s.loadCoins(),
            excessesTo: s.loadMaybeAddress(),
            customPayload: s.loadBoolean() ? s.loadRef() : null,
        };
    },
    store(self: BurnTokensMessage, b: c.Builder): void {
        b.storeUint(0x595f07bc, 32);
        b.storeUint(self.queryId, 64);
        b.storeCoins(self.amount);
        b.storeAddress(self.excessesTo);
        storeTolkNullable<c.Cell>(self.customPayload, b, (v, b) =>
            b.storeRef(v),
        );
    },
    toCell(self: BurnTokensMessage): c.Cell {
        return makeCellFrom<BurnTokensMessage>(self, BurnTokensMessage.store);
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
 > struct (0xb7459e2c) SellTokensMessage {
 >     queryId: uint64
 >     amount: coins
 >     minimalAmountOut: coins
 >     excessesTo: address?
 >     partnerConfig: Cell<PartnerConfig>?
 >     referrerConfig: Cell<ReferrerConfig>?
 > }
 */
export interface SellTokensMessage {
    readonly $: 'SellTokensMessage';
    queryId: uint64;
    amount: coins;
    minimalAmountOut: coins;
    excessesTo: c.Address | null;
    partnerConfig: CellRef<PartnerConfig> | null;
    referrerConfig: CellRef<ReferrerConfig> | null;
}

export const SellTokensMessage = {
    PREFIX: 0xb7459e2c,

    create(args: {
        queryId: uint64;
        amount: coins;
        minimalAmountOut: coins;
        excessesTo: c.Address | null;
        partnerConfig: CellRef<PartnerConfig> | null;
        referrerConfig: CellRef<ReferrerConfig> | null;
    }): SellTokensMessage {
        return {
            $: 'SellTokensMessage',
            ...args,
        };
    },
    fromSlice(s: c.Slice): SellTokensMessage {
        loadAndCheckPrefix32(s, 0xb7459e2c, 'SellTokensMessage');
        return {
            $: 'SellTokensMessage',
            queryId: s.loadUintBig(64),
            amount: s.loadCoins(),
            minimalAmountOut: s.loadCoins(),
            excessesTo: s.loadMaybeAddress(),
            partnerConfig: s.loadBoolean()
                ? loadCellRef<PartnerConfig>(s, PartnerConfig.fromSlice)
                : null,
            referrerConfig: s.loadBoolean()
                ? loadCellRef<ReferrerConfig>(s, ReferrerConfig.fromSlice)
                : null,
        };
    },
    store(self: SellTokensMessage, b: c.Builder): void {
        b.storeUint(0xb7459e2c, 32);
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
    toCell(self: SellTokensMessage): c.Cell {
        return makeCellFrom<SellTokensMessage>(self, SellTokensMessage.store);
    },
};

// ————————————————————————————————————————————
//    class MemeWallet
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

export class MemeWallet implements c.Contract {
    static CodeCell = c.Cell.fromBase64(
        'te6ccgECEAEABHQAART/APSkE/S88sgLAQIBYgIDA/jQ+JGORdMfMdcsILxqKMyW0z8x+gAwjiLXLCPe7L70ltM/MfoAMI4R1ywjI1ahJJLyP+HTPzH6ADDi4u1E0PoAAqDIAfoCzsntVODXLCC8aijMjhnTP/oA+lD6UPoA0wABktRzk4sIdOJtgQCD4w4D0YEAgyO64wKBAIQjBAUGAB2g9gXaiaH0AfSR9JBh8FUA/NcsIHxT9SyOGtM/+gD6SPpQ9AT6ANMAAZLUc5OLCHTigQCEjkrXLCLK+D3kn9M/+gD6UPQEbW1tbYEAhY4k1ywluizxZJSED/Lw4dM/+gD6APpQ9AT0BBBGVRNtbUADgQCG4hBJEDhHYBBFEDQQI+IQiRB4EGcQVhBFEDRBMALUMDHtRND6ACD6SPpIMPiSIccFkTDjDlEooMgB+gLOye1UI8IAjjjIz5HNi0JyKM8LP1AH+gIV+lQEwAOVA8+DE8yVA8+BE87iycjPhQgU+lJY+gJxzwtqEszJgBH7AJQQRl8G4iBukVvjDgcIAv664wIwN4EAhbqOZmwz+CyBE/tw+DaggR7IcPg2oPiTcPg6oPiXu/KX7UTQ+gAg+kj6SDD4kiLHBfKZU1O78ptRNaHIAfoCEs7J7VTIz5Hvdl96Fcs/UAP6AhP6UhL6VMnIz4WIEvpScc8LbszJgFD7AOD4LIEV1HD4NqCBWA9wCQoB3vgqURnbPIEAgVAEuo4hgQCCI7qfVBNDyM+DywTPhaDMzPkWmlA0yM+E0MzM+RbilDQC+QDigQCCWLqOHoMHIqGupbCDByKhE4ALUAPXJMjPhkAUygcTzljPAZtsIcjPhkASygfL/+LPUPiSxwXymQsAZvgnbxD4LKD4l6FzgQPKghAJZgGAcPg3tgly+wLIz4UI+lKCENUydtvPC47LP8mBAIL7AAL+MjQiwgByceME+JNw+DqoI6CBIbRw+DaggSRCcPg2oHOBAyxw+Dygc4EDyoIQCWYBgHD4N6Ag/iAw+Je78pftRND6ACD6SPpIMPiSIscF8pkp+kQw8l5To7vym1E6ocgB+gISzsntVPgqQAjbPMjPkF41FGYYyz9QDfoCG/pUGQsMANT4NqCBBjJw+Dag+JNw+DqqAKD4l7vyl+1E0PoAIPpI+kgw+JIixwXymVNzu/KbUTehyAH6AhLOye1UyM+RkatQkhfLP1AF+gJQA/oCFPpSE/pUEvQAEvQAycjPhYgS+lJxzwtuzMmAUPsAADBwyM+EIFIg+lIT+lLJECOBAIF4WAOBAIID/vpUUAb6AgbAA5UFz4MTzJUFz4ETzuLJyM+FiRPKB4EAgSa6jiGBAIIiup9Uc0bIz4PLBM+FoMzM+RaaUzTIz4TQzMz5FuKTI/kA4oEAgiO6jheDByihrqWwgwcooQmACynXJFjOQQjPAZQ4F8v/4nDPC2yBAIFQBbrjD8zJgFANDg8AOIEAglAGupoCz4bAE8sEz4WwljMBz4Y2EuISzMwADjIzM8+HwMwABPsA',
    );

    static Errors = {
        'ErrorCode.MessageValueTooLow': 23,
        'ErrorCode.SenderUnauthorized': 25,
        'ErrorCode.BalanceExceeded': 27,
        'ErrorCode.CrossWorkchainTransfer': 30,
        'ErrorCode.UnknownOperation': 65535,
    };

    readonly address: c.Address;
    readonly init?: { code: c.Cell; data: c.Cell };

    constructor(address: c.Address, init?: { code: c.Cell; data: c.Cell }) {
        this.address = address;
        this.init = init;
    }

    static fromAddress(address: c.Address) {
        return new MemeWallet(address);
    }

    static fromStorage(
        emptyStorage: {
            balance?: coins; /* = 0 */
            ownerAddress: c.Address;
            memeAddress: c.Address;
        },
        deployedOptions?: DeployedAddrOptions,
    ) {
        const initialState = {
            code: deployedOptions?.overrideContractCode ?? MemeWallet.CodeCell,
            data: MemeWalletStorage.toCell(
                MemeWalletStorage.create(emptyStorage),
            ),
        };
        const address = calculateDeployedAddress(
            initialState.code,
            initialState.data,
            deployedOptions ?? {},
        );
        return new MemeWallet(address, initialState);
    }

    static createCellOfReceiveTokensMessage(body: {
        queryId: uint64;
        amount: coins;
        from: c.Address | null;
        excessesTo: c.Address | null;
        forwardAmount?: coins; /* = 0 */
        forwardPayload:
            | { $: 'RemainingBitsAndRefs'; value: RemainingBitsAndRefs }
            | { $: 'cell'; value: c.Cell };
    }) {
        return ReceiveTokensMessage.toCell(ReceiveTokensMessage.create(body));
    }

    static createCellOfTransferTokensMessage(body: {
        queryId: uint64;
        amount: coins;
        to: c.Address;
        excessesTo: c.Address | null;
        customPayload?: c.Cell | null; /* = null */
        forwardToncoinAmount?: coins; /* = 0 */
        forwardPayload:
            | { $: 'RemainingBitsAndRefs'; value: RemainingBitsAndRefs }
            | { $: 'cell'; value: c.Cell };
    }) {
        return TransferTokensMessage.toCell(TransferTokensMessage.create(body));
    }

    static createCellOfBurnTokensMessage(body: {
        queryId: uint64;
        amount: coins;
        excessesTo: c.Address | null;
        customPayload?: c.Cell | null; /* = null */
    }) {
        return BurnTokensMessage.toCell(BurnTokensMessage.create(body));
    }

    static createCellOfSellTokensMessage(body: {
        queryId: uint64;
        amount: coins;
        minimalAmountOut: coins;
        excessesTo: c.Address | null;
        partnerConfig: CellRef<PartnerConfig> | null;
        referrerConfig: CellRef<ReferrerConfig> | null;
    }) {
        return SellTokensMessage.toCell(SellTokensMessage.create(body));
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

    async sendReceiveTokensMessage(
        provider: ContractProvider,
        via: Sender,
        msgValue: coins,
        body: {
            queryId: uint64;
            amount: coins;
            from: c.Address | null;
            excessesTo: c.Address | null;
            forwardAmount?: coins; /* = 0 */
            forwardPayload:
                | { $: 'RemainingBitsAndRefs'; value: RemainingBitsAndRefs }
                | { $: 'cell'; value: c.Cell };
        },
        extraOptions?: ExtraSendOptions,
    ) {
        return provider.internal(via, {
            value: msgValue,
            body: ReceiveTokensMessage.toCell(
                ReceiveTokensMessage.create(body),
            ),
            ...extraOptions,
        });
    }

    async sendTransferTokensMessage(
        provider: ContractProvider,
        via: Sender,
        msgValue: coins,
        body: {
            queryId: uint64;
            amount: coins;
            to: c.Address;
            excessesTo: c.Address | null;
            customPayload?: c.Cell | null; /* = null */
            forwardToncoinAmount?: coins; /* = 0 */
            forwardPayload:
                | { $: 'RemainingBitsAndRefs'; value: RemainingBitsAndRefs }
                | { $: 'cell'; value: c.Cell };
        },
        extraOptions?: ExtraSendOptions,
    ) {
        return provider.internal(via, {
            value: msgValue,
            body: TransferTokensMessage.toCell(
                TransferTokensMessage.create(body),
            ),
            ...extraOptions,
        });
    }

    async sendBurnTokensMessage(
        provider: ContractProvider,
        via: Sender,
        msgValue: coins,
        body: {
            queryId: uint64;
            amount: coins;
            excessesTo: c.Address | null;
            customPayload?: c.Cell | null; /* = null */
        },
        extraOptions?: ExtraSendOptions,
    ) {
        return provider.internal(via, {
            value: msgValue,
            body: BurnTokensMessage.toCell(BurnTokensMessage.create(body)),
            ...extraOptions,
        });
    }

    async sendSellTokensMessage(
        provider: ContractProvider,
        via: Sender,
        msgValue: coins,
        body: {
            queryId: uint64;
            amount: coins;
            minimalAmountOut: coins;
            excessesTo: c.Address | null;
            partnerConfig: CellRef<PartnerConfig> | null;
            referrerConfig: CellRef<ReferrerConfig> | null;
        },
        extraOptions?: ExtraSendOptions,
    ) {
        return provider.internal(via, {
            value: msgValue,
            body: SellTokensMessage.toCell(SellTokensMessage.create(body)),
            ...extraOptions,
        });
    }

    async getWalletData(
        provider: ContractProvider,
    ): Promise<GetMemeWalletDataReply> {
        const r = StackReader.fromGetMethod(
            4,
            await provider.get('get_wallet_data', []),
        );
        return {
            $: 'GetMemeWalletDataReply',
            balance: r.readBigInt(),
            ownerAddress: r.readSlice().loadAddress(),
            memeAddress: r.readSlice().loadAddress(),
            walletCode: r.readCell(),
        };
    }
}
