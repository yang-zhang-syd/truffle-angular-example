import { Action } from '@ngrx/store';

export const GET_ACCOUNT_BALANCE = 'GET_ACCOUNT_BALANCE';
export const RECEIVED_ACCOUNT_BALANCE = 'RECEIVED_ACCOUNT_BALANCE';
export const GET_ACCOUNT_BALANCES = 'GET_ACCOUNT_BALANCES';
export const RECEIVED_ACCOUNT_BALANCES = 'RECEIVED_ACCOUNT_BALANCES';
export const ADD_ACCOUNT = 'ADD_ACCOUNT';
export const REMOVE_ACCOUNT = 'REMOVE_ACCOUNT';
export const CREATE_ACCOUNT = 'CREATE_ACCOUNT';
export const ACCTOUNT_CREATED = 'ACCTOUNT_CREATED';
export const TRANSFER_ETHER = 'TRANSFER_ETHER';
export const TRANSFER_RECEIPT_RECEIVED = 'TRANSFER_RECEIPT_RECEIVED';

export class GetAccountBalance implements Action {
    readonly type = GET_ACCOUNT_BALANCE;
    constructor(public payload: any) {}
}

export class ReceivedAccountBalance implements Action {
    readonly type = RECEIVED_ACCOUNT_BALANCE;
    constructor(public payload: any) {}
}

export class GetAccountBalances implements Action {
    readonly type = GET_ACCOUNT_BALANCES;
    constructor(public payload: any = null) {}
}

export class ReceivedAccountBalances implements Action {
    readonly type = RECEIVED_ACCOUNT_BALANCES;
    constructor(public payload: any) {}
}

export class AddAccount implements Action {
    readonly type = ADD_ACCOUNT;
    constructor(public payload: any) {}
}

export class RemoveAccount implements Action {
    readonly type = REMOVE_ACCOUNT;
    constructor(public address: any) {}
}

export class CreateAccount implements Action {
    readonly type = CREATE_ACCOUNT;
    constructor(public password: any) {}
}

export class AccountCreated implements Action {
    readonly type = ACCTOUNT_CREATED;
    constructor(public address: string) {}
}

export class TransferEther implements Action {
    readonly type = TRANSFER_ETHER;
    constructor(public payload: any) {}
}

export class TransferReceiptReceived implements Action {
    readonly type = TRANSFER_RECEIPT_RECEIVED;
    constructor(public payload: any) {}
}

export type All = GetAccountBalance | ReceivedAccountBalance | 
                  GetAccountBalances | ReceivedAccountBalances | 
                  AddAccount | RemoveAccount | CreateAccount | 
                  AccountCreated | TransferEther | TransferReceiptReceived;