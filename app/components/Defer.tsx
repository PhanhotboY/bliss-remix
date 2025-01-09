import { Skeleton } from '@mui/material';
import { Await } from '@remix-run/react';
import { Suspense, ReactNode } from 'react';

export default function Defer<T>({
  children,
  resolve,
}: {
  children: (data: T) => React.ReactNode;
  resolve: Promise<T>;
}) {
  return (
    <Suspense fallback={<Skeleton />}>
      <Await resolve={resolve}>{(data) => children(data)}</Await>
    </Suspense>
  );
}
