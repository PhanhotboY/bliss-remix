// components
import { useEffect, useRef, useState } from 'react';
import { useFetcher, useNavigation } from '@remix-run/react';
import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { toast } from 'react-toastify';

// assets
import PasswordInput from '@components/PasswordInput';
import { authenticator } from '~/services/auth.server';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticator.isAuthenticated(request, {
    successRedirect: '/cmsdesk',
  });
  return null;
};

export async function action({ request }: ActionFunctionArgs) {
  try {
    return await authenticator.authenticate('user-pass', request, {
      successRedirect: '/cmsdesk',
      throwOnError: true,
    });
  } catch (err: any) {
    if (err instanceof Error) {
      return {
        toast: {
          message: err.message,
          type: 'error',
        },
      };
    }

    throw err;
  }
}

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const fetcher = useFetcher<typeof action>();
  const toastIdRef = useRef<any>(null);
  const navigation = useNavigation();

  useEffect(() => {
    switch (navigation.state) {
      case 'loading':
        toast.dismiss();
        break;

      default:
        break;
    }
  }, [navigation.state]);

  useEffect(() => {
    switch (fetcher.state) {
      case 'submitting':
        toastIdRef.current = toast.loading('Loading...', {
          autoClose: false,
        });
        setLoading(true);
        break;

      case 'idle':
        if (fetcher.data?.toast && toastIdRef.current) {
          const { toast: toastData } = fetcher.data as any;
          toast.update(toastIdRef.current, {
            render: toastData.message,
            type: toastData.type || 'success', // Default to 'success' if type is not provided
            autoClose: 3000,
            isLoading: false,
          });
          toastIdRef.current = null;
          setLoading(false);
          break;
        }

        toast.update(toastIdRef.current, {
          render: fetcher.data?.toast.message,
          autoClose: 3000,
          isLoading: false,
          type: 'error',
        });

        break;
    }
  }, [fetcher.state]);

  return (
    <div className='h-screen flex items-center'>
      <div className='h-fit w-fit bg-widget flex items-center justify-center py-10 px-4 lg:p-[40px] mx-auto rounded shadow'>
        <div className='max-w-[460px] w-full'>
          <div className='flex flex-col gap-2.5 text-center text-3xl font-medium'>
            <h1>Welcome back!</h1>
          </div>

          <fetcher.Form className='mt-5' method='POST'>
            <div className='flex flex-col gap-5'>
              <div className='field-wrapper'>
                <label htmlFor='username' className='field-label'>
                  Username
                </label>

                <input
                  className={'field-input'}
                  id='username'
                  type='text'
                  name='username'
                  placeholder='Username'
                  autoComplete='username'
                  required={true}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <PasswordInput
                id='password'
                isInvalid={false}
                value={password}
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='flex flex-col items-center gap-6 mt-4 mt-10'>
              {/* <button className='text-btn'>Forgot Password?</button> */}

              <button
                className='btn btn--primary w-full'
                type='submit'
                disabled={loading}
              >
                Log In
              </button>
            </div>
          </fetcher.Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
