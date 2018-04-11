import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'environments/environment';
import * as _ from 'lodash';

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

  accountAddr: string;
  fromAddr: string;
  toAddr: string;
  amount: number;
  balancesMap = {};
  accounts = [];
  receipt: any;
  interval: any;
  transferFundForm: FormGroup;

  MetaCoin = contract(artifacts);

  constructor(private fb: FormBuilder) {

    this.transferFundForm = this.fb.group({
      fromAddr: ['', [Validators.required, Validators.minLength(40)]],
      toAddr: ['', [Validators.required, Validators.minLength(40)]],
      amount: ['', [Validators.required]]
    });

    Web3.providers.HttpProvider.prototype.sendAsync = Web3.providers.HttpProvider.prototype.send;
    var provider = new Web3.providers.HttpProvider(this.EthereumNodeUrl);
    this.MetaCoin.setProvider(provider);
  }

  ngOnInit() {
    this.interval = setInterval(() => {
      _.map(this.accounts, acc => {
        console.log('check balance for ' + acc);
        this.checkBalanceWithAddress(acc);
      });
    }, 2000);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    clearInterval(this.interval);
  }

  checkBalance() {
    this.checkBalanceWithAddress(this.accountAddr);
  }

  checkBalanceWithAddress(addr: string) {
    this.MetaCoin.deployed().then((instance) => {
      instance.getBalance(addr)
        .then((balance) => {
            this.balancesMap[addr] = balance.toString();
            this.accounts = _.keys(this.balancesMap);
        });
    });
  }

  sendCoin() {
    this.MetaCoin.deployed().then((instance) => {
      instance.sendCoin(this.transferFundForm.value.toAddr, this.transferFundForm.value.amount, {from: this.transferFundForm.value.fromAddr})
        .then(result => {
          this.receipt = result;
        });
    });
  }

  accCloseClicked(addr: string) {
    this.balancesMap = _.omit(this.balancesMap, [addr]);
    this.accounts = _.keys(this.balancesMap);
  }
}
