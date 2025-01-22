import {
  isRouteErrorResponse,
  Link,
  useNavigation,
  useRouteError,
} from '@remix-run/react';
import { toast } from 'react-toastify';
import LoadingOverlay from '../LoadingOverlay';

export default function HandsomeError({ basePath }: { basePath?: string }) {
  console.log('Oops! An error occurred!');
  const error = useRouteError();
  console.log(error);
  toast.dismiss();

  if (isRouteErrorResponse(error)) {
    return <ErrorCard error={error} basePath={basePath} />;
  } else if (error instanceof Error && error.message) {
    return (
      <ErrorCard
        error={{
          status: 500,
          statusText: error.message,
        }}
        basePath={basePath}
      />
    );
  } else {
    return (
      <ErrorCard
        error={{ status: 500, statusText: 'Internal Server Error' }}
        basePath={basePath}
      />
    );
  }
}

const ErrorCard = ({
  error,
  basePath,
}: {
  basePath?: string;
  error: { status: number; statusText: string };
}) => {
  const navigation = useNavigation();

  return (
    <div className='bg-gray-200 w-full px-16 md:px-0 py-16 flex items-center justify-center'>
      <div className='bg-white w-full max-w-[520px] border border-gray-200 flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-2xl'>
        <p className='text-6xl md:text-7xl lg:text-9xl font-bold tracking-wider text-gray-300'>
          {error.status}
        </p>
        <p className='text-2xl md:text-3xl lg:text-5xl font-bold tracking-wider text-gray-500 mt-4'>
          {error.statusText}
        </p>
        <Link
          to={basePath || '/'}
          className='flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 mt-6 rounded transition duration-150'
          title='Return Home'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z'
              clipRule='evenodd'
            ></path>
          </svg>
          <span className='capitalize'>trang chủ</span>
        </Link>
      </div>

      {navigation.state === 'loading' && <LoadingOverlay />}
    </div>
  );
};
