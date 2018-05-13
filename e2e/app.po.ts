import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getTitleText() {
    return element(by.css('app-root h2')).getText();
  }

  getFooterText() {
    return element(by.css('app-root h3')).getText();
  }

  getCalculator() {
    return {
      grossInput: element(by.id('grossAmt')),
      superInput: element(by.id('superPercentage')),
      isSuperInclude: element(by.id('isSuperInclude')),
      superOutput: element(by.id('superVal')),
      taxableOutput: element(by.id('taxableIncome')),
      taxVal: element(by.id('taxVal')),
      netIncomeVal: element(by.id('netIncomeVal'))
    };
  }
}
