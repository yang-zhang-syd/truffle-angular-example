import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { EtherAccountComponent } from './components/ether.account.component';
import { DataStoreModule } from 'app/datastore/datastore.module';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    EtherAccountComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    DataStoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
