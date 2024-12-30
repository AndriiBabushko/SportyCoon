import { Slider as ChakraSlider, For, HStack } from "@chakra-ui/react";
import * as React from "react";
import type { JSX } from "react";

export interface SliderProps extends ChakraSlider.RootProps {
  marks?: (number | { value: number; label: React.ReactNode })[];
  label?: React.ReactNode;
  showValue?: boolean;
}

export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  function Slider(props, ref) {
    const { marks: marksProp, label, showValue, ...rest } = props;
    const value = props.defaultValue ?? props.value;

    const marks = marksProp?.map((mark) => {
      if (typeof mark === "number") return { value: mark, label: undefined };
      return mark;
    });

    const hasMarkLabel = Boolean(marks?.some((mark) => mark.label));

    return (
      <ChakraSlider.Root ref={ref} thumbAlignment="center" {...rest}>
        {label && !showValue ? (
          <ChakraSlider.Label>{label}</ChakraSlider.Label>
        ) : null}
        {label && showValue ? (
          <HStack justify="space-between">
            <ChakraSlider.Label>{label}</ChakraSlider.Label>
            <ChakraSlider.ValueText />
          </HStack>
        ) : null}
        <ChakraSlider.Control data-has-mark-label={hasMarkLabel || undefined}>
          <ChakraSlider.Track>
            <ChakraSlider.Range />
          </ChakraSlider.Track>
          <SliderThumbs value={value} />
          <SliderMarks marks={marks} />
        </ChakraSlider.Control>
      </ChakraSlider.Root>
    );
  }
);

function SliderThumbs(props: { value?: number[] }): JSX.Element {
  const { value } = props;
  return (
    <For each={value}>
      {(_, index) => (
        <ChakraSlider.Thumb index={index} key={index}>
          <ChakraSlider.HiddenInput />
        </ChakraSlider.Thumb>
      )}
    </For>
  );
}

interface SliderMarksProps {
  marks?: (number | { value: number; label: React.ReactNode })[];
}

const SliderMarks = React.forwardRef<HTMLDivElement, SliderMarksProps>(
  function SliderMarks(props, ref) {
    const { marks } = props;
    if (!marks?.length) return null;

    return (
      <ChakraSlider.MarkerGroup ref={ref}>
        {marks.map((mark) => {
          const value = typeof mark === "number" ? mark : mark.value;
          const label = typeof mark === "number" ? undefined : mark.label;
          return (
            <ChakraSlider.Marker key={value} value={value}>
              <ChakraSlider.MarkerIndicator />
              {label}
            </ChakraSlider.Marker>
          );
        })}
      </ChakraSlider.MarkerGroup>
    );
  }
);