"use client";

import type { JSX } from "react";
import { useEffect, useTransition } from "react";
import { useSpotifyAuth } from "@sportycoon/api";
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
    data: spotifyResponse,
    isSuccess,
    isError,
    error,
  } = useSpotifyAuth({ code });
  const router = useRouter();
  const [_isPending, startTransition] = useTransition();

  useEffect(() => {
    if (isSuccess) {
      startTransition(async () => {
        await setAuthTokens({
          access_token: spotifyResponse.data.access_token,
          refresh_token: spotifyResponse.data.refresh_token,
        });
        router.replace(`/${locale}${AdminPages.DASHBOARD}`);
      });
    }
  }, [isSuccess, spotifyResponse, router, locale]);

  if (isError) {
    throw new Error(error.message);
  }

  return null;
}
