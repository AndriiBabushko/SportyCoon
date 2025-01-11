import { z } from "zod";
import { Goal } from "@sportycoon/api";

export const goalOptionSchema = z.object({
  label: z.string(),
  value: z.nativeEnum(Goal),
});

export type GoalOption = z.infer<typeof goalOptionSchema>;
