/// transfer#0f8a7ea5 query_id:uint64 amount:(VarUInteger 16) destination:MsgAddress
//                  response_destination:MsgAddress custom_payload:(Maybe ^Cell)
//                  forward_ton_amount:(VarUInteger 16) forward_payload:(Either Cell ^Cell)
//                  = InternalMsgBody;
import {
    type Address,
    beginCell,
    type Builder,
    Cell,
    type Slice,
} from '@ton/core';
import { Optional } from '../../../core';

export interface TransferMessage {
    kind: 'jettons.TransferMessage';
    queryId: bigint;
    amount: bigint;
    to: Address;
    excessesTo: Address | null;
    customPayload: Cell | null;
    forwardToncoinAmount: bigint;
    forwardPayload: Slice | Cell;
}

export namespace TransferMessage {
    export const TAG = 0x0f8a7ea5;

    export type Input = Optional<
        Omit<TransferMessage, 'kind'>,
        | 'queryId'
        | 'excessesTo'
        | 'customPayload'
        | 'forwardToncoinAmount'
        | 'forwardPayload'
    >;

    export const create = (input: Input): TransferMessage => ({
        ...input,
        kind: 'jettons.TransferMessage',
        queryId: input.queryId ?? 0n,
        excessesTo: input.excessesTo ?? null,
        customPayload: input.customPayload ?? null,
        forwardToncoinAmount: input.forwardToncoinAmount ?? 0n,
        forwardPayload: input.forwardPayload ?? beginCell().asSlice(),
    });

    export const load = (source: Slice): TransferMessage => {
        source.skip(32);
        const queryId = source.loadUintBig(64);
        const amount = source.loadCoins();
        const to = source.loadAddress();
        const excessesTo = source.loadMaybeAddress();
        const customPayload = source.loadMaybeRef();
        const forwardToncoinAmount = source.loadCoins();
        const forwardPayload = source.loadBit()
            ? source.loadRef()
            : source.clone();

        return create({
            queryId,
            amount,
            to,
            excessesTo,
            customPayload,
            forwardToncoinAmount,
            forwardPayload,
        });
    };

    export const store = (message: TransferMessage) => (to: Builder) => {
        to.storeUint(TAG, 32)
            .storeUint(message.queryId, 64)
            .storeCoins(message.amount)
            .storeAddress(message.to)
            .storeAddress(message.excessesTo)
            .storeMaybeRef(message.customPayload)
            .storeCoins(message.forwardToncoinAmount)
            .store((builder: Builder) => {
                if (message.forwardPayload instanceof Cell) {
                    builder.storeBit(true).storeRef(message.forwardPayload);
                } else {
                    builder.storeBit(false).storeSlice(message.forwardPayload);
                }
            });
    };

    export const toCell = (message: TransferMessage): Cell =>
        beginCell().store(store(message)).endCell();

    export const createCell = (input: Input) => toCell(create(input));
}
