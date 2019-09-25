import { browser, by, element, protractor } from 'protractor';

export class UserDetailsPage {

  private readonly BTN_SAVE_USER_LOCATOR = 'btn_save_user';
  private readonly TF_FIRST_NAME_LOCATOR = 'user_first_name';
  private readonly TF_LAST_NAME_LOCATOR = 'user_last_name';

  awaitForPresenceOfFirstNameField() {
    browser.wait(protractor.ExpectedConditions.presenceOf(element(by.id(this.TF_FIRST_NAME_LOCATOR))));
  }

  changeValueOfFirstNameField(firstNameUser: string) {
    element(by.id(this.TF_FIRST_NAME_LOCATOR)).clear()
      .then(() => element(by.id(this.TF_FIRST_NAME_LOCATOR)).sendKeys(firstNameUser));
  }

  awaitForPresenceOfLastNameField() {
    browser.wait(protractor.ExpectedConditions.presenceOf(element(by.id(this.TF_LAST_NAME_LOCATOR))));
  }

  changeValueOfLastNameField(lastNameUser: string) {
    element(by.id(this.TF_LAST_NAME_LOCATOR)).clear()
      .then(() => element(by.id(this.TF_LAST_NAME_LOCATOR)).sendKeys(lastNameUser));
  }

  awaitForPresenceOfSaveButton() {
    browser.wait(protractor.ExpectedConditions.presenceOf(element(by.id(this.BTN_SAVE_USER_LOCATOR))));
  }

  clickOnSaveButton() {
    element(by.id(this.BTN_SAVE_USER_LOCATOR)).click();
  }
}
