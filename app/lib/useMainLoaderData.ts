import { useRouteLoaderData } from '@remix-run/react';

import { loader as mainLoader } from '~/routes/_main+/_layout';

export function useMainLoaderData() {
  const data = useRouteLoaderData<typeof mainLoader>(`routes/_main+/_layout`);

  return data!;
}
