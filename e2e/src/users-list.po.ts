import { browser, by, element, protractor } from 'protractor';

export class UsersListPage {

  private readonly FIRST_BTN_DETAILS_LOCATOR = `//table[@id='tb_users']/descendant::button[1][text()='Details'][1]`;
  private readonly TB_USERS_LOCATOR = 'tb_users';
  private readonly TF_FIRST_NAME_UPDATED_LOCATOR = `//table[@id='tb_users']//tbody//tr[1]/th[@id='col_body_first_name']`;
  private readonly TF_LAST_NAME_UPDATED_LOCATOR = `//table[@id='tb_users']//tbody//tr[1]/th[@id='col_body_last_name']`;

  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  awaitForPresenceOfTable() {
    browser.wait(protractor.ExpectedConditions.presenceOf(element(by.id(this.TB_USERS_LOCATOR))));
  }

  clickOnDetailsUserButton() {
    element(by.xpath(this.FIRST_BTN_DETAILS_LOCATOR)).click();
  }

  getFirstNameUserText() {
    return element(by.xpath(this.TF_FIRST_NAME_UPDATED_LOCATOR)).getText();
  }

  getLastNameUserText() {
    return element(by.xpath(this.TF_LAST_NAME_UPDATED_LOCATOR)).getText();
  }
}
