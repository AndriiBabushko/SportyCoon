"use client";

import type { JSX } from "react";
import { useEffect, useTransition } from "react";
import { useGoogleAuth } from "@sportycoon/api";
import { useRouter } from "next/navigation";
import { AdminPages } from "@sportycoon/ui/lib";
import { setAuthTokens } from "@admin/actions";

interface ContentProps {
  code: string;
  locale: string;
}

export default function Content({
  code,
  locale,
}: ContentProps): JSX.Element | null {
  const {
    data: googleResponse,
    isError,
    error,
    isSuccess,
  } = useGoogleAuth({ code });
  const router = useRouter();
  const [_isPending, startTransition] = useTransition();

  useEffect(() => {
    if (isSuccess) {
      startTransition(async () => {
        await setAuthTokens({
          access_token: googleResponse.data.access_token,
          refresh_token: googleResponse.data.refresh_token,
        });
        router.replace(`/${locale}${AdminPages.DASHBOARD}`);
      });
    }
  }, [isSuccess, googleResponse, router, locale]);

  if (isError) {
    throw new Error(error.message);
  }

  return null;
}
