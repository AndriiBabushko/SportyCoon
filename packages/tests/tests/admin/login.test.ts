import { expect } from "@playwright/test";
import { AdminPages } from "@sportycoon/ui";
import { ADMIN_HOST, test } from "@sportycoon/tests";

test.describe("Login Page", () => {
  test("should display the login form with required elements", async ({
    page,
    t,
  }) => {
    await page.goto(`${ADMIN_HOST}/en${AdminPages.LOGIN}`);

    const pageTitle = page.locator("h1");
    await expect(pageTitle).toHaveText(t("LOGIN.TITLE"));

    const emailInput = page.locator(`input[type="email"]`);
    await expect(emailInput).toBeVisible();

    const passwordInput = page.locator('input[type="password"]');
    await expect(passwordInput).toBeVisible();

    const loginButton = page.getByRole("button", {
      name: t("LOGIN.LOGIN_BUTTON_CAPTION"),
    });
    await expect(loginButton).toBeVisible();
    await expect(loginButton).toBeEnabled();
  });

  test("should show error messages when submitting empty form", async ({
    page,
    t,
  }) => {
    await page.goto(`${ADMIN_HOST}/en${AdminPages.LOGIN}`);

    const loginButton = page.getByRole("button", {
      name: t("LOGIN.LOGIN_BUTTON_CAPTION"),
    });

    await loginButton.click();

    const emailError = page.getByText(t("LOGIN.ERRORS.INVALID_EMAIL"));
    await expect(emailError).toBeVisible();

    const passwordError = page.getByText(t("LOGIN.ERRORS.PASSWORD_TOO_SHORT"));
    await expect(passwordError).toBeVisible();
  });

  test("should login successfully with valid credentials", async ({
    page,
    t,
  }) => {
    await page.goto(`${ADMIN_HOST}/en${AdminPages.LOGIN}`);

    const emailInput = page.locator(`input[type="email"]`);
    const passwordInput = page.locator('input[type="password"]');
    await emailInput.fill("andriibabushko2@gmail.com");
    await passwordInput.fill("qwerty12345");

    const loginButton = page.getByRole("button", {
      name: t("LOGIN.LOGIN_BUTTON_CAPTION"),
    });
    await loginButton.click();

    await page.waitForURL(`${ADMIN_HOST}/en${AdminPages.DASHBOARD}`);
    expect(page.url()).toBe(`${ADMIN_HOST}/en${AdminPages.DASHBOARD}`);
  });

  test("should display error message for invalid credentials", async ({
    page,
    t,
  }) => {
    await page.goto(`${ADMIN_HOST}/en${AdminPages.LOGIN}`);

    const emailInput = page.locator(`input[type="email"]`);
    const passwordInput = page.locator('input[type="password"]');
    await emailInput.fill("wronguser@gmail.com");
    await passwordInput.fill("wrongpassword");

    const loginButton = page.getByRole("button", {
      name: t("LOGIN.LOGIN_BUTTON_CAPTION"),
    });
    await loginButton.click();

    const loginError = page.getByText("User not found");
    await expect(loginError).toBeVisible();
  });
});
