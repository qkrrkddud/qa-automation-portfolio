import { Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  private get firstNameInput()  { return this.page.locator('[data-test="firstName"]'); }
  private get lastNameInput()   { return this.page.locator('[data-test="lastName"]'); }
  private get postalCodeInput() { return this.page.locator('[data-test="postalCode"]'); }
  private get continueButton()  { return this.page.locator('[data-test="continue"]'); }
  private get finishButton()    { return this.page.locator('[data-test="finish"]'); }
  get errorMessage()            { return this.page.locator('[data-test="error"]'); }
  get completeHeader()          { return this.page.locator('.complete-header'); }
  get totalPrice()              { return this.page.locator('.summary_total_label'); }

  async fillShippingInfo(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  async finish() {
    await this.finishButton.click();
  }
}