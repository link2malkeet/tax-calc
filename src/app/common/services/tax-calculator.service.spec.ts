import { TestBed, inject } from '@angular/core/testing';

import { TaxCalculatorService } from './tax-calculator.service';
import { PayOutput } from '../beans/pay-output.bean';

describe('TaxCalculatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaxCalculatorService]
    });
  });

  it('should be created', inject([TaxCalculatorService], (service: TaxCalculatorService) => {
    expect(service).toBeTruthy();
  }));

  it('should calculate tax if income falls in the range of $18,201 – $37,000 which includes super',
    inject([TaxCalculatorService], (service: TaxCalculatorService) => {
      service.calculatePayReturn({ grossAmt: 20000, isSuperInclude: true, superPercentage: 9.5 });
      service.getTaxResultObservable$().subscribe((payOut: PayOutput) => {
        expect(payOut).toBeDefined();
        expect(payOut.superAnnuation).toBeGreaterThan(1700);
        expect(payOut.taxableIncome).toBeGreaterThan(18000);
        expect(payOut.pay).toBeGreaterThan(18000);
      });
    }));
  it('should calculate tax if income falls in the range of $18,201 – $37,000 which excludes super',
    inject([TaxCalculatorService], (service: TaxCalculatorService) => {
      service.calculatePayReturn({ grossAmt: 20000, isSuperInclude: false, superPercentage: 9.5 });
      service.getTaxResultObservable$().subscribe((payOut: PayOutput) => {
        expect(payOut).toBeDefined();
        expect(payOut.pay).toBeGreaterThan(18000);
      });
    }));
  it('should calculate tax if income falls in the range of $37000 – $87,000 which includes super',
    inject([TaxCalculatorService], (service: TaxCalculatorService) => {
      service.calculatePayReturn({ grossAmt: 50000, isSuperInclude: true, superPercentage: 9.5 });
      service.getTaxResultObservable$().subscribe((payOut: PayOutput) => {
        expect(payOut).toBeDefined();
        expect(payOut.pay).toBeGreaterThan(38000);
      });
    }));

  it('should calculate tax if income falls in the range of $87000 – $180,000 which includes super',
    inject([TaxCalculatorService], (service: TaxCalculatorService) => {
      service.calculatePayReturn({ grossAmt: 90000, isSuperInclude: false, superPercentage: 9.5 });
      service.getTaxResultObservable$().subscribe((payOut: PayOutput) => {
        expect(payOut).toBeDefined();
        expect(payOut.pay).toBeGreaterThan(64000);
      });
    }));

  it('should calculate tax if income above $180,001 which excludes super',
    inject([TaxCalculatorService], (service: TaxCalculatorService) => {
      service.calculatePayReturn({ grossAmt: 200000, isSuperInclude: false, superPercentage: 9.5 });
      service.getTaxResultObservable$().subscribe((payOut: PayOutput) => {
        expect(payOut).toBeDefined();
        expect(payOut.pay).toEqual(136768);
      });
    }));

  it('should return 0 if income below 0', inject([TaxCalculatorService], (service: TaxCalculatorService) => {
    service.calculatePayReturn({ grossAmt: 0, isSuperInclude: false, superPercentage: 9.5 });
    service.getTaxResultObservable$().subscribe((payOut: PayOutput) => {
      expect(payOut).toBeDefined();
      expect(payOut.pay).toEqual(0);
      expect(payOut.totaltax).toEqual(0);
    });
  }));


  it('should return 0 if income in the range of 0 to 18200', inject([TaxCalculatorService], (service: TaxCalculatorService) => {
    service.calculatePayReturn({ grossAmt: 18000, isSuperInclude: false, superPercentage: 9.5 });
    service.getTaxResultObservable$().subscribe((payOut: PayOutput) => {
      expect(payOut).toBeDefined();
      expect(payOut.pay).toEqual(18000);
      expect(payOut.totaltax).toEqual(0);
    });
  }));
});
