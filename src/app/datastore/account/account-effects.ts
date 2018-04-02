import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';

import { AccountServices } from './account-services';
import * as AccountActions from './account-actions';

@Injectable()
export class AccountEffects {

    constructor(
        private actions$: Actions,
        private service: AccountServices
    ) { }

    @Effect()
    getAccountBalance$: Observable<Action> = this.actions$.ofType(AccountActions.GET_ACCOUNT_BALANCE)
        .map((action: AccountActions.GetAccountBalance) => action.payload)
        .switchMap(publicKey => {
            return this.service.getAccountBalance(publicKey);
        })
        .map(balance => new AccountActions.ReceivedAccountBalance(balance));

    @Effect()
    addAccount$: Observable<Action> = this.actions$.ofType(AccountActions.ADD_ACCOUNT)
        .map((action: AccountActions.AddAccount) => new AccountActions.GetAccountBalance(action.payload));

    @Effect()
    getAccountBalances$: Observable<Action> = this.actions$.ofType(AccountActions.GET_ACCOUNT_BALANCES)
        .map((action: AccountActions.GetAccountBalances) => action.payload)
        .switchMap(publicKeys => {
            return this.service.getAccountBalances(publicKeys);
        })
        .map(balances => new AccountActions.ReceivedAccountBalances(balances));      
        
    @Effect()
    createNewAccount$: Observable<Action> = this.actions$.ofType(AccountActions.CREATE_ACCOUNT)
        .map((action: AccountActions.CreateAccount) => action.password)
        .switchMap(password => {
            return this.service.createAccount(password);
        })
        .map(address => new AccountActions.AccountCreated(address));

    @Effect()
    transferEther$: Observable<Action> = this.actions$.ofType(AccountActions.TRANSFER_ETHER)
        .map((action: AccountActions.TransferEther) => action.payload)
        .switchMap(payload => {
            return this.service.transferEther(payload.fromAddr, payload.toAddr, payload.amount, payload.password);
        })
        .map(receipt => new AccountActions.TransferReceiptReceived(receipt));        
}
