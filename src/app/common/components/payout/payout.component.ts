import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PayOutput } from '../../beans/pay-output.bean';
import { TaxCalculatorService } from '../../services/tax-calculator.service';

@Component({
  selector: 'app-payout',
  templateUrl: './payout.component.html',
  styleUrls: ['./payout.component.css']
})
/**
 * Component shows the pay, super and tax
 */
export class PayoutComponent implements OnInit {
  _taxResultObservable: Observable<PayOutput>;
  constructor(private taxCalculatorService: TaxCalculatorService) { }
  public get taxResultObservable$() {
    return this._taxResultObservable;
  }
  @Input()
  public set taxResultObservable$(dataS) {
    this._taxResultObservable = dataS;
  }
  ngOnInit() {
    this.taxResultObservable$ = this.taxCalculatorService.getTaxResultObservable$();
  }

}
