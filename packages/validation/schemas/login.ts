import { z } from "zod";
import type { TranslationFunc } from "@sportycoon/locales";

export enum LOGIN_SCHEMA {
  EMAIl = "email",
  PASSWORD = "password",
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getLoginSchema = (t: TranslationFunc) => {
  return z.object({
    [LOGIN_SCHEMA.EMAIl]: z.string().email(t("ERRORS.INVALID_EMAIL")),
    [LOGIN_SCHEMA.PASSWORD]: z.string().min(6, t("ERRORS.PASSWORD_TOO_SHORT")),
  });
};

export type TLoginSchema = z.infer<ReturnType<typeof getLoginSchema>>;
