"use server";

import { cookies } from "next/headers";
import { COOKIE_NAMES } from "@sportycoon/ui";
import type { AuthTokens } from "@admin/types";

export default async function setAuthTokens(tokens: AuthTokens): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      const cookieStore = cookies();

      cookieStore.set(
        COOKIE_NAMES.ACCESS_TOKEN as string,
        tokens.access_token || ""
      );

      cookieStore.set(
        COOKIE_NAMES.REFRESH_TOKEN as string,
        tokens.refresh_token || ""
      );

      resolve();
    } catch (error) {
      reject(new Error(`Unexpected error: ${error as string}`));
    }
  });
}
