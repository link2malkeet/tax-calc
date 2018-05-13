import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ValidatorFn } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { TaxCalculatorService } from '../../services/tax-calculator.service';
import { IncomeInput } from '../../beans/income-input.bean';
import { negativeCheck, rangeValidation } from '../../validators/custom-validators';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
/**
 * Component shows the inputs to take values for grossAmount and superannuation.
 */
export class IncomeComponent implements OnInit {
  incomeGroup: FormGroup;
  grossAmt: FormControl;
  superPercentage: FormControl;
  isSuperInclude: FormControl;
  constructor(private taxCalculatorService: TaxCalculatorService) { }

  ngOnInit() {
    this.createForm();
    const incomeObserver = this.incomeGroup.valueChanges;
    incomeObserver
      .subscribe(term => {
        // return if form is invalid.
        if (!this.incomeGroup.valid) { return; }
        const grossAmt = parseFloat(this.incomeGroup.controls['grossAmt'].value);
        const superPercentage = parseFloat(this.incomeGroup.controls['superPercentage'].value);
        const isSuperInclude = this.incomeGroup.controls['isSuperInclude'].value;
        // service call to get pay return, it does not return anything, because the called function release
        // results on reactive stream.
        this.taxCalculatorService.calculatePayReturn(new IncomeInput(grossAmt, superPercentage, isSuperInclude));
      });
  }

  /**
   * Create Forms with default values and validation
   */
  createForm() {
    this.grossAmt = new FormControl(0, Validators.compose([negativeCheck()]));
    this.superPercentage = new FormControl(9.5, Validators.compose([rangeValidation(9.5, 100)]));
    this.isSuperInclude = new FormControl(false);
    this.incomeGroup = new FormGroup({
      grossAmt: this.grossAmt,
      superPercentage: this.superPercentage,
      isSuperInclude: this.isSuperInclude
    });
  }
}


