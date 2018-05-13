import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Output } from '@angular/core/src/metadata/directives';
import { Subject } from 'rxjs/Subject';
import { PayOutput } from '../beans/pay-output.bean';
import { IncomeInput } from '../beans/income-input.bean';

/**
 * Service responsible for calculate tax, super and pay.
 */
@Injectable()
export class TaxCalculatorService {
  // this is the subject and kept private so that only this service owns the actual data to be streamed.
  private taxResultSubject = new BehaviorSubject<PayOutput>({ pay: 0, taxableIncome: 0, superAnnuation: 0, totaltax: 0 });

  // other can access to this public observable to get streamed values.
  public getTaxResultObservable$() { return this.taxResultSubject.asObservable(); }
  constructor() { }

  /**
   * This function calculates pay return includes tax, super, totalpay
   * @param incomeInput - IncomeInput
   */
  public calculatePayReturn(incomeInput: IncomeInput): void {
    let output: PayOutput;
    let taxableIncome = 0;
    let superAnnuation = 0;
    // the output object
    output = new PayOutput();
    if (incomeInput.grossAmt <= 0 || incomeInput.superPercentage > 100) {
      this.taxResultSubject.next({ pay: 0, taxableIncome: 0, superAnnuation: 0, totaltax: 0 });
      return;
    }

    // calculate taxable income and super based on whether to include super in base
    if (incomeInput.isSuperInclude && incomeInput.grossAmt > 0) {
      taxableIncome = incomeInput.grossAmt / (1 + incomeInput.superPercentage / 100);
      superAnnuation = incomeInput.grossAmt - taxableIncome;
    } else {
      superAnnuation = incomeInput.grossAmt * incomeInput.superPercentage / 100;
      taxableIncome = incomeInput.grossAmt;
    }


    // set super and taxable income
    output.superAnnuation = superAnnuation;
    output.taxableIncome = taxableIncome;

    // based on slab, calculate tax and pay
    if (taxableIncome > 0 && taxableIncome <= 18200) { // slab 1
      output.totaltax = 0;
      output.pay = taxableIncome - output.totaltax;
    } else if (taxableIncome > 18200 && taxableIncome <= 37000) { // slab 2
      output.totaltax = (taxableIncome - 18200) * 0.19;
      output.pay = taxableIncome - output.totaltax;
    } else if (taxableIncome > 37000 && taxableIncome <= 87000) { // slab 3
      output.totaltax = 3572 + (taxableIncome - 37000) * 0.325;
      output.pay = taxableIncome - output.totaltax;
    } else if (taxableIncome > 87000 && taxableIncome <= 180000) { // slab 4
      output.totaltax = 19822 + (taxableIncome - 87000) * 0.37;
      output.pay = taxableIncome - output.totaltax;
    } else { // slab 5
      output.totaltax = 54232 + (taxableIncome - 180000) * 0.45;
      output.pay = taxableIncome - output.totaltax;
    }
    // make the output available to stream
    this.taxResultSubject.next(output);
  }

}


