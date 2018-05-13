/**
 * Bean represents the inputs for Superannuation, GrossAmt and inclusion/exclusion of Super.
 */
export class IncomeInput {
    superPercentage: number;
    grossAmt: number;
    isSuperInclude: boolean;
    constructor(grossAmt: number, superPercentage: number, isSuperinclude: boolean) {
        this.superPercentage = superPercentage;
        this.grossAmt = grossAmt;
        this.isSuperInclude = isSuperinclude;
    }
  }
