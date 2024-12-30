"use client";

import type { GroupProps, SlotRecipeProps } from "@chakra-ui/react";
import { Avatar as ChakraAvatar, Group } from "@chakra-ui/react";
import * as React from "react";

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

export interface AvatarProps extends ChakraAvatar.RootProps {
  name?: string;
  src?: string;
  srcSet?: string;
  loading?: ImageProps["loading"];
  icon?: React.ReactElement;
  fallback?: React.ReactNode;
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  function Avatar(props, ref) {
    const { name, src, srcSet, loading, icon, fallback, children, ...rest } =
      props;
    return (
      <ChakraAvatar.Root ref={ref} {...rest}>
        <AvatarFallback icon={icon} name={name}>
          {fallback}
        </AvatarFallback>
        <ChakraAvatar.Image loading={loading} src={src} srcSet={srcSet} />
        {children}
      </ChakraAvatar.Root>
    );
  }
);

interface AvatarFallbackProps extends ChakraAvatar.FallbackProps {
  name?: string;
  icon?: React.ReactElement;
}

const AvatarFallback = React.forwardRef<HTMLDivElement, AvatarFallbackProps>(
  function AvatarFallback(props, ref) {
    const { name, icon, children, ...rest } = props;
    return (
      <ChakraAvatar.Fallback ref={ref} {...rest}>
        {children}
        {name && children === null ? <>{getInitials(name)}</> : null}
        {name && children === null ? (
          <ChakraAvatar.Icon asChild={Boolean(icon)}>{icon}</ChakraAvatar.Icon>
        ) : null}
      </ChakraAvatar.Fallback>
    );
  }
);

function getInitials(name: string): string {
  const names = name.trim().split(" ");
  const firstName = names[0] || "";
  const lastName = names.length > 1 ? names[names.length - 1] : "";
  return firstName && lastName
    ? `${firstName.charAt(0)}${lastName.charAt(0)}`
    : firstName.charAt(0);
}

interface AvatarGroupProps extends GroupProps, SlotRecipeProps<"avatar"> {}

export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  function AvatarGroup(props, ref) {
    const { size, variant, borderless, ...rest } = props;
    return (
      <ChakraAvatar.PropsProvider value={{ size, variant, borderless }}>
        <Group gap="0" ref={ref} spaceX="-3" {...rest} />
      </ChakraAvatar.PropsProvider>
    );
  }
);