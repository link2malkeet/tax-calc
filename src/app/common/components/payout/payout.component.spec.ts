import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayoutComponent } from './payout.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { TaxCalculatorService } from '../../services/tax-calculator.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { MockTaxCalculatorService } from '../../../../testing/mock-services/tax-calculator-service.stub';
import { By } from '@angular/platform-browser';

describe('PayoutComponent', () => {
  let component: PayoutComponent, h2, debugElement: DebugElement, hostElement;
  let fixture: ComponentFixture<PayoutComponent>;
  let taxCalculatorService: TaxCalculatorService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PayoutComponent],
      providers: [{
        provide: TaxCalculatorService, useClass: MockTaxCalculatorService
      }],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    taxCalculatorService = TestBed.get(TaxCalculatorService);
    spyOn(taxCalculatorService, 'getTaxResultObservable$').and.returnValue(Observable.of({
      pay: 0, taxableIncome: 0, superAnnuation: 0, totaltax: 0
    }));
    fixture = TestBed.createComponent(PayoutComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    hostElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check the header value', () => {
    h2 = fixture.nativeElement.querySelector('h2');
    expect(h2.textContent).toContain('Pay Return');
  });

  it('check template bindings', () => {
    component.taxResultObservable$ = Observable.of({
      pay: 10000, taxableIncome: 2300, superAnnuation: 100, totaltax: 566
    });
    // tell Angular to update the bindings
    fixture.detectChanges();
    // then values will be avilable to the templates to check assertions.
    const superEl = debugElement.query(By.css('#superVal')).nativeElement;
    expect(superEl.value).toEqual('100');
    const taxableIncome = debugElement.query(By.css('#taxableIncome')).nativeElement;
    expect(taxableIncome.value).toEqual('2,300');
  });
});
