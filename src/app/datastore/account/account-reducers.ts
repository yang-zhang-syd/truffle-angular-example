import * as AccountActions from './account-actions';
import * as _ from 'lodash';

export interface State {
    publicAddress: string;
    balance: number,
    publicAddresses: string[],
    balances: Map<string, number>,
    newAccountAddress: string,
    transferReceipt: any
}

const initialState: State = {
    publicAddress: '',
    balance: 0,
    publicAddresses: [],
    balances: new Map<string, number>(),
    newAccountAddress: '',
    transferReceipt: null
}

export function reducer(state = initialState, action: AccountActions.All) {
    switch (action.type) {
        case AccountActions.GET_ACCOUNT_BALANCE: {
            return {
                ...state,
                publicAddress: action.payload
            }
        }
        case AccountActions.RECEIVED_ACCOUNT_BALANCE: {

            state.balances[action.payload.publicAddress] = action.payload.balance;

            return {
                ...state,
                balance: action.payload,
                balances: Object.assign({}, state.balances)
            }
        }
        case AccountActions.RECEIVED_ACCOUNT_BALANCES: {
            return {
                ...state,
                balances: action.payload
            }
        }
        case AccountActions.ADD_ACCOUNT: {
            var address = action.payload;
            if(!_.includes(state.publicAddresses, address)) {
                state.publicAddresses.push(address);
            }
            return state;
        }
        case AccountActions.REMOVE_ACCOUNT: {
            var removeAccAction = <AccountActions.RemoveAccount>action;
            _.remove(state.publicAddresses, addr => addr == removeAccAction.address);
            return {
                ...state,
                publicAddresses: Object.assign([], state.publicAddresses)
            }
        }
        case AccountActions.ACCTOUNT_CREATED: {
            return {
                ...state,
                newAccountAddress: (<AccountActions.AccountCreated>action).address
            }
        }
        case AccountActions.TRANSFER_RECEIPT_RECEIVED: {
            return {
                ...state,
                transferReceipt: action.payload
            }
        }
        default: {
            return state;
        }
    }
}