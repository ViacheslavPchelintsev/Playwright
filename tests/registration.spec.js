import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.locator(".header_signin").click();
  await expect(page.locator(".modal-content")).toBeVisible();
  await page.locator('button:has-text("Registration")').click();
});

test.describe("Registration warnings", () => {
  test.describe("Name field warnings", () => {
    test("Name is required", async ({ page }) => {
      await expect(page.locator("#signupName")).not.toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
      await expect(page.locator("#signupName")).toBeVisible();
      await page.locator("#signupName").focus();
      await page.locator("#signupName").blur();
      await expect(page.locator("#signupName")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
      await expect(page.locator(".invalid-feedback")).toBeVisible();
      await expect(page.locator(".invalid-feedback")).toContainText(
        "Name required",
      );
    });

    test("Name is invalid", async ({ page }) => {
      await expect(page.locator("#signupName")).not.toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
      await page.locator("#signupName").fill("1111");
      await page.locator("#signupName").blur();
      await expect(page.locator("#signupName")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
      await expect(page.locator(".invalid-feedback")).toBeVisible();
      await expect(page.locator(".invalid-feedback")).toContainText(
        "Name is invalid",
      );
    });

    test("Name has to be from 2 to 20 characters long", async ({ page }) => {
      await expect(page.locator("#signupName")).not.toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
      await page.locator("#signupName").fill("L");
      await page.locator("#signupName").blur();
      await expect(page.locator("#signupName")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
      await expect(page.locator(".invalid-feedback")).toBeVisible();
      await expect(page.locator(".invalid-feedback")).toContainText(
        "Name has to be from 2 to 20 characters long",
      );
    });
  });
  test.describe("Last Name field warnings", () => {
    test("Last Name is required", async ({ page }) => {
      await expect(page.locator("#signupLastName")).not.toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
      await expect(page.locator("#signupLastName")).toBeVisible();
      await page.locator("#signupLastName").focus();
      await page.locator("#signupLastName").blur();
      await expect(page.locator("#signupLastName")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
      await expect(page.locator(".invalid-feedback")).toBeVisible();
      await expect(page.locator(".invalid-feedback")).toContainText(
        "Last name required",
      );
    });

    test("Last Name is invalid", async ({ page }) => {
      await expect(page.locator("#signupLastName")).not.toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
      await page.locator("#signupLastName").fill("1111");
      await page.locator("#signupLastName").blur();
      await expect(page.locator("#signupLastName")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
      await expect(page.locator(".invalid-feedback")).toBeVisible();
      await expect(page.locator(".invalid-feedback")).toContainText(
        "Last name is invalid",
      );
    });

    test("Last Name has to be from 2 to 20 characters long", async ({
      page,
    }) => {
      await expect(page.locator("#signupLastName")).not.toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
      await page.locator("#signupLastName").fill("S");
      await page.locator("#signupLastName").blur();
      await expect(page.locator("#signupLastName")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
      await expect(page.locator(".invalid-feedback")).toBeVisible();
      await expect(page.locator(".invalid-feedback")).toContainText(
        "Last name has to be from 2 to 20 characters long",
      );
    });
  });

  test.describe("Email field warnings", () => {
    test("Email is required", async ({ page }) => {
      await expect(page.locator("#signupEmail")).not.toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
      await expect(page.locator("#signupEmail")).toBeVisible();
      await page.locator("#signupEmail").focus();
      await page.locator("#signupEmail").blur();
      await expect(page.locator("#signupEmail")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
      await expect(page.locator(".invalid-feedback")).toBeVisible();
      await expect(page.locator(".invalid-feedback")).toContainText(
        "Email required",
      );
    });

    test("Email is incorrect", async ({ page }) => {
      await expect(page.locator("#signupEmail")).not.toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
      await page.locator("#signupEmail").fill("vpgmail.com");
      await page.locator("#signupEmail").blur();
      await expect(page.locator("#signupEmail")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
      await expect(page.locator(".invalid-feedback")).toBeVisible();
      await expect(page.locator(".invalid-feedback")).toContainText(
        "Email is incorrect",
      );
    });
  });

  test.describe("Password field warnings", () => {
    test("Password is required", async ({ page }) => {
      await expect(page.locator("#signupPassword")).not.toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
      await expect(page.locator("#signupPassword")).toBeVisible();
      await page.locator("#signupPassword").focus();
      await page.locator("#signupPassword").blur();
      await expect(page.locator("#signupPassword")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
      await expect(page.locator(".invalid-feedback")).toBeVisible();
      await expect(page.locator(".invalid-feedback")).toContainText(
        "Password required",
      );
    });

    test("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter", async ({
      page,
    }) => {
      await expect(page.locator("#signupPassword")).not.toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
      await expect(page.locator("#signupPassword")).toBeVisible();

      await page.locator("#signupPassword").fill("qwerty");
      await page.locator("#signupPassword").blur();
      await expect(page.locator("#signupPassword")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
      await expect(page.locator(".invalid-feedback")).toBeVisible();
      await expect(page.locator(".invalid-feedback")).toContainText(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
      );
      page.locator("#signupPassword").clear;

      await page.locator("#signupPassword").fill("qwerty123");
      await page.locator("#signupPassword").blur();
      await expect(page.locator("#signupPassword")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );

      await expect(page.locator(".invalid-feedback")).toBeVisible();
      await expect(page.locator(".invalid-feedback")).toContainText(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
      );
    });
  });

  test.describe("Re-enter password field warnings", () => {
    test("Re-enter password required", async ({ page }) => {
      await expect(page.locator("#signupRepeatPassword")).not.toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
      await expect(page.locator("#signupRepeatPassword")).toBeVisible();
      await page.locator("#signupRepeatPassword").focus();
      await page.locator("#signupRepeatPassword").blur();
      await expect(page.locator("#signupRepeatPassword")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
      await expect(page.locator(".invalid-feedback")).toBeVisible();
      await expect(page.locator(".invalid-feedback")).toContainText(
        "Re-enter password required",
      );
    });

    test("Passwords do not match", async ({ page }) => {
      await expect(page.locator("#signupRepeatPassword")).not.toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
      await expect(page.locator("#signupRepeatPassword")).toBeVisible();
      await page.locator("#signupPassword").fill("Qwerty123");
      await page.locator("#signupRepeatPassword").fill("Qwert1234");
      await page.locator("#signupRepeatPassword").blur();
      await expect(page.locator("#signupRepeatPassword")).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)",
      );
      await expect(page.locator(".invalid-feedback")).toBeVisible();
      await expect(page.locator(".invalid-feedback")).toContainText(
        "Passwords do not match",
      );
    });
  });
});

test.describe("Registration process", () => {
  const email = `vp${Date.now()}@test.com`;
  test.describe.configure({ mode: "serial" });

  test("Registration success", async ({ page }) => {
    // await expect(".modal-footer .btn-primary").toBeDisabled();
    await page.locator("#signupName").fill("Leon");
    await page.locator("#signupLastName").fill("Silver");
    await page.locator("#signupEmail").fill(email);
    await page.locator("#signupPassword").fill("Qwerty123");
    await page.locator("#signupRepeatPassword").fill("Qwerty123");
    // await expect(".modal-footer .btn-primary").toBeEnabled();
    await page.locator("#signupName").blur();
    await page.waitForTimeout(1000);
    await page.locator(".modal-footer .btn-primary").click();
    await expect(page).toHaveURL(/\/panel\/garage/);
  });

  test("Registration failed", async ({ page }) => {
    // await expect(".modal-footer .btn-primary").toBeDisabled();
    await page.locator("#signupName").fill("Leon");
    await page.locator("#signupLastName").fill("Silver");
    await page.locator("#signupEmail").fill(email);
    await page.locator("#signupPassword").fill("Qwerty123");
    await page.locator("#signupRepeatPassword").fill("Qwerty123");
    // await expect(".modal-footer .btn-primary").toBeEnabled();
    await page.locator("#signupName").blur();
    await page.waitForTimeout(1000);
    await page.locator(".modal-footer .btn-primary").click();
    await page.waitForTimeout(2000);
    await expect(page.locator(".alert-danger")).toBeVisible();
    await expect(page.locator(".alert-danger")).toContainText(
      "User already exists",
    );
  });
});
