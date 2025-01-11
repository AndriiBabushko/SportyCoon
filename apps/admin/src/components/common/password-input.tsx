import type { JSX } from "react";
import React, { useState } from "react";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { Button, FormErrorBox, Icons, TextInfo } from "@sportycoon/ui";
import type { FieldValues, Control, Path, PathValue } from "react-hook-form";
import { useController } from "react-hook-form";

interface PasswordInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  placeholder?: string;
}

export default function PasswordInput<T extends FieldValues>({
  name,
  control,
  placeholder = "Password",
}: PasswordInputProps<T>): JSX.Element {
  const [show, setShow] = useState(false);

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: "" as PathValue<T, Path<T>>,
  });

  const handleClick = (): void => {
    setShow(!show);
  };

  return (
    <>
      <InputGroup size="md">
        <Input
          {...field}
          isInvalid={Boolean(error)}
          placeholder={placeholder}
          type={show ? "text" : "password"}
        />
        <InputRightElement mx="8px" width="24px">
          <Button
            onClick={handleClick}
            size="paddingLess"
            variant="transparent"
          >
            {show ? (
              <Icons.OpenedEye className="w-[24px] h-[24px]" />
            ) : (
              <Icons.ClosedEye className="w-[24px] h-[24px]" />
            )}
          </Button>
        </InputRightElement>
      </InputGroup>
      {error ? (
        <FormErrorBox>
          <TextInfo type="error">{error.message}</TextInfo>
        </FormErrorBox>
      ) : null}
    </>
  );
}
