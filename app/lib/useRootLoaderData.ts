import { useRouteLoaderData } from '@remix-run/react';

import { loader as rootLoader } from '~/root';

export function useRootLoaderData() {
  const data = useRouteLoaderData<typeof rootLoader>(`root`);

  return data!;
}
