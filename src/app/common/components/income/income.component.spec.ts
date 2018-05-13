import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeComponent } from './income.component';
import { TaxCalculatorService } from '../../services/tax-calculator.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MockTaxCalculatorService } from '../../../../testing/mock-services/tax-calculator-service.stub';
import { Observable } from 'rxjs/Observable';

describe('IncomeComponent', () => {
  let component: IncomeComponent, h2, debugElement: DebugElement, hostElement,
    taxCalculatorService: TaxCalculatorService;
  let fixture: ComponentFixture<IncomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IncomeComponent],
      providers: [{
        provide: TaxCalculatorService, useClass: MockTaxCalculatorService
      }],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    taxCalculatorService = TestBed.get(TaxCalculatorService);
    fixture = TestBed.createComponent(IncomeComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    hostElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check the header value', () => {
    h2 = hostElement.querySelector('h2');
    expect(h2.textContent).toContain('Income');
  });

  it('change in form input should call calculatePayReturn of service', () => {
    spyOn(taxCalculatorService, 'calculatePayReturn').and.returnValue(Observable.of({
      pay: 10, taxableIncome: 0, superAnnuation: 1, totaltax: 0
    }));
    const incomeFormVal = component.incomeGroup.controls['grossAmt'];
    incomeFormVal.setValue(10);
    expect(taxCalculatorService.calculatePayReturn).toHaveBeenCalled();
  });

  it('check form validity', () => {
    // set invalid values
    const incomeFormVal = component.incomeGroup.controls['grossAmt'];
    incomeFormVal.setValue(-1);
    const superFormVal = component.incomeGroup.controls['superPercentage'];
    superFormVal.setValue(101);
    expect(component.incomeGroup.valid).toBeFalsy();
    expect(incomeFormVal.valid).toBeFalsy();
    expect(superFormVal.valid).toBeFalsy();

    // set valid values
    incomeFormVal.setValue(1000);
    superFormVal.setValue(10);

    expect(component.incomeGroup.valid).toBeTruthy();
    expect(incomeFormVal.valid).toBeTruthy();
    expect(superFormVal.valid).toBeTruthy();
  });
});
