import { test, expect } from "@playwright/test";
test.describe("First test suite", () => {
  test("first test case", async ({ page }) => {
    await page.goto("https://playwright.dev/");
    await expect(page).toHaveTitle(/Playwright/);
  });
});
