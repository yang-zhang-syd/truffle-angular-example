import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from 'environments/environment';

@Injectable()
export class AccountServices {

    private EthereumServerURL = environment.ethereumApiUrl;

    constructor(private http: Http) {}

    getAccountBalance(publicKey: string) {
        
        var headers = new Headers();
        headers.set('content-type', 'application/x-www-form-urlencoded');

        var body = `publicKey=${publicKey}`;

        return this.http.post(this.EthereumServerURL + '/GetAccountBalance', body, {headers: headers})
            .map(res => {
                return res.json();
            });
    }

    getAccountBalances(publicKeys: string[]) {
        var headers = new Headers();
        headers.set('content-type', 'application/json');

        var body = JSON.stringify(publicKeys);

        return this.http.post(this.EthereumServerURL + '/GetAccountBalances', body, {headers: headers})
            .map(res => {
                return res.json();
            });
    }

    createAccount(password: string) {
        var headers = new Headers();
        headers.set('content-type', 'application/x-www-form-urlencoded');

        var body = `password=${password}`;

        return this.http.post(this.EthereumServerURL + '/CreateNewAccount', body, {headers: headers})
            .map(res => {
                return res.json();
            });
    }

    transferEther(fromAddr: string, toAddr: string, amount: number, password: string) {
        var headers = new Headers();
        headers.set('content-type', 'application/x-www-form-urlencoded');

        var body = `fromAddr=${fromAddr}&toAddr=${toAddr}&amount=${amount}&password=${password}`;

        return this.http.post(this.EthereumServerURL + '/TransferEther', body, {headers: headers})
            .map(res => {
                return res.json();
            });
    }
}