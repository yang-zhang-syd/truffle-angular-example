import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'environments/environment';
import * as _ from 'lodash';
import * as fromRoot from 'app/datastore/root-reducers';
import * as AccountActions from 'app/datastore/account/account-actions';

const artifacts = require('../../build/contracts/MetaCoin.json');
const contract = require('truffle-contract');
const Web3 = require('web3');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private EthereumNodeUrl = environment.ethereumNodeUrl;
  protected ngUnsubscribe = new Subject();

  publicAddress: string;
  publicAddresses: string[];
  balancesObservable: Observable<Map<string, number>>;
  balances: any[] = [];
  interval: any;

  // create new account
  newAccountAddress: Observable<string>;
  newAccountForm: FormGroup;

  // transfer fund
  receipt: Observable<any>;
  transferFundForm: FormGroup;

  MetaCoin = contract(artifacts);

  constructor(private store: Store<fromRoot.State>, private fb: FormBuilder) {
    this.balancesObservable = store.select(state => state.account.balances);
    this.newAccountAddress = store.select(state => state.account.newAccountAddress);
    this.receipt = store.select(state => state.account.transferReceipt);

    this.newAccountForm = this.fb.group({
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        repeatNewPassword: ['', [Validators.required, Validators.minLength(6)]],
      }, 
      {validator: this.passwordMatchValidator}
    );

    this.transferFundForm = this.fb.group({
      fromAddr: ['', [Validators.required, Validators.minLength(40)]],
      toAddr: ['', [Validators.required, Validators.minLength(40)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      amount: ['', [Validators.required]]
    });

    Web3.providers.HttpProvider.prototype.sendAsync = Web3.providers.HttpProvider.prototype.send;
    var provider = new Web3.providers.HttpProvider(this.EthereumNodeUrl);
    this.MetaCoin.setProvider(provider);
  }

  passwordMatchValidator(frm: FormGroup) {
    return frm.controls['newPassword'].value === frm.controls['repeatNewPassword'].value
       ? null : {'mismatch': true};
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

  testContract() {
    this.MetaCoin.deployed().then((instance) => {
      //console.log(instance);
      instance.getBalance('0x5e46E398294606658DC62B46E3Cc9e85aE7B725c')
        .then((balance) => {
            console.log(balance);
        });

      instance.sendCoin('0xd614E92B5d0E2a67deDBbdF416b5a3dAd5f78604', 1, {from: '0x5e46E398294606658DC62B46E3Cc9e85aE7B725c'})
        .then(result => {
          console.log(result);
        });
    });
  }

  addAccount() {
    this.store.dispatch(new AccountActions.AddAccount(this.publicAddress));
  }

  etherAccCloseClicked(address) {
    this.store.dispatch(new AccountActions.RemoveAccount(address));
  }

  createAccount() {
    if(!this.newAccountForm.errors) {
      this.store.dispatch(new AccountActions.CreateAccount(this.newAccountForm.value.newPassword));
    }
  }

  transferEther() {
    if(this.transferFundForm.errors)
      return;

    this.store.dispatch(new AccountActions.TransferEther({
      fromAddr: this.transferFundForm.value.fromAddr,
      toAddr: this.transferFundForm.value.toAddr,
      amount: this.transferFundForm.value.amount,
      password: this.transferFundForm.value.password
    }));
  }
}
