import { test, expect } from "@playwright/test";
import { HomePage } from "../helpers/POM/homepage.js";
import { Registration } from "../helpers/POM/modal.js";

test.beforeEach(async ({ page }) => {
  const homePage = new HomePage(page);
  await page.goto("/");
  await homePage.signIn.click();
  await expect(page.locator(".modal-content")).toBeVisible();
  await homePage.registrationButton.click();
});

test.describe("Registration warnings", () => {
  test.describe("Name field warnings", () => {
    test("Name is required", async ({ page }) => {
      const registration = new Registration(page);
      await expect(registration.nameField).borderColorNotValid;
      await expect(registration.nameField).toBeVisible();
      await registration.nameField.focus();
      await registration.nameField.blur();
      await expect(registration.nameField).borderColorValid;
      await expect(registration.warningMessage).toBeVisible();
      await expect(registration.warningMessage).toContainText("Name required");
    });

    test("Name is invalid", async ({ page }) => {
      const registration = new Registration(page);
      await expect(registration.nameField).borderColorNotValid;
      await registration.nameField.fill("1111");
      await registration.nameField.blur();
      await expect(registration.nameField).borderColorValid;
      await expect(registration.warningMessage).toBeVisible();
      await expect(registration.warningMessage).toContainText(
        "Name is invalid",
      );
    });

    test("Name has to be from 2 to 20 characters long", async ({ page }) => {
      const registration = new Registration(page);
      await expect(registration.nameField).borderColorNotValid;
      await registration.nameField.fill("L");
      await registration.nameField.blur();
      await expect(registration.nameField).borderColorValid;
      await expect(registration.warningMessage).toBeVisible();
      await expect(registration.warningMessage).toContainText(
        "Name has to be from 2 to 20 characters long",
      );
    });
  });

  test.describe("Last Name field warnings", () => {
    test("Last Name is required", async ({ page }) => {
      const registration = new Registration(page);
      await expect(registration.lastNameField).borderColorNotValid;
      await expect(registration.lastNameField).toBeVisible();
      await registration.lastNameField.focus();
      await registration.lastNameField.blur();
      await expect(registration.lastNameField).borderColorValid;
      await expect(registration.warningMessage).toBeVisible();
      await expect(registration.warningMessage).toContainText(
        "Last name required",
      );
    });

    test("Last Name is invalid", async ({ page }) => {
      const registration = new Registration(page);
      await expect(registration.lastNameField).not.borderColorValid;
      await registration.lastNameField.fill("1111");
      await registration.lastNameField.blur();
      await expect(registration.lastNameField).borderColorValid;
      await expect(registration.warningMessage).toBeVisible();
      await expect(registration.warningMessage).toContainText(
        "Last name is invalid",
      );
    });

    test("Last Name has to be from 2 to 20 characters long", async ({
      page,
    }) => {
      const registration = new Registration(page);
      await expect(registration.lastNameField).not.borderColorValid;
      await registration.lastNameField.fill("S");
      await registration.lastNameField.blur();
      await expect(registration.lastNameField).borderColorValid;
      await expect(registration.warningMessage).toBeVisible();
      await expect(registration.warningMessage).toContainText(
        "Last name has to be from 2 to 20 characters long",
      );
    });
  });

  test.describe("Email field warnings", () => {
    test("Email is required", async ({ page }) => {
      const registration = new Registration(page);
      await expect(registration.emailField).not.borderColorValid;
      await expect(registration.emailField).toBeVisible();
      await registration.emailField.focus();
      await registration.emailField.blur();
      await expect(registration.emailField).borderColorValid;
      await expect(registration.warningMessage).toBeVisible();
      await expect(registration.warningMessage).toContainText("Email required");
    });

    test("Email is incorrect", async ({ page }) => {
      const registration = new Registration(page);
      await expect(registration.emailField).not.borderColorValid;
      await registration.emailField.fill("vpgmail.com");
      await registration.emailField.blur();
      await expect(registration.emailField).borderColorValid;
      await expect(registration.warningMessage).toBeVisible();
      await expect(registration.warningMessage).toContainText(
        "Email is incorrect",
      );
    });
  });

  test.describe("Password field warnings", () => {
    test("Password is required", async ({ page }) => {
      const registration = new Registration(page);
      await expect(registration.passwordField).not.borderColorValid;
      await expect(registration.passwordField).toBeVisible();
      await registration.passwordField.focus();
      await registration.passwordField.blur();
      await expect(registration.passwordField).borderColorValid;
      await expect(registration.warningMessage).toBeVisible();
      await expect(registration.warningMessage).toContainText(
        "Password required",
      );
    });

    test("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter", async ({
      page,
    }) => {
      const registration = new Registration(page);
      await expect(registration.passwordField).not.borderColorValid;
      await expect(registration.passwordField).toBeVisible();

      await registration.passwordField.fill("qwerty");
      await registration.passwordField.blur();
      await expect(registration.passwordField).borderColorValid;
      await expect(registration.warningMessage).toBeVisible();
      await expect(registration.warningMessage).toContainText(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
      );
      registration.passwordField.clear;

      await registration.passwordField.fill("qwerty123");
      await registration.passwordField.blur();
      await expect(registration.passwordField).borderColorValid;

      await expect(registration.warningMessage).toBeVisible();
      await expect(registration.warningMessage).toContainText(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
      );
    });
  });

  test.describe("Re-enter password field warnings", () => {
    test("Re-enter password required", async ({ page }) => {
      const registration = new Registration(page);
      await expect(registration.repeatPasswordField).not.borderColorValid;
      await expect(registration.repeatPasswordField).toBeVisible();
      await registration.repeatPasswordField.focus();
      await registration.repeatPasswordField.blur();
      await expect(registration.repeatPasswordField).borderColorValid;
      await expect(registration.warningMessage).toBeVisible();
      await expect(registration.warningMessage).toContainText(
        "Re-enter password required",
      );
    });

    test("Passwords do not match", async ({ page }) => {
      const registration = new Registration(page);
      await expect(registration.repeatPasswordField).not.borderColorValid;
      await expect(registration.repeatPasswordField).toBeVisible();
      await registration.passwordField.fill("Qwerty123");
      await registration.repeatPasswordField.fill("Qwert1234");
      await registration.repeatPasswordField.blur();
      await expect(registration.repeatPasswordField).borderColorValid;
      await expect(registration.warningMessage).toBeVisible();
      await expect(registration.warningMessage).toContainText(
        "Passwords do not match",
      );
    });
  });
});

test.describe("Registration process", () => {
  const email = `vp${Date.now()}@test.com`;
  test.describe.configure({ mode: "serial" });

  test("Registration success", async ({ page }) => {
    const registration = new Registration(page);
    await registration.nameField.fill("Leon");
    await registration.lastNameField.fill("Silver");
    await registration.emailField.fill(email);
    await registration.passwordField.fill("Qwerty123");
    await registration.repeatPasswordField.fill("Qwerty123");
    await registration.nameField.blur();
    await page.waitForTimeout(1000);
    await registration.registerButton.click();
    await expect(page).toHaveURL(/\/panel\/garage/);
  });

  test("Registration failed", async ({ page }) => {
    const registration = new Registration(page);
    await registration.nameField.fill("Leon");
    await registration.lastNameField.fill("Silver");
    await registration.emailField.fill(email);
    await registration.passwordField.fill("Qwerty123");
    await registration.repeatPasswordField.fill("Qwerty123");
    await registration.nameField.blur();
    await page.waitForTimeout(1000);
    await registration.registerButton.click();
    await page.waitForTimeout(2000);
    await expect(registration.alertMessage).toBeVisible();
    await expect(registration.alertMessage).toContainText(
      "User already exists",
    );
  });
});
