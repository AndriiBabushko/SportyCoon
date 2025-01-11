import { expect } from "@playwright/test";
import { AdminPages } from "@sportycoon/ui";
import {
  FitnessLevel,
  Gender,
  Goal,
  HeightUnit,
  WeightUnit,
} from "@sportycoon/api";
import { REGISTER_SCHEMA } from "@sportycoon/validation";
import { ADMIN_HOST, test } from "@sportycoon/tests";

// const errorsCount = await page.locator('p[data-info-type="error"]').count();
// console.log(`Errors count: ${errorsCount}`);
// console.log(
//   await page.locator('p[data-info-type="error"]').allInnerTexts()
// );

test.describe("Registration Page", () => {
  test("should display the registration form and successfully register new user", async ({
    page,
    t,
  }) => {
    const randomNumber = Math.floor(Math.random() * 1000000) + 1;
    await page.goto(`${ADMIN_HOST}/en${AdminPages.REGISTER}`);

    // Step 1: Account Details
    const usernameInput = page.locator(
      `input[name="${REGISTER_SCHEMA.USERNAME}"]`
    );
    await expect(usernameInput).toBeVisible();
    await usernameInput.fill(`andriibabushko${randomNumber}`);

    const emailInput = page.locator(`input[name="${REGISTER_SCHEMA.EMAIL}"]`);
    await expect(emailInput).toBeVisible();
    await emailInput.fill(`andriibabushko${randomNumber}@gmail.com`);

    const fullNameInput = page.locator(
      `input[name="${REGISTER_SCHEMA.FULL_NAME}"]`
    );
    await expect(fullNameInput).toBeVisible();
    await fullNameInput.fill("Andrii Babushko");

    const passwordInput = page.locator(
      `input[name="${REGISTER_SCHEMA.PASSWORD}"]`
    );
    await expect(passwordInput).toBeVisible();
    await passwordInput.fill("qwerty12345");

    const genderSelect = page.locator(
      `select[name="${REGISTER_SCHEMA.GENDER}"]`
    );
    await expect(genderSelect).toBeVisible();
    await genderSelect.selectOption(Gender.Male);

    const nextButton = page.getByRole("button", {
      name: t("REGISTER.BUTTONS.NEXT"),
    });
    await expect(nextButton).toBeVisible();
    await nextButton.click();

    // Step 2: Physical Info
    const heightInput = page.locator(
      `input[name="${REGISTER_SCHEMA.HEIGHT_VALUE}"]`
    );
    await expect(heightInput).toBeVisible();
    await heightInput.fill("192");

    const heightUnitSelect = page.locator(
      `select[name="${REGISTER_SCHEMA.HEIGHT_UNIT}"]`
    );
    await expect(heightUnitSelect).toBeVisible();
    await heightUnitSelect.selectOption(HeightUnit.Cm);

    const weightInput = page.locator(
      `input[name="${REGISTER_SCHEMA.WEIGHT_VALUE}"]`
    );
    await expect(weightInput).toBeVisible();
    await weightInput.fill("72");

    const weightUnitSelect = page.locator(
      `select[name="${REGISTER_SCHEMA.WEIGHT_UNIT}"]`
    );
    await expect(weightUnitSelect).toBeVisible();
    await weightUnitSelect.selectOption(WeightUnit.Kg);

    await nextButton.click();

    // Step 3: Goals and Fitness
    const goalsSelect = page.locator(`input[id="${REGISTER_SCHEMA.GOALS}"]`);
    await expect(goalsSelect).toBeVisible();
    await goalsSelect.focus();
    await goalsSelect.fill(Goal.BuildMuscle);
    await page.keyboard.down("Tab");

    const goalWeightInput = page.locator(
      `input[name="${REGISTER_SCHEMA.GOAL_WEIGHT_VALUE}"]`
    );
    await expect(goalWeightInput).toBeVisible();
    await goalWeightInput.fill("80");

    const goalWeightUnitSelect = page.locator(
      `select[name="${REGISTER_SCHEMA.GOAL_WEIGHT_UNIT}"]`
    );
    await expect(goalWeightUnitSelect).toBeVisible();
    await goalWeightUnitSelect.selectOption(WeightUnit.Kg);

    const fitnessLevelSelect = page.locator(
      `select[name="${REGISTER_SCHEMA.FITNESS_LEVEL}"]`
    );
    await expect(fitnessLevelSelect).toBeVisible();
    await fitnessLevelSelect.selectOption(FitnessLevel.Intermediate);

    await nextButton.click();

    // Step 4: Performance
    const performancePullUps = page.locator(
      `input[name="${REGISTER_SCHEMA.PERFORMANCE_PULL_UPS}"]`
    );
    await expect(performancePullUps).toBeVisible();
    await performancePullUps.fill("20");

    const performancePushUps = page.locator(
      `input[name="${REGISTER_SCHEMA.PERFORMANCE_PUSH_UPS}"]`
    );
    await expect(performancePushUps).toBeVisible();
    await performancePushUps.fill("40");

    const performanceSquats = page.locator(
      `input[name="${REGISTER_SCHEMA.PERFORMANCE_SQUATS}"]`
    );
    await expect(performanceSquats).toBeVisible();
    await performanceSquats.fill("50");

    const performanceDips = page.locator(
      `input[name="${REGISTER_SCHEMA.PERFORMANCE_DIPS}"]`
    );
    await expect(performanceDips).toBeVisible();
    await performanceDips.fill("15");

    const submitButton = page.getByRole("button", {
      name: t("REGISTER.BUTTONS.SUBMIT"),
    });
    await expect(submitButton).toBeVisible();
    await submitButton.click();

    await page.waitForURL(`${ADMIN_HOST}/en${AdminPages.DASHBOARD}`);
    expect(page.url()).toBe(`${ADMIN_HOST}/en${AdminPages.DASHBOARD}`);
  });

  test("should show error messages when submitting incomplete step", async ({
    page,
    t,
  }) => {
    await page.goto(`${ADMIN_HOST}/en${AdminPages.REGISTER}`);

    const nextButton = page.getByRole("button", {
      name: t("REGISTER.BUTTONS.NEXT"),
    });
    await nextButton.click();

    const usernameError = page.getByText(
      t("REGISTER.ERRORS.USERNAME_REQUIRED")
    );
    await expect(usernameError).toBeVisible();

    const emailError = page.getByText(t("REGISTER.ERRORS.INVALID_EMAIL"));
    await expect(emailError).toBeVisible();

    const fullNameError = page.getByText(
      t("REGISTER.ERRORS.FULL_NAME_REQUIRED")
    );
    await expect(fullNameError).toBeVisible();

    const passwordError = page.getByText(
      t("REGISTER.ERRORS.PASSWORD_TOO_SHORT")
    );
    await expect(passwordError).toBeVisible();

    const genderError = page.getByText(t("REGISTER.ERRORS.GENDER_REQUIRED"));
    await expect(genderError).toBeVisible();
  });
});
