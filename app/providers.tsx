"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import * as React from "react";
// import { ErrorBoundary } from 'react-error-boundary';

// import { MainErrorFallback } from '@/components/errors/main';
// import { Notifications } from '@/components/ui/notifications';
import { getQueryClient } from "@shared/lib/get-query-client";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {process.env.DEV && <ReactQueryDevtools />}
      {/* <Notifications /> */}
      {children}
    </QueryClientProvider>
  );
}
