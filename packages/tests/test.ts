import { test as base } from "@playwright/test";
import { i18nFixture } from "@sportycoon/locales";

export const test = base.extend(i18nFixture).extend({
  i18n: async ({ i18n, locale }, use) => {
    if (locale === "ua") {
      i18n.changeLanguage("ua");
      await use(i18n);
    } else {
      i18n.changeLanguage("en");
      await use(i18n);
    }
  },
});
