import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

const queryClient = new QueryClient();

interface ReactQueryProviderProps {
  readonly children: ReactNode;
}

export function ReactQueryProvider({ children }: ReactQueryProviderProps) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
