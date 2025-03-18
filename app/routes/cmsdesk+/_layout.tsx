import { ActionFunctionArgs, json, LoaderFunctionArgs } from '@remix-run/node';
import {
  Link,
  NavLink,
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
  useNavigation,
} from '@remix-run/react';

import 'react-toastify/ReactToastify.css';
import HandsomeError from '~/components/HandsomeError';
import { updateAppSettings } from '~/services/app.server';
import { authenticator } from '~/services/auth.server';
import { getCurrentUser } from '~/services/user.server';
import { IUser } from '~/interfaces/user.interface';
import {
  RiBookShelfLine,
  RiCalendar2Line,
  RiDashboard3Line,
  RiFolderImageLine,
  RiGitBranchLine,
  RiLogoutBoxRLine,
  RiNewspaperLine,
} from '@remixicon/react';
import { countUnseenBookings } from '~/services/booking.server';
import LoadingOverlay from '~/components/LoadingOverlay';

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const user = await authenticator.isAuthenticated(request);

    let formData = await request.formData();

    const res = await updateAppSettings(
      {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        logo: formData.get('logo') as string,
        social: {
          facebook: formData.get('facebook') as string,
          youtube: formData.get('youtube') as string,
          tiktok: formData.get('tiktok') as string,
          zalo: formData.get('zalo') as string,
        },
        taxCode: formData.get('taxCode') as string,
        headScripts: formData.get('headScripts') as string,
        bodyScripts: formData.get('bodyScripts') as string,
      },
      user
    );

    return {
      ...res,
      toast: { message: 'Cập nhật thông tin thành công!', type: 'success' },
    };
  } catch (error: any) {
    console.error('Error updating app settings:', error);
    return {
      error: 'Failed to update app settings',
      toast: { message: error.message || error.statusText, type: 'error' },
    };
  }
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  try {
    if (url.pathname !== '/cmsdesk/login') {
      const auth = await authenticator.isAuthenticated(request, {
        failureRedirect: '/cmsdesk/login',
      });

      const unseenBookings = await countUnseenBookings(auth);
      const user = await getCurrentUser(auth);
      return json({ user, unseenBookings });
    }
  } catch (error) {
    console.log(error);
    await authenticator.logout(request, { redirectTo: '/cmsdesk/login' });
  }

  return json({ user: null, unseenBookings: 0 });
};

export function ErrorBoundary() {
  return <HandsomeError basePath='/cmsdesk' />;
}

export default function CmsDesk() {
  const { user, unseenBookings } = useLoaderData<typeof loader>();
  const location = useLocation();
  const isLoginPage = location.pathname === '/cmsdesk/login';
  const navigation = useNavigation();

  return (
    <main className='app_content text-[--sub7-text] select-auto'>
      {isLoginPage ? (
        <Outlet />
      ) : (
        <div className='flex flex-wrap bg-gray-100 w-full h-screen overflow-hidden'>
          <SideBar user={user!} unseenBookings={unseenBookings} />

          <div className='w-10/12 h-full p-8 overflow-y-auto'>
            <Outlet />
          </div>
        </div>
      )}

      {navigation.state === 'loading' && <LoadingOverlay />}
    </main>
  );
}

const SideBar = ({
  user,
  unseenBookings,
}: {
  user: IUser;
  unseenBookings: boolean;
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { to: '/cmsdesk', label: 'Dashboard', icon: <RiDashboard3Line /> },
    { to: '/cmsdesk/images', label: 'Hình ảnh', icon: <RiFolderImageLine /> },
    {
      to: '/cmsdesk/sliders',
      label: 'Hình ảnh trang chủ',
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
        >
          <path d='M7 3C6.44772 3 6 3.44772 6 4V7H3C2.44772 7 2 7.44772 2 8V20C2 20.5523 2.44772 21 3 21H17C17.5523 21 18 20.5523 18 20V17H21C21.5523 17 22 16.5523 22 16V4C22 3.44772 21.5523 3 21 3H7ZM17 7H8V5H20V15H18V8C18 7.44772 17.5523 7 17 7ZM16 9V15.7394L11.4911 11.6404L4 18.6321V9H16ZM11.5089 14.3596L16 18.4424V19H6.53702L11.5089 14.3596ZM7 13.5C7.82843 13.5 8.5 12.8284 8.5 12C8.5 11.1716 7.82843 10.5 7 10.5C6.17157 10.5 5.5 11.1716 5.5 12C5.5 12.8284 6.17157 13.5 7 13.5Z'></path>
        </svg>
      ),
    },
    { to: '/cmsdesk/categories', label: 'Danh mục', icon: <RiBookShelfLine /> },
    {
      to: '/cmsdesk/branches',
      label: 'Chi nhánh',
      icon: <RiGitBranchLine />,
    },
    { to: '/cmsdesk/pages', label: 'Trang', icon: <RiNewspaperLine /> },
    {
      to: '/cmsdesk/bookings',
      label: 'Đặt lịch',
      icon: <RiCalendar2Line />,
      badge: !!unseenBookings && (
        <div
          className={`absolute top-2 right-2 inline-block select-none whitespace-nowrap rounded-full 
    py-1 px-2 align-baseline font-sans text-xs font-medium capitalize leading-none bg-red
    tracking-wide text-white`}
        >
          <div className='mt-px'>
            <span className='font-bold'>{unseenBookings}</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className='w-2/12 bg-white rounded p-3 shadow-lg'>
      <UserBrief user={user} />

      <ul className='space-y-2 text-sm'>
        {navLinks.map((nav, i) => (
          <li key={i}>
            <NavLink
              to={nav.to}
              className={({ isPending }) => `${
                (
                  nav.to.replace('/cmsdesk', '')
                    ? location.pathname.includes(nav.to)
                    : location.pathname === nav.to
                )
                  ? 'text-orange'
                  : ''
              } flex items-center space-x-3 text-gray-700 p-2 rounded-md hover:text-blue-500 
        font-medium hover:bg-zinc-100 focus:shadow-outline hover:underline relative`}
            >
              <span className='text-gray-600 w-6'>{nav.icon}</span>
              <span>{nav.label}</span>

              {nav?.badge && nav.badge}
            </NavLink>
          </li>
        ))}

        <li>
          <NavLink
            to='/cmsdesk/logout'
            className='flex items-center space-x-3 text-gray-700 p-2 rounded-md hover:text-red-500
        font-medium hover:bg-gray-200 bg-gray-200 focus:shadow-outline hover:underline'
            onClick={async (e) => {
              e.preventDefault();

              if (window.confirm('Bạn có chắc chắn muốn đăng xuất?')) {
                await fetch('/cmsdesk/logout', { method: 'POST' });
                navigate('/cmsdesk/login');
              }
            }}
          >
            <span className='text-gray-600'>
              <RiLogoutBoxRLine />
            </span>
            <span>Đăng xuất</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

const UserBrief = ({ user }: { user: IUser }) => {
  const fullName = `${user.usr_firstName} ${user.usr_lastName}`;

  return (
    <Link
      to='/cmsdesk/account'
      className='flex items-center space-x-4 p-2 mb-5'
    >
      <div>
        <div className='h-12 rounded-full overflow-hidden aspect-square'>
          <img
            className='object-cover object-center h-full w-full'
            src='/favicon.ico'
            alt={fullName}
          />
        </div>
      </div>

      <div>
        <h4 className='font-semibold text-lg text-gray-700 capitalize font-poppins tracking-wide'>
          {fullName}
        </h4>
        <span className='text-sm tracking-wide flex items-center space-x-1 text-green'>
          <svg
            className='h-4 text-green-500'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
            />
          </svg>
          <span className='text-gray-600'>Verified</span>
        </span>
      </div>
    </Link>
  );
};
