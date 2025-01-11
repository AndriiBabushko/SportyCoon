import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes, JSX } from "react";
import React from "react";
import { cn } from "@sportycoon/ui/lib/utils";
import { Paragraph } from "./paragraph";

const Classes = {
  default: "font-normal",
  type: {
    success: "text-green-500",
    warning: "text-yellow-500",
    error: "text-[#FC8181]",
  },
  textInfoVariant: {
    nicoMoji: "--font-nicoMoji",
    montserrat: "--font-montserrat",
    montserratBold: "--font-montserrat font-bold",
  },
};

const textInfoVariants = cva(Classes.default, {
  variants: {
    type: Classes.type,
    textInfoVariant: Classes.textInfoVariant,
  },
  defaultVariants: {
    type: "success",
    textInfoVariant: "montserrat",
  },
});

export interface TextInfoProps
  extends HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textInfoVariants> {}

function TextInfo({
  type,
  textInfoVariant,
  className,
  children,
  ...props
}: TextInfoProps): JSX.Element {
  return (
    <Paragraph
      className={cn(textInfoVariants({ type, textInfoVariant, className }))}
      data-info-type={type}
      {...props}
    >
      {children}
    </Paragraph>
  );
}

TextInfo.displayName = "TextInfo";

export { TextInfo };
