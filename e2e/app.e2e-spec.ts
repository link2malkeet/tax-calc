import { AppPage } from './app.po';
import { element, browser } from 'protractor';

describe('tax-calculator App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display the title of the page', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Pay Calculator - 2016-17');
  });

  it('should display the footer of the page', () => {
    page.navigateTo();
    expect(page.getFooterText()).toEqual('© 2018 Malkeet Singh');
  });

  it('should calculate tax based on GrossSalary input in the range 0 to 18200 which includes Superannuation of 10%', () => {
      page.navigateTo();
      expect(page.getCalculator().grossInput.isPresent()).toBe(true);
      expect(page.getCalculator().superInput.isPresent()).toBe(true);
      page.getCalculator().grossInput.clear();
      page.getCalculator().grossInput.sendKeys('10000');
      page.getCalculator().superInput.clear();
      page.getCalculator().superInput.sendKeys('10');
      page.getCalculator().isSuperInclude.click(); // set it true as default value is false;
      expect(page.getCalculator().superOutput.isPresent()).toBe(true);
      expect(page.getCalculator().taxableOutput.isPresent()).toBe(true);
      expect(page.getCalculator().superOutput.getAttribute('value')).toEqual('909.091');
      expect(page.getCalculator().taxableOutput.getAttribute('value')).toEqual('9,090.909');
      expect(page.getCalculator().taxVal.getAttribute('value')).toEqual('0'); // Tax is 0.
      expect(page.getCalculator().netIncomeVal.getAttribute('value')).toEqual('9,090.909');
      browser.sleep(2000);
    });

  it('should calculate tax based on GrossSalary input in the range of 18200 to 37000 which excludes Superannuation of'
    + '10%', () => {
      page.navigateTo();
      expect(page.getCalculator().grossInput.isPresent()).toBe(true);
      expect(page.getCalculator().superInput.isPresent()).toBe(true);
      page.getCalculator().grossInput.clear();
      page.getCalculator().grossInput.sendKeys('30000');

      // no need to set the superannuation checkout because default value is false
      expect(page.getCalculator().superOutput.isPresent()).toBe(true);
      expect(page.getCalculator().taxableOutput.isPresent()).toBe(true);
      expect(page.getCalculator().superOutput.getAttribute('value')).toEqual('2,850');
      expect(page.getCalculator().taxableOutput.getAttribute('value')).toEqual('30,000');
      expect(page.getCalculator().taxVal.getAttribute('value')).toEqual('2,242');
      expect(page.getCalculator().netIncomeVal.getAttribute('value')).toEqual('27,758');
      browser.sleep(2000);
    });

  it('should calculate tax based on GrossSalary input in the range 87001 to 180000 which includes Superannuation '
    + 'of 10%', () => {
      page.navigateTo();
      expect(page.getCalculator().grossInput.isPresent()).toBe(true);
      expect(page.getCalculator().superInput.isPresent()).toBe(true);
      page.getCalculator().grossInput.clear();
      page.getCalculator().grossInput.sendKeys('120000');
      page.getCalculator().superInput.clear();
      page.getCalculator().superInput.sendKeys('10');
      page.getCalculator().isSuperInclude.click(); // set it true as default value is false;
      expect(page.getCalculator().superOutput.isPresent()).toBe(true);
      expect(page.getCalculator().taxableOutput.isPresent()).toBe(true);
      expect(page.getCalculator().superOutput.getAttribute('value')).toEqual('10,909.091');
      expect(page.getCalculator().taxableOutput.getAttribute('value')).toEqual('109,090.909');
      expect(page.getCalculator().taxVal.getAttribute('value')).toEqual('27,995.636');
      expect(page.getCalculator().netIncomeVal.getAttribute('value')).toEqual('81,095.273');
      browser.sleep(2000);
    });


});
