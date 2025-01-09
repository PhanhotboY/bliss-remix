import { Outlet } from '@remix-run/react';

import Footer from '~/components/Footer';
import HandsomeError from '~/components/HandsomeError';
import Header from '~/components/Header';

export default function MainLayout() {
  return (
    <>
      <Header shadow />

      <Outlet />

      <Footer />
    </>
  );
}

export const ErrorBoundary = () => <HandsomeError />;
