"use client";

import type { JSX } from "react";
import React, { useEffect, useState, useTransition } from "react";
import {
  Box,
  Flex,
  Input,
  Select,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
  useBreakpointValue,
  useColorModeValue,
  useSteps,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import type { TRegisterSchema, GoalOption } from "@sportycoon/validation";
import {
  getRegisterSchema,
  REGISTER_SCHEMA,
  zodResolver,
} from "@sportycoon/validation";
import type { ApolloError } from "@sportycoon/api";
import {
  FitnessLevel,
  Gender,
  Goal,
  HeightUnit,
  REGISTER,
  useMutation,
  WeightUnit,
} from "@sportycoon/api";
import { TRANSLATES_NAMESPACES, useTranslations } from "@sportycoon/locales";
import {
  AdminPages,
  Button,
  FormErrorBox,
  Heading,
  TextInfo,
  useLoader,
} from "@sportycoon/ui";
import { useRouter } from "next/navigation";
import { ControlledSelect } from "@admin/components/ui";
import { setAuthTokens } from "@admin/actions";
import { PasswordInput } from "@admin/components/common";

export function RegisterForm(): JSX.Element {
  const [registerError, setRegisterError] = useState<ApolloError | undefined>(
    undefined
  );
  const [registerUser] = useMutation(REGISTER, {
    onError: (error) => {
      setRegisterError(error);
    },
  });
  const toast = useToast();
  const translate = useTranslations(TRANSLATES_NAMESPACES.REGISTER);
  const router = useRouter();
  const { setTransitionLoading } = useLoader();
  const [_isPending, startTransition] = useTransition();
  const steps = [
    translate("STEPS.ACCOUNT_DETAILS"),
    translate("STEPS.PHYSICAL_INFO"),
    translate("STEPS.GOALS_FITNESS"),
    translate("STEPS.PERFORMANCE"),
  ];
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });
  const bgColor = useColorModeValue("gray.100", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const buttonVariant = useColorModeValue("primary", "secondary");
  const stepperOrientation = useBreakpointValue(
    {
      base: "horizontal" as const,
      md: "vertical" as const,
    },
    { ssr: false }
  );

  const defaultValues = {
    [REGISTER_SCHEMA.USERNAME]: "",
    [REGISTER_SCHEMA.EMAIL]: "",
    [REGISTER_SCHEMA.PASSWORD]: "",
    [REGISTER_SCHEMA.FULL_NAME]: "",
    [REGISTER_SCHEMA.GENDER]: undefined,
    [REGISTER_SCHEMA.HEIGHT_VALUE]: 0,
    [REGISTER_SCHEMA.HEIGHT_UNIT]: undefined,
    [REGISTER_SCHEMA.WEIGHT_VALUE]: 0,
    [REGISTER_SCHEMA.WEIGHT_UNIT]: undefined,
    [REGISTER_SCHEMA.GOALS]: [],
    [REGISTER_SCHEMA.GOAL_WEIGHT_VALUE]: 0,
    [REGISTER_SCHEMA.GOAL_WEIGHT_UNIT]: undefined,
    [REGISTER_SCHEMA.FITNESS_LEVEL]: undefined,
    [REGISTER_SCHEMA.PERFORMANCE_PULL_UPS]: 0,
    [REGISTER_SCHEMA.PERFORMANCE_PUSH_UPS]: 0,
    [REGISTER_SCHEMA.PERFORMANCE_SQUATS]: 0,
    [REGISTER_SCHEMA.PERFORMANCE_DIPS]: 0,
  };

  const { control, register, handleSubmit, formState, trigger } =
    useForm<TRegisterSchema>({
      defaultValues,
      resolver: zodResolver(getRegisterSchema(translate)),
      mode: "onSubmit",
    });

  const nextStep = async (): Promise<void> => {
    const fieldsToValidate = getFieldsForStep(activeStep);
    const isValid = await trigger(fieldsToValidate);

    if (isValid) {
      setActiveStep(activeStep + 1);
    }
  };

  const getFieldsForStep = (step: number): (keyof TRegisterSchema)[] => {
    switch (step) {
      case 0:
        return [
          REGISTER_SCHEMA.USERNAME,
          REGISTER_SCHEMA.EMAIL,
          REGISTER_SCHEMA.PASSWORD,
          REGISTER_SCHEMA.FULL_NAME,
          REGISTER_SCHEMA.GENDER,
        ];
      case 1:
        return [
          REGISTER_SCHEMA.HEIGHT_VALUE,
          REGISTER_SCHEMA.HEIGHT_UNIT,
          REGISTER_SCHEMA.WEIGHT_VALUE,
          REGISTER_SCHEMA.WEIGHT_UNIT,
        ];
      case 2:
        return [
          REGISTER_SCHEMA.GOALS,
          REGISTER_SCHEMA.GOAL_WEIGHT_VALUE,
          REGISTER_SCHEMA.GOAL_WEIGHT_UNIT,
          REGISTER_SCHEMA.FITNESS_LEVEL,
        ];
      case 3:
        return [
          REGISTER_SCHEMA.PERFORMANCE_PULL_UPS,
          REGISTER_SCHEMA.PERFORMANCE_PUSH_UPS,
          REGISTER_SCHEMA.PERFORMANCE_SQUATS,
          REGISTER_SCHEMA.PERFORMANCE_DIPS,
        ];
      default:
        return [];
    }
  };

  const prevStep = (): void => {
    setActiveStep(activeStep - 1);
  };

  const goalsOptions: GoalOption[] = Object.values(Goal).map((goal) => {
    return {
      value: goal,
      label: translate(`GOALS.${goal.toUpperCase()}`),
    };
  });

  const genderOptions = Object.values(Gender).map((gender) => {
    return {
      value: gender,
      label: translate(`GENDER.${gender.toUpperCase()}`),
    };
  });

  const weightUnitOptions = Object.values(WeightUnit).map((weightUnit) => {
    return {
      value: weightUnit,
      label: weightUnit.toLowerCase(),
    };
  });

  const heightUnitOptions = Object.values(HeightUnit).map((heightUnit) => {
    return {
      value: heightUnit,
      label: heightUnit.toLowerCase(),
    };
  });

  const fitnessLevelOptions = Object.values(FitnessLevel).map(
    (fitnessLevel) => {
      return {
        value: fitnessLevel,
        label: fitnessLevel.toLowerCase(),
      };
    }
  );

  const onSubmit = async (data: TRegisterSchema): Promise<void> => {
    const response = await registerUser({
      variables: {
        input: {
          email: data.email,
          username: data.username,
          password: data.password,
          full_name: data.full_name,
          fitness_level: data.fitness_level,
          gender: data.gender,
          performance: {
            max_pull_ups: data.performance_max_pull_ups,
            max_push_ups: data.performance_max_push_ups,
            max_squats: data.performance_max_squats,
            max_dips: data.performance_max_dips,
          },
          height: {
            value: data.height_value,
            unit: data.height_unit,
          },
          weight: {
            value: data.weight_value,
            unit: data.weight_unit,
          },
          goals: data.goals.map((goal) => {
            return goal.value;
          }),
          goal_weight: {
            value: data.goal_weight_value,
            unit: data.goal_weight_unit,
          },
        },
      },
    });

    if (
      response.data?.register.access_token &&
      response.data.register.refresh_token
    ) {
      startTransition(async () => {
        setTransitionLoading(true);
        try {
          if (response.data) {
            await setAuthTokens({
              access_token: response.data.register.access_token,
              refresh_token: response.data.register.refresh_token,
            });
            router.push(AdminPages.DASHBOARD);
          }
        } catch (e) {
          console.error("Error on register", e);
        } finally {
          setTransitionLoading(false);
        }
      });
    }
  };

  useEffect(() => {
    if (registerError) {
      toast({
        title: "An error occurred.",
        description: registerError.message,
        position: "top-right",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [registerError, toast]);

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
        p={{ base: "16px", md: "24px" }}
      >
        <Box
          display="flex"
          flexDirection={{ base: "column", md: "row" }}
          gap="24px"
          height="450px"
        >
          <Box display="flex" flexDirection="column" gap="8px">
            <Stepper
              colorScheme="gray"
              gap={0}
              height={{ base: "auto", md: "100%" }}
              index={activeStep}
              orientation={stepperOrientation}
              size={{
                base: "sm" as const,
                sm: "lg" as const,
              }}
              width={{ base: "100%", md: "200px" }}
            >
              {steps.map((label) => (
                <Step gap="0" key={label}>
                  <StepIndicator>
                    <StepStatus
                      active={<StepNumber />}
                      complete={<StepIcon />}
                      incomplete={<StepNumber />}
                    />
                  </StepIndicator>

                  {stepperOrientation === "vertical" ? (
                    <Box
                      alignItems="center"
                      display="flex"
                      flexShrink={0}
                      height="40px"
                      pl="8px"
                    >
                      <Heading
                        as="h3"
                        className="text-[16px]"
                        variant="montserratBold"
                      >
                        {label}
                      </Heading>
                    </Box>
                  ) : null}

                  <StepSeparator _horizontal={{ ml: "0" }} />
                </Step>
              ))}
            </Stepper>

            {stepperOrientation === "horizontal" ? (
              <Heading as="h3" className="text-[16px]" variant="montserratBold">
                {steps[activeStep]}
              </Heading>
            ) : null}
          </Box>

          <Box
            as="form"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            width={{ base: "280px", md: "450px" }}
          >
            {activeStep === 0 && (
              <VStack spacing="16px">
                <VStack alignItems="stretch" spacing="8px" width="100%">
                  <Input
                    isInvalid={Boolean(
                      formState.errors[REGISTER_SCHEMA.FULL_NAME]?.message
                    )}
                    placeholder="Full name"
                    {...register(REGISTER_SCHEMA.FULL_NAME)}
                  />
                  {formState.errors[REGISTER_SCHEMA.FULL_NAME]?.message ? (
                    <FormErrorBox>
                      <TextInfo type="error">
                        {formState.errors[REGISTER_SCHEMA.FULL_NAME].message}
                      </TextInfo>
                    </FormErrorBox>
                  ) : null}
                </VStack>

                <VStack alignItems="stretch" spacing="8px" width="100%">
                  <Input
                    isInvalid={Boolean(
                      formState.errors[REGISTER_SCHEMA.USERNAME]?.message
                    )}
                    placeholder="Username"
                    {...register(REGISTER_SCHEMA.USERNAME)}
                  />
                  {formState.errors[REGISTER_SCHEMA.USERNAME]?.message ? (
                    <FormErrorBox>
                      <TextInfo type="error">
                        {formState.errors[REGISTER_SCHEMA.USERNAME].message}
                      </TextInfo>
                    </FormErrorBox>
                  ) : null}
                </VStack>

                <VStack alignItems="stretch" spacing="8px" width="100%">
                  <Input
                    isInvalid={Boolean(
                      formState.errors[REGISTER_SCHEMA.EMAIL]?.message
                    )}
                    placeholder="Email"
                    type="email"
                    {...register(REGISTER_SCHEMA.EMAIL)}
                  />
                  {formState.errors[REGISTER_SCHEMA.EMAIL]?.message ? (
                    <FormErrorBox>
                      <TextInfo type="error">
                        {formState.errors[REGISTER_SCHEMA.EMAIL].message}
                      </TextInfo>
                    </FormErrorBox>
                  ) : null}
                </VStack>

                <VStack alignItems="stretch" spacing="8px" width="100%">
                  <Select
                    isInvalid={Boolean(
                      formState.errors[REGISTER_SCHEMA.GENDER]?.message
                    )}
                    placeholder="Male, Female, etc"
                    {...register(REGISTER_SCHEMA.GENDER)}
                  >
                    {genderOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                  {formState.errors[REGISTER_SCHEMA.GENDER]?.message ? (
                    <FormErrorBox>
                      <TextInfo type="error">
                        {formState.errors[REGISTER_SCHEMA.GENDER].message}
                      </TextInfo>
                    </FormErrorBox>
                  ) : null}
                </VStack>

                <VStack alignItems="stretch" spacing="8px" width="100%">
                  <PasswordInput<TRegisterSchema>
                    control={control}
                    name={REGISTER_SCHEMA.PASSWORD}
                    placeholder="Password"
                  />
                </VStack>
              </VStack>
            )}

            {activeStep === 1 && (
              <VStack spacing="16px">
                <VStack alignItems="stretch" spacing="8px" width="100%">
                  <Input
                    isInvalid={Boolean(
                      formState.errors[REGISTER_SCHEMA.HEIGHT_VALUE]?.message
                    )}
                    placeholder="Height (e.g., 170)"
                    type="number"
                    {...register(REGISTER_SCHEMA.HEIGHT_VALUE, {
                      valueAsNumber: true,
                    })}
                  />
                  {formState.errors[REGISTER_SCHEMA.HEIGHT_VALUE]?.message ? (
                    <FormErrorBox>
                      <TextInfo type="error">
                        {formState.errors[REGISTER_SCHEMA.HEIGHT_VALUE].message}
                      </TextInfo>
                    </FormErrorBox>
                  ) : null}
                </VStack>

                <VStack alignItems="stretch" spacing="8px" width="100%">
                  <Select
                    isInvalid={Boolean(
                      formState.errors[REGISTER_SCHEMA.HEIGHT_UNIT]?.message
                    )}
                    placeholder="Select unit"
                    {...register(REGISTER_SCHEMA.HEIGHT_UNIT)}
                  >
                    {heightUnitOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                  {formState.errors[REGISTER_SCHEMA.HEIGHT_UNIT]?.message ? (
                    <FormErrorBox>
                      <TextInfo type="error">
                        {formState.errors[REGISTER_SCHEMA.HEIGHT_UNIT].message}
                      </TextInfo>
                    </FormErrorBox>
                  ) : null}
                </VStack>

                <VStack alignItems="stretch" spacing="8px" width="100%">
                  <Input
                    isInvalid={Boolean(
                      formState.errors[REGISTER_SCHEMA.WEIGHT_VALUE]?.message
                    )}
                    placeholder="Weight (e.g., 70)"
                    type="number"
                    {...register(REGISTER_SCHEMA.WEIGHT_VALUE, {
                      valueAsNumber: true,
                    })}
                  />
                  {formState.errors[REGISTER_SCHEMA.WEIGHT_VALUE]?.message ? (
                    <FormErrorBox>
                      <TextInfo type="error">
                        {formState.errors[REGISTER_SCHEMA.WEIGHT_VALUE].message}
                      </TextInfo>
                    </FormErrorBox>
                  ) : null}
                </VStack>

                <VStack alignItems="stretch" spacing="8px" width="100%">
                  <Select
                    isInvalid={Boolean(
                      formState.errors[REGISTER_SCHEMA.WEIGHT_UNIT]?.message
                    )}
                    placeholder="Select unit"
                    {...register(REGISTER_SCHEMA.WEIGHT_UNIT)}
                  >
                    {weightUnitOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                  {formState.errors[REGISTER_SCHEMA.WEIGHT_UNIT]?.message ? (
                    <FormErrorBox>
                      <TextInfo type="error">
                        {formState.errors[REGISTER_SCHEMA.WEIGHT_UNIT].message}
                      </TextInfo>
                    </FormErrorBox>
                  ) : null}
                </VStack>
              </VStack>
            )}

            {activeStep === 2 && (
              <VStack spacing="16px">
                <VStack alignItems="stretch" spacing="8px" width="100%">
                  <ControlledSelect<TRegisterSchema, GoalOption, true>
                    control={control}
                    isMulti
                    name={REGISTER_SCHEMA.GOALS}
                    options={goalsOptions}
                    placeholder="Goals"
                  />

                  {formState.errors[REGISTER_SCHEMA.GOALS]?.message ? (
                    <FormErrorBox>
                      <TextInfo type="error">
                        {formState.errors[REGISTER_SCHEMA.GOALS].message}
                      </TextInfo>
                    </FormErrorBox>
                  ) : null}
                </VStack>

                <VStack alignItems="stretch" spacing="8px" width="100%">
                  <Input
                    isInvalid={Boolean(
                      formState.errors[REGISTER_SCHEMA.GOAL_WEIGHT_VALUE]
                        ?.message
                    )}
                    placeholder="Weight (e.g., 70)"
                    type="number"
                    {...register(REGISTER_SCHEMA.GOAL_WEIGHT_VALUE, {
                      valueAsNumber: true,
                    })}
                  />
                  {formState.errors[REGISTER_SCHEMA.GOAL_WEIGHT_VALUE]
                    ?.message ? (
                    <FormErrorBox>
                      <TextInfo type="error">
                        {
                          formState.errors[REGISTER_SCHEMA.GOAL_WEIGHT_VALUE]
                            .message
                        }
                      </TextInfo>
                    </FormErrorBox>
                  ) : null}
                </VStack>

                <VStack alignItems="stretch" spacing="8px" width="100%">
                  <Select
                    isInvalid={Boolean(
                      formState.errors[REGISTER_SCHEMA.GOAL_WEIGHT_UNIT]
                        ?.message
                    )}
                    placeholder="Select unit"
                    {...register(REGISTER_SCHEMA.GOAL_WEIGHT_UNIT)}
                  >
                    {weightUnitOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                  {formState.errors[REGISTER_SCHEMA.GOAL_WEIGHT_UNIT]
                    ?.message ? (
                    <FormErrorBox>
                      <TextInfo type="error">
                        {
                          formState.errors[REGISTER_SCHEMA.GOAL_WEIGHT_UNIT]
                            .message
                        }
                      </TextInfo>
                    </FormErrorBox>
                  ) : null}
                </VStack>

                <VStack alignItems="stretch" spacing="8px" width="100%">
                  <Select
                    isInvalid={Boolean(
                      formState.errors[REGISTER_SCHEMA.FITNESS_LEVEL]?.message
                    )}
                    placeholder={translate("FIELDS.FITNESS_LEVEL")}
                    {...register(REGISTER_SCHEMA.FITNESS_LEVEL)}
                  >
                    {fitnessLevelOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>

                  {formState.errors[REGISTER_SCHEMA.FITNESS_LEVEL]?.message ? (
                    <FormErrorBox>
                      <TextInfo type="error">
                        {
                          formState.errors[REGISTER_SCHEMA.FITNESS_LEVEL]
                            .message
                        }
                      </TextInfo>
                    </FormErrorBox>
                  ) : null}
                </VStack>
              </VStack>
            )}

            {activeStep === 3 && (
              <VStack spacing="16px">
                <VStack alignItems="stretch" spacing="8px" width="100%">
                  <Input
                    isInvalid={Boolean(
                      formState.errors[REGISTER_SCHEMA.PERFORMANCE_PULL_UPS]
                        ?.message
                    )}
                    placeholder={translate("FIELDS.PERFORMANCE.PULL_UPS")}
                    type="number"
                    {...register(REGISTER_SCHEMA.PERFORMANCE_PULL_UPS, {
                      valueAsNumber: true,
                    })}
                  />

                  {formState.errors[REGISTER_SCHEMA.PERFORMANCE_PULL_UPS]
                    ?.message ? (
                    <FormErrorBox>
                      <TextInfo type="error">
                        {
                          formState.errors[REGISTER_SCHEMA.PERFORMANCE_PULL_UPS]
                            .message
                        }
                      </TextInfo>
                    </FormErrorBox>
                  ) : null}
                </VStack>

                <VStack alignItems="stretch" spacing="8px" width="100%">
                  <Input
                    isInvalid={Boolean(
                      formState.errors[REGISTER_SCHEMA.PERFORMANCE_PUSH_UPS]
                        ?.message
                    )}
                    placeholder={translate("FIELDS.PERFORMANCE.PUSH_UPS")}
                    type="number"
                    {...register(REGISTER_SCHEMA.PERFORMANCE_PUSH_UPS, {
                      valueAsNumber: true,
                    })}
                  />

                  {formState.errors[REGISTER_SCHEMA.PERFORMANCE_PUSH_UPS]
                    ?.message ? (
                    <FormErrorBox>
                      <TextInfo type="error">
                        {
                          formState.errors[REGISTER_SCHEMA.PERFORMANCE_PUSH_UPS]
                            .message
                        }
                      </TextInfo>
                    </FormErrorBox>
                  ) : null}
                </VStack>

                <VStack alignItems="stretch" spacing="8px" width="100%">
                  <Input
                    isInvalid={Boolean(
                      formState.errors[REGISTER_SCHEMA.PERFORMANCE_SQUATS]
                        ?.message
                    )}
                    placeholder={translate("FIELDS.PERFORMANCE.SQUATS")}
                    type="number"
                    {...register(REGISTER_SCHEMA.PERFORMANCE_SQUATS, {
                      valueAsNumber: true,
                    })}
                  />

                  {formState.errors[REGISTER_SCHEMA.PERFORMANCE_SQUATS]
                    ?.message ? (
                    <FormErrorBox>
                      <TextInfo type="error">
                        {
                          formState.errors[REGISTER_SCHEMA.PERFORMANCE_SQUATS]
                            .message
                        }
                      </TextInfo>
                    </FormErrorBox>
                  ) : null}
                </VStack>

                <VStack alignItems="stretch" spacing="8px" width="100%">
                  <Input
                    isInvalid={Boolean(
                      formState.errors[REGISTER_SCHEMA.PERFORMANCE_DIPS]
                        ?.message
                    )}
                    placeholder={translate("FIELDS.PERFORMANCE.DIPS")}
                    type="number"
                    {...register(REGISTER_SCHEMA.PERFORMANCE_DIPS, {
                      valueAsNumber: true,
                    })}
                  />

                  {formState.errors[REGISTER_SCHEMA.PERFORMANCE_DIPS]
                    ?.message ? (
                    <FormErrorBox>
                      <TextInfo type="error">
                        {
                          formState.errors[REGISTER_SCHEMA.PERFORMANCE_DIPS]
                            .message
                        }
                      </TextInfo>
                    </FormErrorBox>
                  ) : null}
                </VStack>
              </VStack>
            )}
          </Box>
        </Box>

        <Flex justifyContent={activeStep > 0 ? "space-between" : "end"} mt={6}>
          {activeStep > 0 && (
            <Button onClick={prevStep} size="xl" variant={buttonVariant}>
              {translate("BUTTONS.BACK")}
            </Button>
          )}
          {activeStep < steps.length - 1 && (
            <Button
              onClick={async () => {
                await nextStep();
              }}
              size="xl"
              variant={buttonVariant}
            >
              {translate("BUTTONS.NEXT")}
            </Button>
          )}
          {activeStep === steps.length - 1 && (
            <Button
              onClick={handleSubmit(onSubmit)}
              size="xl"
              variant={buttonVariant}
            >
              {translate("BUTTONS.SUBMIT")}
            </Button>
          )}
        </Flex>
      </Box>
    </Box>
  );
}
