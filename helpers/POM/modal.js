import { HomePage } from "./homepage";

export class Registration extends HomePage {
  constructor(page) {
    super(page);
  }

  get nameField() {
    return this.page.locator("#signupName");
  }
  get lastNameField() {
    return this.page.locator("#signupLastName");
  }
  get emailField() {
    return this.page.locator("#signupEmail");
  }
  get passwordField() {
    return this.page.locator("#signupPassword");
  }
  get repeatPasswordField() {
    return this.page.locator("#signupRepeatPassword");
  }
  get registerButton() {
    return this.page.locator(".modal-footer .btn-primary");
  }
  get warningMessage() {
    return this.page.locator(".invalid-feedback");
  }
  get alertMessage() {
    return this.page.locator(".alert-danger");
  }
  get borderColorNotValid() {
    return this.not.toHaveCSS("border-color", "rgb(220, 53, 69)");
  }
  get borderColorValid() {
    return this.toHaveCSS("border-color", "rgb(220, 53, 69)");
  }
}
