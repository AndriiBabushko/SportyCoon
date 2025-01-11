import type { NextFetchEvent, NextMiddleware, NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { apolloClient, ME } from "@sportycoon/api";
import { AdminPages, COOKIE_NAMES } from "@sportycoon/ui";
import { cookies } from "next/headers";

const ignoredPaths = [AdminPages.REGISTER, AdminPages.AUTH, AdminPages.LOGIN];
const authPaths = [AdminPages.REGISTER, AdminPages.AUTH, AdminPages.LOGIN];

export function withAuthMiddleware(middleware: NextMiddleware) {
  return async (req: NextRequest, event: NextFetchEvent) => {
    const { nextUrl } = req;
    const cookieStore = cookies();
    const accessToken = cookieStore.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;
    const refreshToken = cookieStore.get(COOKIE_NAMES.REFRESH_TOKEN)?.value;
    const locale = nextUrl.locale || "en";
    let path = nextUrl.pathname;

    console.log(1);

    if (!path.startsWith(`/${locale}`)) {
      path = `/${locale}${path.replace(/^\/(?<lang>ua|en)/, "")}`;
      console.log("Normalized path:", path);
    }

    if (
      (ignoredPaths.some((ignoredPath) =>
        path.includes(`/${locale}${ignoredPath}`)
      ) ||
        path === `/${locale}`) &&
      !accessToken
    ) {
      return middleware(req, event);
    }

    console.log(2);

    if (!accessToken) {
      return NextResponse.redirect(
        new URL(`/${locale}${AdminPages.AUTH}`, req.url)
      );
    }

    console.log(3);

    try {
      const { data: meData } = await apolloClient.query({
        query: ME,
        context: {
          getAuthTokens: async () => {
            return new Promise((resolve, reject) => {
              try {
                resolve({
                  access_token: accessToken,
                  refresh_token: refreshToken,
                });
              } catch (error) {
                reject(new Error(`Unexpected error: ${error as string}`));
              }
            });
          },
        },
      });
      console.log(4);

      if (!meData.me.email) {
        return NextResponse.redirect(
          new URL(`/${locale}${AdminPages.AUTH}`, req.url)
        );
      }
      console.log(5);

      if (
        authPaths.some((authPath) => path.includes(`/${locale}${authPath}`))
      ) {
        return NextResponse.redirect(
          new URL(`/${locale}${AdminPages.DASHBOARD}`, req.url)
        );
      }

      // if (refreshToken) {
      //   const { data: refreshTokenData } = await apolloClient.mutate({
      //     mutation: REFRESH_TOKEN,
      //     variables: {
      //       input: {
      //         refresh_token: refreshToken,
      //       },
      //     },
      //   });
      //
      //   if (refreshTokenData?.refreshToken.access_token) {
      //     cookieStore.set(
      //       COOKIE_NAMES.ACCESS_TOKEN,
      //       refreshTokenData.refreshToken.access_token
      //     );
      //     cookieStore.set(
      //       COOKIE_NAMES.REFRESH_TOKEN,
      //       refreshTokenData.refreshToken.refresh_token
      //     );
      //   }
      //
      //   return middleware(req, event);
      // }
    } catch (error) {
      // eslint-disable-next-line no-console -- This is a temporary solution
      console.log(error);
      // return NextResponse.redirect(
      //   new URL(`/${locale}${AdminPages.AUTH}`, req.url)
      // );
    }

    console.log(6);

    return middleware(req, event);
  };
}
