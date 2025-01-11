import { expect } from "@playwright/test";
import { ADMIN_HOST, test } from "@sportycoon/tests";

test.describe("Home Page", () => {
  test("should display the main header and navigation links", async ({
    page,
    t,
  }) => {
    await page.goto(`${ADMIN_HOST}/en`);

    const mainHeader = page.getByRole("heading", {
      name: t("HOME.HERO.TITLE"),
    });
    await expect(mainHeader).toBeVisible();

    const heroDescription = page.getByText(t("HOME.HERO.DESCRIPTION"));
    await expect(heroDescription).toBeVisible();

    const heroButton = page.getByRole("button", {
      name: t("HOME.HERO.BUTTON"),
    });
    await expect(heroButton).toBeVisible();
  });

  test("should display features section with correct content", async ({
    page,
    t,
  }) => {
    await page.goto(`${ADMIN_HOST}/en`);

    const featuresHeader = page.getByRole("heading", {
      name: t("HOME.FEATURES.TITLE"),
    });
    await expect(featuresHeader).toBeVisible();

    const features: string[] = [
      t("HOME.FEATURES.FEATURE_1"),
      t("HOME.FEATURES.FEATURE_2"),
      t("HOME.FEATURES.FEATURE_3"),
      t("HOME.FEATURES.FEATURE_4"),
    ];

    for (const feature of features) {
      const featureText = page.getByText(feature);
      // eslint-disable-next-line no-await-in-loop -- This is a test
      await expect(featureText).toBeVisible();
    }
  });

  test("should display about section with correct content", async ({
    page,
    t,
  }) => {
    await page.goto(`${ADMIN_HOST}/en`);

    const aboutHeader = page.getByRole("heading", {
      name: t("HOME.ABOUT.TITLE"),
    });
    await expect(aboutHeader).toBeVisible();

    const aboutDescription = page.getByText(t("HOME.ABOUT.DESCRIPTION"));
    await expect(aboutDescription).toBeVisible();

    const aboutImage = page.getByAltText(t("HOME.ABOUT.IMAGE_ALT"));
    await expect(aboutImage).toBeVisible();
  });

  test("should display contact section with correct content", async ({
    page,
    t,
  }) => {
    await page.goto(`${ADMIN_HOST}/en`);

    const contactHeader = page.getByRole("heading", {
      name: t("HOME.CONTACT.TITLE"),
    });
    await expect(contactHeader).toBeVisible();

    const contactDetails: string[] = [
      t("HOME.CONTACT.EMAIL"),
      t("HOME.CONTACT.PHONE"),
      t("HOME.CONTACT.ADDRESS"),
    ];

    for (const detail of contactDetails) {
      const contactText = page.getByText(detail);
      // eslint-disable-next-line no-await-in-loop -- This is a test
      await expect(contactText).toBeVisible();
    }
  });

  test("should navigate to Login and Register pages", async ({ page, t }) => {
    await page.goto(`${ADMIN_HOST}/en`);

    const loginSignUpButton = page.getByRole("button", {
      name: t("UI.SIGNUP_LOGIN"),
    });
    await loginSignUpButton.click();
    await page.waitForURL(`${ADMIN_HOST}/en/auth`);
    expect(page.url()).toBe(`${ADMIN_HOST}/en/auth`);
  });
});
