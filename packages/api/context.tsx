"use client";

import { createContext, useContext } from "react";
import type { ApolloClient, NormalizedCacheObject } from "@apollo/client";

interface GQLPersistContextValue {
  client: ApolloClient<NormalizedCacheObject> | null;
}

export const GQLPersistContext = createContext<GQLPersistContextValue>({
  client: null,
});

export const useGQLPersist = (): GQLPersistContextValue => {
  const context = useContext(GQLPersistContext);

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!context) {
    throw new Error("usePersistor must be used within a PersistorProvider");
  }

  return context;
};
