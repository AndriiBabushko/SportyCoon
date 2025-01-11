"use client";

import type { ReactNode, JSX } from "react";
import APIProvider from "@sportycoon/api";
import {
  LoaderProvider,
  TailwindIndicator,
  ToastContainer,
} from "@sportycoon/ui";
import type { ColorMode } from "@chakra-ui/react";
import { getAuthTokens } from "@admin/actions";
import { UIProvider } from "@admin/components/providers";

interface ProvidersProps {
  children: JSX.Element | ReactNode;
  colorMode?: ColorMode;
}

export function Providers({
  children,
  colorMode,
}: ProvidersProps): JSX.Element {
  return (
    <LoaderProvider>
      <APIProvider getAuthTokens={getAuthTokens}>
        <UIProvider colorMode={colorMode}>
          {children}
          <ToastContainer />
          <TailwindIndicator
            isProduction={process.env.NODE_ENV === "production"}
          />
        </UIProvider>
      </APIProvider>
    </LoaderProvider>
  );
}
