// components
import {
  json,
  LoaderFunctionArgs,
  NavLink,
  useFetcher,
} from 'react-router-dom';
import PasswordInput from '@components/PasswordInput';
import { toast } from 'react-toastify';

// hooks
import { useEffect, useRef, useState } from 'react';

export const loader = async ({}: LoaderFunctionArgs) => {
  return json({});
};

const UserProfileDetails = ({ user }: { user: any }) => {
  const fetcher = useFetcher();

  const [isChanged, setIsChanged] = useState(false);
  const [firstName, setFirstName] = useState(user.usr_firstName);
  const [lastName, setLastName] = useState(user.usr_lastName);
  const [email, setEmail] = useState(user.usr_email);
  const [msisdn, setMsisdn] = useState(user.usr_msisdn);
  const [address, setAddress] = useState(user.usr_address);
  const [gender, setGender] = useState(user.usr_sex);
  const [userName, setUserName] = useState(user.usr_userName);
  const [password, setPassword] = useState('');

  useEffect(() => {
    setIsChanged(
      firstName !== user.usr_firstName ||
        lastName !== user.usr_lastName ||
        email !== user.usr_email ||
        msisdn !== user.usr_msisdn ||
        address !== user.usr_address ||
        userName !== user.usr_userName ||
        password !== ''
    );
  }, [email, firstName, lastName, msisdn, address, gender, userName, password]);

  const toastIdRef = useRef<any>(null);

  useEffect(() => {
    switch (fetcher.state) {
      case 'submitting':
        toastIdRef.current = toast.loading('Loading...', {
          autoClose: false,
        });

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
          setPassword('');
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
    <div className='card flex flex-col gap-[30px] md:gap-12 md:col-span-2 md:!pb-[50px] xl:col-span-12'>
      <div className='flex flex-col gap-5'>
        <fetcher.Form id='updateProfileForm' method='POST'>
          <div className='grid gap-4 md:grid-cols-2 md:gap-5 text-[#333]'>
            <div className='field-wrapper'>
              <label className='field-label' htmlFor='lastName'>
                Họ
              </label>
              <input
                id='lastName'
                className={'field-input'}
                name='lastName'
                type='text'
                placeholder='Last Name'
                autoComplete='last-name'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className='field-wrapper'>
              <label className='field-label' htmlFor='firstName'>
                Tên
              </label>
              <input
                className={'field-input '}
                type='text'
                id='firstName'
                name='firstName'
                placeholder='First Name'
                autoComplete='first-name'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className='field-wrapper'>
              <label className='field-label' htmlFor='email'>
                Email
              </label>
              <input
                id='email'
                className={'field-input'}
                type='text'
                name='email'
                placeholder='Email'
                autoComplete='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className='field-wrapper'>
              <label className='field-label' htmlFor='msisdn'>
                Sđt
              </label>
              <input
                id='msisdn'
                type='tel'
                name='msisdn'
                pattern='[0-9]{10}'
                placeholder='0123456789'
                className={'field-input'}
                autoComplete='phone'
                value={msisdn}
                onChange={(e) => setMsisdn(e.target.value)}
              />
            </div>

            <div className='field-wrapper'>
              <label className='field-label' htmlFor='address'>
                Địa chỉ
              </label>
              <input
                id='address'
                className='field-input'
                name='address'
                type='text'
                placeholder='71 Bùi Tá Hán, An Phú, Q2, TP.HCM'
                autoComplete='address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className='field-wrapper'>
              <label className='field-label' htmlFor='sex'>
                Gender
              </label>
              <select
                className='field-input'
                id='sex'
                name='sex'
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value='male'>Nam</option>
                <option value='female'>Nữ</option>
                <option value='other'>Khác</option>
              </select>
            </div>

            <div className='field-wrapper'>
              <label className='field-label' htmlFor='username'>
                Username
              </label>
              <input
                id='username'
                className={'field-input'}
                name='userName'
                type='text'
                placeholder='Username'
                autoComplete='username'
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <PasswordInput
              id='password'
              value={password}
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </fetcher.Form>

        <div className='mt-2.5 flex justify-between'>
          <fetcher.Form method='post' action='/cmsdesk/logout'>
            <button
              className='btn btn--secondary w-full md:max-w-[280px]'
              type='submit'
            >
              Log Out
            </button>
          </fetcher.Form>

          <button
            className='btn btn--primary w-full md:w-fit md:px-[70px]'
            type='submit'
            disabled={!isChanged}
            form='updateProfileForm'
          >
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileDetails;
