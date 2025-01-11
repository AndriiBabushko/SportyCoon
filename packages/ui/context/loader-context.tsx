"use client";

import type { JSX, PropsWithChildren } from "react";
import { createContext, useContext, useState } from "react";

interface LoaderContextProps {
  isRequestLoading: boolean;
  isTransitionLoading: boolean;
  setRequestLoading: (loading: boolean) => void;
  setTransitionLoading: (loading: boolean) => void;
}

const LoaderContext = createContext<LoaderContextProps | undefined>(undefined);

export function LoaderProvider({ children }: PropsWithChildren): JSX.Element {
  const [state, setState] = useState({
    isRequestLoading: false,
    isTransitionLoading: false,
  });

  const setRequestLoading = (loading: boolean): void => {
    setState((prevState) => ({ ...prevState, isRequestLoading: loading }));
  };

  const setTransitionLoading = (loading: boolean): void => {
    setState((prevState) => ({ ...prevState, isTransitionLoading: loading }));
  };

  return (
    <LoaderContext.Provider
      value={{
        ...state,
        setRequestLoading,
        setTransitionLoading,
      }}
    >
      {children}
    </LoaderContext.Provider>
  );
}

export const useLoader = (): LoaderContextProps => {
  const context = useContext(LoaderContext);

  if (!context) {
    throw new Error("useLoader must be used within a LoaderProvider");
  }

  return context;
};
