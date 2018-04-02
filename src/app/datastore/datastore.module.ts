import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './root-reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AccountEffects } from './account/account-effects';
import { AccountServices } from './account/account-services';

@NgModule({
    imports: [
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([AccountEffects]),
        StoreDevtoolsModule.instrument({ maxAge: 100 })
    ], exports: [], declarations: [],
    providers: [AccountServices]
})
export class DataStoreModule {
}