import {
  RiMailFill,
  RiPhoneFill,
  RiSearch2Line,
  RiListCheck,
} from '@remixicon/react';
import { ReactNode, useEffect, useState } from 'react';
import {
  Form,
  Link,
  useFetcher,
  useLoaderData,
  useLocation,
} from '@remix-run/react';

import style from './index.module.css';
import { loader } from '~/root';
import { useRootLoaderData } from '~/lib/useRootLoaderData';
import NavBar from './NavBar';
// import { loader } from '~/routes/blog';

export default function BlogHeader({}: // theme,
// setTheme,
{
  // theme: string;
  // setTheme: (theme: 'light' | 'dark') => void;
}) {
  const { appSettings } = useRootLoaderData();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setShowSearch(false);
    setIsMenuOpen(false);
  }, [location]);

  return (
    <>
      <header className='shadow-xl md:shadow-none fixed md:static top-0 w-full bg-white'>
        <Contact
          contact={{
            email: appSettings.app_email,
            phone: appSettings.app_msisdn,
          }}
        >
          {/* <Checkbox
            className='p-1'
            icon={<RiSunFill className='fill-[--sub4-text]' size={20} />}
            checked={theme === 'dark'}
            checkedIcon={<RiMoonFill color='white' size={20} />}
            onClick={async () =>
              setThemeCookie(theme === 'dark' ? 'light' : 'dark')
            }
            title='Chuyển đổi chế độ sáng/tối'
          /> */}
        </Contact>

        <section className='container flex justify-between py-6 items-end relative max-md:px-3'>
          <button
            className='md:hidden'
            title='Tìm kiếm'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <RiListCheck className={`text-[--main-color]`} size={28} />
          </button>

          <div className='w-40'>
            <Link className='block' to='/blog' title={appSettings.app_title}>
              <img src={appSettings.app_logo} alt='Logo' />
            </Link>
          </div>

          <Form
            className='relative hidden md:block'
            method='GET'
            action='/blog/tim-kiem'
          >
            <input
              className={`border border-zinc-200 focus:outline-none focus:border-[--main-color] focus:bg-white rounded-full bg-zinc-100 py-1 px-4`}
              disabled={false}
              name='q'
              placeholder='Tìm kiếm...'
            />

            <button
              className='absolute right-4 top-1'
              title='Tìm kiếm'
              type='submit'
            >
              <RiSearch2Line className={`text-[--main-color]`} />
            </button>
          </Form>

          <button
            className='md:hidden'
            title='Tìm kiếm'
            onClick={() => setShowSearch(!showSearch)}
          >
            <RiSearch2Line className={`text-[--main-color]`} size={28} />
          </button>
        </section>

        <section className='md:hidden px-3'>
          <Form
            className={`relative overflow-hidden transition-all duration-500`}
            style={{ height: showSearch ? 42 : 0 }}
            method='GET'
            action='/blog/tim-kiem'
          >
            <input
              className={`w-full border border-[--sub1-text]/50 focus:outline-none focus:border-[--main-color] focus:bg-white rounded-full bg-zinc-100 py-2 px-4`}
              disabled={false}
              name='q'
              placeholder='Tìm kiếm...'
              autoFocus
            />

            <button
              className='absolute right-4 top-2'
              title='Tìm kiếm'
              type='submit'
            >
              <RiSearch2Line className={`text-[--main-color]`} />
            </button>
          </Form>
        </section>
      </header>

      <NavBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </>
  );
}

const Contact = ({
  contact,
  children,
}: {
  contact: { email: string; phone: string };
  children?: ReactNode;
}) => {
  return (
    <section className='bg-[--main-color] text-[--sub2-text] text-xs dark:text-white hidden md:block'>
      <div className='container flex justify-between items-center py-1 max-md:ml-3'>
        <div className={`${style.contact} flex`}>
          <div className='time'>
            {new Date().toLocaleDateString('vi', {
              weekday: 'long',
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            })}
          </div>

          <div className='hotline' title='Hotline'>
            <RiPhoneFill />
            <span>Đường dây nóng:</span>
            <a
              className='text-sm font-semibold hover:underline'
              href={`tel:${contact.phone}`}
            >
              {contact.phone}
            </a>
          </div>

          <div className='email flex' title='Email'>
            <RiMailFill />
            <span>Email:</span>
            <a className='hover:underline' href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
          </div>
        </div>

        <div className='theme-toggle'>{children}</div>
      </div>
    </section>
  );
};
