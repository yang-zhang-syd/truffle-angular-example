import * as fromAccount from './account/account-reducers';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/forkJoin';

export interface State {
    account: fromAccount.State
}

export const reducers = {
    account: fromAccount.reducer
}