import { Outlet, useNavigation } from '@remix-run/react';

import Footer from '~/components/Footer';
import HandsomeError from '~/components/HandsomeError';
import Header from '~/components/Header';
import LoadingOverlay from '~/components/LoadingOverlay';

export default function MainLayout() {
  const navigation = useNavigation();

  return (
    <>
      <Header shadow />

      <Outlet />

      <Footer />

      {navigation.state === 'loading' && <LoadingOverlay />}
    </>
  );
}

export const ErrorBoundary = () => <HandsomeError />;
