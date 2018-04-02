import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: "ether-account",
    templateUrl: "./ether.account.component.html"
})
export class EtherAccountComponent {

    @Input() publicAddress: string;
    @Input() balance: number;

    @Output() onClosed: EventEmitter<string> = new EventEmitter();

    closeClicked() {
        this.onClosed.emit(this.publicAddress);
    }
}