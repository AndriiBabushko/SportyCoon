"use client";

import type { JSX } from "react";
import { Box, HStack, useColorModeValue, VStack } from "@chakra-ui/react";
import { Heading, Button, AdminPages, Icons } from "@sportycoon/ui";
import {
  TRANSLATES_NAMESPACES,
  useTranslations,
  Link,
} from "@sportycoon/locales";

export default function Content(): JSX.Element {
  const translateAuth = useTranslations(TRANSLATES_NAMESPACES.AUTH);

  const bgColor = useColorModeValue("gray.100", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const iconsFill = useColorModeValue("fill-primary", "fill-secondary");
  const loginRegisterVariant = useColorModeValue("primary", "secondary");

  return (
    <Box
      alignItems="center"
      bg={bgColor}
      color={textColor}
      display="flex"
      justifyContent="center"
      minHeight="100vh"
      p={6}
    >
      <VStack
        align="center"
        bg={cardBg}
        borderRadius="md"
        boxShadow="lg"
        gap={6}
        maxW="lg"
        p={8}
        width="100%"
      >
        <Box mb={4}>
          <Icons.SportycoonLogo height={60} />
        </Box>

        <Heading as="h1" className="text-[24px]" variant="montserratBold">
          {translateAuth("TITLE")}
        </Heading>

        <HStack gap={4} justify="center" width="100%">
          <Link className="w-full" href={AdminPages.LOGIN}>
            <Button fullWidth size="xl" variant={loginRegisterVariant}>
              {translateAuth("LOGIN")}
            </Button>
          </Link>
          <Link className="w-full" href={AdminPages.REGISTER}>
            <Button fullWidth size="xl" variant={loginRegisterVariant}>
              {translateAuth("REGISTER")}
            </Button>
          </Link>
        </HStack>

        <HStack gap={4} justify="center" width="100%">
          <Link
            href={`${process.env.NEXT_PUBLIC_SPORTYCOON_API_URL}/auth/spotify`}
          >
            <Icons.Spotify className={iconsFill} height={50} width={50} />
          </Link>
          <Link
            href={`${process.env.NEXT_PUBLIC_SPORTYCOON_API_URL}/auth/google`}
          >
            <Icons.Google className={iconsFill} height={50} width={50} />
          </Link>
        </HStack>
      </VStack>
    </Box>
  );
}
