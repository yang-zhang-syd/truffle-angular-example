import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';
import * as fromRoot from 'app/datastore/root-reducers';
import * as AccountActions from 'app/datastore/account/account-actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  protected ngUnsubscribe = new Subject();

  publicAddress: string;
  publicAddresses: string[];
  balancesObservable: Observable<Map<string, number>>;
  balances: any[] = [];
  interval: any;

  // create new account
  newPassword: string = '';
  repeatNewPassword: string = '';
  newAccountAddress: Observable<string>;

  // transfer fund
  fromAddr: string;
  toAddr: string;
  password: string;
  amount: string;
  receipt: Observable<any>;

  constructor(private store: Store<fromRoot.State>) {
    this.balancesObservable = store.select(state => state.account.balances);
    this.newAccountAddress = store.select(state => state.account.newAccountAddress);
    this.receipt = store.select(state => state.account.transferReceipt);
  }

  ngOnInit() {

    this.balancesObservable.takeUntil(this.ngUnsubscribe).subscribe(accbalances => {
      var keys = _.keys(accbalances);
      this.balances = [];
      _.map(keys, key => {
        this.balances.push({publicAddress: key, balance: accbalances[key]});
      });
    });

    this.store.select(state => state.account.publicAddresses)
      .takeUntil(this.ngUnsubscribe).subscribe(addresses => {
        this.publicAddresses = addresses;
      });

    this.interval = setInterval(() => {
      if(this.publicAddresses.length != 0) {
        this.store.dispatch(new AccountActions.GetAccountBalances(this.publicAddresses));
      }
    }, 5000);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    clearInterval(this.interval);
  }

  addAccount() {
    this.store.dispatch(new AccountActions.AddAccount(this.publicAddress));
  }

  etherAccCloseClicked(address) {
    this.store.dispatch(new AccountActions.RemoveAccount(address));
  }

  createAccount() {
    if(this.newPassword === this.repeatNewPassword) {
      this.store.dispatch(new AccountActions.CreateAccount(this.newPassword));
    }
  }

  transferEther() {
    this.store.dispatch(new AccountActions.TransferEther({
      fromAddr: this.fromAddr,
      toAddr: this.toAddr,
      amount: this.amount,
      password: this.password
    }));
  }
}
