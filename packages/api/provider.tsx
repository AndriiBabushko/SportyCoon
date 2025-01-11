"use client";

import type { NormalizedCacheObject } from "@apollo/client";
import {
  ApolloLink,
  InMemoryCache,
  ApolloClient,
  ApolloProvider,
} from "@apollo/client";
import type { FC } from "react";
import React, { useEffect, useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { useLoader } from "@sportycoon/ui";
import { GQLPersistContext } from "./context";
import { authLink, defaultApolloClientOptions, httpLink } from "./utils";
import { queryClient } from "./utils/query-client";

interface SportyCoonApiProviderProps {
  children: React.ReactNode;
  getAuthTokens: () => Promise<{
    access_token: string | undefined;
    refresh_token: string | undefined;
  }>;
}

const SportyCoonApiProvider: FC<SportyCoonApiProviderProps> = ({
  children,
  getAuthTokens,
}) => {
  const { setRequestLoading } = useLoader();
  const [client, setClient] =
    useState<ApolloClient<NormalizedCacheObject> | null>(null);

  useEffect(() => {
    function init(): void {
      const cache = new InMemoryCache();
      const loaderLink = new ApolloLink((operation, forward) => {
        setRequestLoading(true);

        return forward(operation).map((response) => {
          setRequestLoading(false);
          return response;
        });
      });

      setClient(
        new ApolloClient({
          ...defaultApolloClientOptions,
          link: ApolloLink.from([loaderLink, authLink, httpLink]),
          cache,
          defaultContext: {
            getAuthTokens,
          },
        })
      );
    }

    init();
  }, []);

  if (!client) {
    return null;
  }

  return (
    <GQLPersistContext.Provider value={{ client }}>
      <ApolloProvider client={client}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ApolloProvider>
    </GQLPersistContext.Provider>
  );
};

export default SportyCoonApiProvider;
