import type { PropsWithChildren, JSX } from "react";
import { cn } from "@sportycoon/ui/lib";

interface FormErrorMessageProps extends PropsWithChildren {
  className?: string;
}

export default function FormErrorBox({
  children,
  className,
}: FormErrorMessageProps): JSX.Element {
  return (
    <div className={cn("flex-row items-center", className)}>{children}</div>
  );
}
