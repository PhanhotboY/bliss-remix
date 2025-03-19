import { LinksFunction, LoaderFunctionArgs } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import { Suspense, useEffect } from 'react';
import Footer from '~/components/Footer';
import HandsomeError from '~/components/HandsomeError';
import Header from '~/components/Header';

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css',
    },
    {
      rel: 'stylesheet',
      href: 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css',
    },
  ];
};

export default function BlogTemplate() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Header shadow />
      </Suspense>

      <main className='mt-20 md:mt-0'>
        <Outlet />
      </main>

      <Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </Suspense>
    </>
  );
}

export function ErrorBoundary() {
  return <HandsomeError />;
}
