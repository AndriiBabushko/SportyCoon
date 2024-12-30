"use client";

import { AbsoluteCenter, Menu as ChakraMenu, Portal } from "@chakra-ui/react";
import * as React from "react";
import { Icons } from "@sportycoon/ui";

interface MenuContentProps extends ChakraMenu.ContentProps {
  portalled?: boolean;
  portalRef?: React.RefObject<HTMLElement>;
}

export const MenuContent = React.forwardRef<HTMLDivElement, MenuContentProps>(
  function MenuContent(props, ref) {
    const { portalled = true, portalRef, ...rest } = props;
    return (
      <Portal container={portalRef} disabled={!portalled}>
        <ChakraMenu.Positioner>
          <ChakraMenu.Content ref={ref} {...rest} />
        </ChakraMenu.Positioner>
      </Portal>
    );
  }
);

export const MenuArrow = React.forwardRef<
  HTMLDivElement,
  ChakraMenu.ArrowProps
>(function MenuArrow(props, ref) {
  return (
    <ChakraMenu.Arrow ref={ref} {...props}>
      <ChakraMenu.ArrowTip />
    </ChakraMenu.Arrow>
  );
});

export const MenuCheckboxItem = React.forwardRef<
  HTMLDivElement,
  ChakraMenu.CheckboxItemProps
>(function MenuCheckboxItem(props, ref) {
  return (
    <ChakraMenu.CheckboxItem ref={ref} {...props}>
      <ChakraMenu.ItemIndicator hidden={false}>
        <Icons.Check />
      </ChakraMenu.ItemIndicator>
      {props.children}
    </ChakraMenu.CheckboxItem>
  );
});

export const MenuRadioItem = React.forwardRef<
  HTMLDivElement,
  ChakraMenu.RadioItemProps
>(function MenuRadioItem(props, ref) {
  const { children, ...rest } = props;
  return (
    <ChakraMenu.RadioItem ps="8" ref={ref} {...rest}>
      <AbsoluteCenter asChild axis="horizontal" left="4">
        <ChakraMenu.ItemIndicator>
          <Icons.Check />
        </ChakraMenu.ItemIndicator>
      </AbsoluteCenter>
      <ChakraMenu.ItemText>{children}</ChakraMenu.ItemText>
    </ChakraMenu.RadioItem>
  );
});

export const MenuItemGroup = React.forwardRef<
  HTMLDivElement,
  ChakraMenu.ItemGroupProps
>(function MenuItemGroup(props, ref) {
  const { title, children, ...rest } = props;
  return (
    <ChakraMenu.ItemGroup ref={ref} {...rest}>
      {title ? (
        <ChakraMenu.ItemGroupLabel userSelect="none">
          {title}
        </ChakraMenu.ItemGroupLabel>
      ) : null}
      {children}
    </ChakraMenu.ItemGroup>
  );
});

export interface MenuTriggerItemProps extends ChakraMenu.ItemProps {
  startIcon?: React.ReactNode;
}

export const MenuTriggerItem = React.forwardRef<
  HTMLDivElement,
  MenuTriggerItemProps
>(function MenuTriggerItem(props, ref) {
  const { startIcon, children, ...rest } = props;
  return (
    <ChakraMenu.TriggerItem ref={ref} {...rest}>
      {startIcon}
      {children}
      <Icons.ChevronRight />
    </ChakraMenu.TriggerItem>
  );
});

export const MenuRadioItemGroup = ChakraMenu.RadioItemGroup;
export const MenuContextTrigger = ChakraMenu.ContextTrigger;
export const MenuRoot = ChakraMenu.Root;
export const MenuSeparator = ChakraMenu.Separator;

export const MenuItem = ChakraMenu.Item;
export const MenuItemText = ChakraMenu.ItemText;
export const MenuItemCommand = ChakraMenu.ItemCommand;
export const MenuTrigger = ChakraMenu.Trigger;