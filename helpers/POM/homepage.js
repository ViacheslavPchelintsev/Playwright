export class HomePage {
  constructor(page) {
    this.page = page;
  }

  get signIn() {
    return this.page.locator(".header_signin");
  }

  get registrationButton() {
    return this.page.locator('button:has-text("Registration")');
  }
}
