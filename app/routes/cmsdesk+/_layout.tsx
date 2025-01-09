import { ActionFunctionArgs, json, LoaderFunctionArgs } from '@remix-run/node';
import {
  Link,
  NavLink,
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
} from '@remix-run/react';

import 'react-toastify/ReactToastify.css';
import HandsomeError from '~/components/HandsomeError';
import { updateAppSettings } from '~/services/app.server';
import { authenticator } from '~/services/auth.server';
import { existsSync, rmSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { uploadImage } from '~/lib/uploadHandler.server';
import { getCurrentUser } from '~/services/user.server';
import { IUser } from '~/interfaces/user.interface';
import {
  RiBookShelfLine,
  RiBtcLine,
  RiCalendar2Line,
  RiCustomerServiceLine,
  RiDashboard3Line,
  RiFolderImageLine,
  RiLogoutBoxRLine,
  RiNewspaperLine,
  RiShoppingCartLine,
} from '@remixicon/react';
import { countUnseenBookings } from '~/services/booking.server';

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const user = await authenticator.isAuthenticated(request);
    const r = request.clone();
    let formData = (await r.formData()) as any;
    const favicon = formData.get('favicon') as File;

    if (favicon.size > 0) {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);

      const path = resolve(__dirname + '../../../public/favicon.ico');

      if (existsSync(path)) {
        rmSync(path);
      }

      const buffer = await favicon.arrayBuffer();
      writeFileSync(path, Buffer.from(buffer));
    }

    if (formData.get('logo').size > 0) {
      formData = (await uploadImage(request, 'logo')) as any;
    }

    const res = await updateAppSettings(
      {
        title: formData.get('title'),
        description: formData.get('description'),
        email: formData.get('email'),
        msisdn: formData.get('phone'),
        address: {
          province: formData.get('province'),
          district: formData.get('district'),
          // ward: formData.get('ward'),
          street: formData.get('street'),
        },
        social: {
          facebook: formData.get('facebook'),
          tiktok: formData.get('tiktok'),
          youtube: formData.get('youtube'),
          zalo: formData.get('zalo'),
        },
        logo: formData.get('logo'),
        google: {
          analytics: formData.get('analytics'),
          map: formData.get('map'),
        },
        taxCode: formData.get('taxCode'),
      },
      user
    );

    return json({
      ...res,
      toast: { message: 'Cập nhật thông tin thành công!', type: 'success' },
    });
  } catch (error: any) {
    console.error('Error updating app settings:', error);
    return json(
      {
        error: 'Failed to update app settings',
        toast: { message: error.message, type: 'error' },
      },
      { status: 500 }
    );
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
    { to: '/cmsdesk/categories', label: 'Danh mục', icon: <RiBookShelfLine /> },
    {
      to: '/cmsdesk/services',
      label: 'Dịch vụ',
      icon: <RiCustomerServiceLine />,
    },
    { to: '/cmsdesk/pages', label: 'Trang', icon: <RiNewspaperLine /> },
    // {
    //   to: '/cmsdesk/products',
    //   label: 'Sản phẩm',
    //   icon: <RiShoppingCartLine />,
    // },
    // { to: '/cmsdesk/orders', label: 'Đơn hàng', icon: <RiBtcLine /> },
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
              <span className='text-gray-600'>{nav.icon}</span>
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
      <div className='h-12 rounded-full overflow-hidden aspect-square'>
        <img
          className='object-cover object-center h-full w-full'
          src='/favicon.ico'
          alt={fullName}
        />
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
