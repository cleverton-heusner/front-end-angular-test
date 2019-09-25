import { browser, logging } from 'protractor';

import { UserDetailsPage } from './user-details.po';
import { UsersListPage } from './users-list.po';

describe('Users List', () => {
  let usersListPage: UsersListPage;
  let userDetailsPage: UserDetailsPage;
  let firstUserNameExpected: string;
  let lastUserNameExpected: string;

  beforeEach(() => {
    usersListPage = new UsersListPage();
    userDetailsPage = new UserDetailsPage();
    firstUserNameExpected = 'Cleverton';
    lastUserNameExpected = 'Heusner';
  });

  it('Updated user should appear in the table.', () => {
    usersListPage.navigateTo();
    usersListPage.awaitForPresenceOfTable();
    usersListPage.clickOnDetailsUserButton();

    userDetailsPage.awaitForPresenceOfFirstNameField();
    userDetailsPage.changeValueOfFirstNameField(firstUserNameExpected);
    userDetailsPage.awaitForPresenceOfLastNameField();
    userDetailsPage.changeValueOfLastNameField(lastUserNameExpected);
    userDetailsPage.awaitForPresenceOfSaveButton();
    userDetailsPage.clickOnSaveButton();

    usersListPage.awaitForPresenceOfTable();
    const actualFirstNameUser = usersListPage.getFirstNameUserText();
    const actualLastNameUser = usersListPage.getLastNameUserText();

    expect(actualFirstNameUser).toEqual(firstUserNameExpected);
    expect(actualLastNameUser).toEqual(lastUserNameExpected);
  });

  afterEach(async () => {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
