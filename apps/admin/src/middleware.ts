import createMiddleware from "@sportycoon/locales/middleware";
import { withAuthMiddleware } from "./middleware/auth";

export default withAuthMiddleware(createMiddleware);

export const config = {
  matcher: ["/", "/(en|ua)/:path*", "/((?!_next|_vercel|.*\\..*).*)"],
};
