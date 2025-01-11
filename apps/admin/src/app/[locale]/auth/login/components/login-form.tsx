"use client";

import type { JSX } from "react";
import React, { useEffect, useState, useTransition } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import {
  getLoginSchema,
  LOGIN_SCHEMA,
  zodResolver,
} from "@sportycoon/validation";
import type { TLoginSchema } from "@sportycoon/validation";
import {
  AdminPages,
  Button,
  TextInfo,
  FormErrorBox,
  Heading,
  useLoader,
} from "@sportycoon/ui";
import type { ApolloError } from "@sportycoon/api";
import { LOGIN as LOGIN_GQL, useMutation } from "@sportycoon/api";
import { useRouter } from "next/navigation";
import {
  Box,
  useColorModeValue,
  VStack,
  Input,
  Flex,
  useToast,
} from "@chakra-ui/react";
import {
  TRANSLATES_NAMESPACES,
  useTranslations,
} from "@sportycoon/locales";
import { setAuthTokens } from "@admin/actions";
import { PasswordInput } from "@admin/components/common";

export function LoginForm(): JSX.Element {
  const [loginError, setLoginError] = useState<ApolloError | undefined>(
    undefined
  );
  const [login] = useMutation(LOGIN_GQL, {
    onError: (error) => {
      setLoginError(error);
    },
  });
  const toast = useToast();
  const router = useRouter();
  const { setTransitionLoading } = useLoader();
  const translate = useTranslations(TRANSLATES_NAMESPACES.LOGIN);
  const [_isPending, startTransition] = useTransition();
  const { control, register, handleSubmit, formState } = useForm<TLoginSchema>({
    resolver: zodResolver(getLoginSchema(translate)),
    mode: "onSubmit",
  });
  const bgColor = useColorModeValue("gray.100", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const buttonVariant = useColorModeValue("primary", "secondary");

  const onSubmit: SubmitHandler<TLoginSchema> = async ({ email, password }) => {
    const response = await login({
      variables: {
        input: {
          email,
          password,
        },
      },
    });

    if (
      response.data?.login.access_token &&
      response.data.login.refresh_token
    ) {
      startTransition(async () => {
        setTransitionLoading(true);
        try {
          if (response.data) {
            await setAuthTokens({
              access_token: response.data.login.access_token,
              refresh_token: response.data.login.refresh_token,
            });
            router.push(AdminPages.DASHBOARD);
          }
        } catch (e) {
          console.error("Error on login", e);
        } finally {
          setTransitionLoading(false);
        }
      });
    }
  };

  useEffect(() => {
    if (loginError) {
      toast({
        title: "An error occurred.",
        description: loginError.message,
        position: "top-right",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [loginError, toast]);

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
      <Box
        bg={cardBg}
        borderRadius="md"
        boxShadow="lg"
        gap={6}
        maxW="2xl"
        p={{ base: "16px", md: "24px" }}
        width="100%"
      >
        <Box
          as="form"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          margin="auto"
          maxW="lg"
          width="100%"
        >
          <VStack spacing="16px">
            <Heading className="text-[24px]" variant="montserratBold">
              {translate("TITLE")}
            </Heading>

            <VStack alignItems="stretch" spacing="8px" width="100%">
              <Input
                id={LOGIN_SCHEMA.EMAIl}
                type="email"
                {...register(LOGIN_SCHEMA.EMAIl)}
                placeholder={translate("EMAIL_PLACEHOLDER")}
              />

              {formState.errors[LOGIN_SCHEMA.EMAIl]?.message ? (
                <FormErrorBox>
                  <TextInfo type="error">
                    {formState.errors[LOGIN_SCHEMA.EMAIl].message}
                  </TextInfo>
                </FormErrorBox>
              ) : null}
            </VStack>

            <VStack alignItems="stretch" spacing="8px" width="100%">
              <PasswordInput<TLoginSchema>
                control={control}
                name={LOGIN_SCHEMA.PASSWORD}
                placeholder="Password"
              />
            </VStack>
          </VStack>
        </Box>

        <Flex justifyContent="end" mt={6}>
          <Button
            onClick={handleSubmit(onSubmit)}
            size="xl"
            variant={buttonVariant}
          >
            {translate("LOGIN_BUTTON_CAPTION")}
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}
