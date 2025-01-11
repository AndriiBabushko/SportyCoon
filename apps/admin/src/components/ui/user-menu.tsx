import type { JSX } from "react";
import { useTransition } from "react";
import {
  Avatar,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Skeleton,
  useColorModeValue,
} from "@chakra-ui/react";
import { AdminPages, Button, Paragraph, useLoader } from "@sportycoon/ui";
import { ME_DASHBOARD_LAYOUT, useQuery } from "@sportycoon/api";
import {
  Link,
  TRANSLATES_NAMESPACES,
  useRouter,
  useTranslations,
} from "@sportycoon/locales";
import { setAuthTokens } from "@admin/actions";

export default function UserMenu(): JSX.Element {
  const {
    data: meData,
    refetch: refetchAuthUser,
    loading,
  } = useQuery(ME_DASHBOARD_LAYOUT, {
    errorPolicy: "ignore",
  });
  const router = useRouter();
  const { setTransitionLoading } = useLoader();
  const [_isPending, startTransition] = useTransition();
  const translateUI = useTranslations(TRANSLATES_NAMESPACES.UI);
  const translateDashboard = useTranslations(TRANSLATES_NAMESPACES.DASHBOARD);

  const buttonVariant = useColorModeValue(
    "outline-primary",
    "outline-secondary"
  );

  const onLogout = (): void => {
    startTransition(async () => {
      setTransitionLoading(true);
      try {
        await setAuthTokens({
          access_token: "",
          refresh_token: "",
        });
        await refetchAuthUser();
        router.push(AdminPages.ROOT);
      } catch (e) {
        console.error("Error on logout", e);
      } finally {
        setTransitionLoading(false);
      }
    });
  };

  return (
    <Skeleton isLoaded={!loading}>
      {!meData ? (
        <Link href={AdminPages.AUTH}>
          <Button variant={buttonVariant}>{translateUI("SIGNUP_LOGIN")}</Button>
        </Link>
      ) : (
        <Menu>
          <MenuButton>
            <Avatar
              size="sm"
              src="https://i.pinimg.com/736x/43/3e/7e/433e7e7ed9a4cd23b563663e8fe65c5e.jpg"
            />
          </MenuButton>
          <MenuList>
            <MenuItem value="account">
              <Link
                className="flex flex-row gap-[8px] items-center"
                href={AdminPages.ACCOUNT}
              >
                <Avatar
                  size="md"
                  src="https://i.pinimg.com/736x/43/3e/7e/433e7e7ed9a4cd23b563663e8fe65c5e.jpg"
                />
                <Paragraph className="text-[16px]" variant="montserratBold">
                  {meData.me.username || translateDashboard("NO_USERNAME")}
                </Paragraph>
              </Link>
            </MenuItem>
            <MenuDivider />
            <MenuItem value="fullName">
              <Paragraph className="text-[18px]" variant="montserratBold">
                {meData.me.full_name || translateDashboard("NO_FULL_NAME")}
              </Paragraph>
            </MenuItem>
            <MenuItem value="dashboard">
              <Link
                className="flex flex-row gap-[8px] items-center"
                href={AdminPages.DASHBOARD}
              >
                <Paragraph className="text-[14px]" variant="montserrat">
                  {translateDashboard("TITLE")}
                </Paragraph>
              </Link>
            </MenuItem>
            <MenuItem value="account">
              <Link
                className="flex flex-row gap-[8px] items-center"
                href={AdminPages.ACCOUNT_SETTINGS}
              >
                <Paragraph className="text-[14px]" variant="montserrat">
                  {translateDashboard("SETTINGS")}
                </Paragraph>
              </Link>
            </MenuItem>
            <MenuItem onClick={onLogout} value="logout">
              <Paragraph className="text-[14px]" variant="montserrat">
                {translateDashboard("LOGOUT")}
              </Paragraph>
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </Skeleton>
  );
}
