import { Await } from '@remix-run/react';
import { Suspense, ReactNode } from 'react';
import Skeleton from '~/widgets/Skeleton';

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
