import { z } from "zod";
import type { TranslationFunc } from "@sportycoon/locales";
import { FitnessLevel, Gender, HeightUnit, WeightUnit } from "@sportycoon/api";
import { goalOptionSchema } from "./goal-option";

export enum ACCOUNT_SCHEMA {
  USERNAME = "username",
  EMAIL = "email",
  FULL_NAME = "full_name",
  GENDER = "gender",
  HEIGHT_VALUE = "height_value",
  HEIGHT_UNIT = "height_unit",
  WEIGHT_VALUE = "weight_value",
  WEIGHT_UNIT = "weight_unit",
  GOALS = "goals",
  GOAL_WEIGHT_VALUE = "goal_weight_value",
  GOAL_WEIGHT_UNIT = "goal_weight_unit",
  FITNESS_LEVEL = "fitness_level",
  PERFORMANCE_PULL_UPS = "performance_max_pull_ups",
  PERFORMANCE_PUSH_UPS = "performance_max_push_ups",
  PERFORMANCE_SQUATS = "performance_max_squats",
  PERFORMANCE_DIPS = "performance_max_dips",
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getAccountSchema = (t: TranslationFunc) => {
  return z.object({
    [ACCOUNT_SCHEMA.USERNAME]: z.string().min(1, t("ERRORS.USERNAME_REQUIRED")),
    [ACCOUNT_SCHEMA.EMAIL]: z.string().email(t("ERRORS.INVALID_EMAIL")),
    [ACCOUNT_SCHEMA.FULL_NAME]: z
      .string()
      .min(1, t("ERRORS.FULL_NAME_REQUIRED")),
    [ACCOUNT_SCHEMA.GENDER]: z.nativeEnum(Gender, {
      message: t("ERRORS.GENDER_REQUIRED"),
    }),
    [ACCOUNT_SCHEMA.HEIGHT_VALUE]: z
      .number()
      .positive(t("ERRORS.HEIGHT_REQUIRED"))
      .optional()
      .nullable(),
    [ACCOUNT_SCHEMA.HEIGHT_UNIT]: z
      .nativeEnum(HeightUnit, {
        message: t("ERRORS.UNIT_REQUIRED"),
      })
      .optional()
      .nullable(),
    [ACCOUNT_SCHEMA.WEIGHT_VALUE]: z
      .number()
      .positive(t("ERRORS.WEIGHT_REQUIRED"))
      .optional()
      .nullable(),
    [ACCOUNT_SCHEMA.WEIGHT_UNIT]: z
      .nativeEnum(WeightUnit, {
        message: t("ERRORS.UNIT_REQUIRED"),
      })
      .optional()
      .nullable(),
    [ACCOUNT_SCHEMA.GOAL_WEIGHT_VALUE]: z
      .number()
      .positive(t("ERRORS.GOAL_WEIGHT_REQUIRED"))
      .optional()
      .nullable(),
    [ACCOUNT_SCHEMA.GOAL_WEIGHT_UNIT]: z
      .nativeEnum(WeightUnit, {
        message: t("ERRORS.GOAL_UNIT_REQUIRED"),
      })
      .optional()
      .nullable(),
    [ACCOUNT_SCHEMA.GOALS]: goalOptionSchema.array().optional().nullable(),
    [ACCOUNT_SCHEMA.FITNESS_LEVEL]: z
      .nativeEnum(FitnessLevel, {
        message: t("ERRORS.FITNESS_LEVEL_REQUIRED"),
      })
      .optional()
      .nullable(),
    [ACCOUNT_SCHEMA.PERFORMANCE_PULL_UPS]: z
      .number()
      .min(1, t("ERRORS.PERFORMANCE_REQUIRED"))
      .optional()
      .nullable(),
    [ACCOUNT_SCHEMA.PERFORMANCE_PUSH_UPS]: z
      .number()
      .min(1, t("ERRORS.PERFORMANCE_REQUIRED"))
      .optional()
      .nullable(),
    [ACCOUNT_SCHEMA.PERFORMANCE_SQUATS]: z
      .number()
      .min(1, t("ERRORS.PERFORMANCE_REQUIRED"))
      .optional()
      .nullable(),
    [ACCOUNT_SCHEMA.PERFORMANCE_DIPS]: z
      .number()
      .min(1, t("ERRORS.PERFORMANCE_REQUIRED"))
      .optional()
      .nullable(),
  });
};

export type TAccountSchema = z.infer<ReturnType<typeof getAccountSchema>>;
