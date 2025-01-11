"use client";

import type { JSX, ReactNode } from "react";
import { Box, Flex, Stack, useColorModeValue } from "@chakra-ui/react";
import { Icons } from "@sportycoon/ui";
import { ThemeToggle, UserMenu, LanguageSwitcher } from "@admin/components/ui";

interface RootLayoutProps {
  children: JSX.Element | ReactNode;
}

export default function DashboardLayout({
  children,
}: RootLayoutProps): JSX.Element {
  const bg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const logoFill = useColorModeValue("fill-gray-800", "fill-white");

  return (
    <>
      <Box
        bg={bg}
        color={textColor}
        position="sticky"
        px={6}
        py={4}
        shadow="md"
        suppressHydrationWarning
        top={0}
        zIndex={10}
      >
        <Flex alignItems="center" justifyContent="space-between">
          <Icons.SportycoonRaccoonLogo
            className={logoFill}
            height={64}
            width={120}
          />

          <Flex alignItems="center">
            <Stack align="center" direction="row" gap={4}>
              <LanguageSwitcher />

              <ThemeToggle />

              <UserMenu />
            </Stack>
          </Flex>
        </Flex>
      </Box>
      <Box as="main">{children}</Box>
    </>
  );
}
