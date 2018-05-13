import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaxCalculatorService } from './tax-calculator.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [TaxCalculatorService]
})
export class CommonServicesModule { }
