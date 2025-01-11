import type { getTranslations } from "next-intl/server";

export type TranslationFunc = Awaited<
  ReturnType<typeof getTranslations<string>>
>;

export * from "./constants";
export * from "./enums";
export * from "./routing";
export * from "./i18n-fixture";
export {
  useLocale,
  useTranslations,
  NextIntlClientProvider,
  type TranslationValues,
  type AbstractIntlMessages,
} from "next-intl";
export {
  getMessages,
  setRequestLocale,
  getTranslations,
} from "next-intl/server";
