import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import {
  json,
  Link,
  Outlet,
  useFetcher,
  useLoaderData,
} from '@remix-run/react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import LoadingOverlay from '~/components/LoadingOverlay';
import TextInput from '~/components/TextInput';
import { authenticator } from '~/services/auth.server';
import {
  createCategory,
  getCategories,
  updateCategory,
} from '~/services/category.server';
import { getPages, getPosts } from '~/services/post.server';
import {
  getLayer1Categories,
  getLayer2Categories,
  getLayer3Categories,
} from '~/utils/category.util';
import Select from '~/widgets/Select';

export const action = async ({ request }: ActionFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/cmsdesk/login',
  });

  switch (request.method) {
    case 'POST': {
      const body = await request.formData();
      const name = body.get('name');
      const order = body.get('order');
      const parent = body.get('parent');
      const page = body.get('page');

      if (!name) {
        return json({
          toast: { message: 'Tên danh mục không được để trống', type: 'error' },
        });
      }
      if (!order) {
        return json({ toast: { message: 'Chưa nhập thứ tự', type: 'error' } });
      }
      if (!page) {
        return json({ toast: { message: 'Chưa chọn trang', type: 'error' } });
      }

      // Add category to database
      // await CategoryModel.build({ cat_name: name, cat_parent: parent, cat_page: page }).save();
      await createCategory({ name, order, parent, page }, user);

      return json({
        toast: { message: 'Thêm danh mục thành công', type: 'success' },
      });
    }

    default: {
      return json({ toast: { message: 'Method not allowed', type: 'error' } });
    }
  }
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/cmsdesk/login',
  });

  const categories = await getCategories();
  const pages = await getPages({ isPublished: true, user });

  return json({ categories, pages });
};

export default function ManageCategories() {
  const { categories, pages } = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof action>();
  const toastIdRef = useRef<any>(null);

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [order, setOrder] = useState('');

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
          setName('');
          setOrder('');
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
    <div className='grid grid-cols-12 gap-16'>
      {loading && <LoadingOverlay />}
      <Outlet />

      <fetcher.Form
        method='POST'
        action='/cmsdesk/categories'
        className='col-span-6 space-y-6'
      >
        <h2 className='text-2xl font-semibold'>Thêm danh mục</h2>

        <TextInput
          label='Tên danh mục'
          name='name'
          value={name}
          onChange={setName}
          required
        />

        <TextInput
          label='Thứ tự'
          name='order'
          type='number'
          step={100}
          value={order}
          onChange={setOrder}
          required
        />

        <Select
          label='Danh mục cha'
          name='parent'
          className='w-full'
          defaultValue=''
        >
          <option value=''>Không có</option>
          {[
            ...getLayer1Categories(categories),
            ...getLayer2Categories(categories),
          ].map((cat, i) => (
            <option key={i} value={cat.id}>
              {cat.cat_name}
            </option>
          ))}
        </Select>

        <Select
          label='Chọn trang'
          name='page'
          className='w-full'
          required
          defaultValue=''
        >
          <option value=''>Không có</option>
          {pages.map((post, i) => (
            <option key={i} value={post.id}>
              {post.pst_title}
            </option>
          ))}
        </Select>

        <div className='flex w-full justify-end'>
          <button
            className='center rounded-lg bg-blue-500 py-2 px-3 font-sans font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg enable:active:bg-blue-500/80 disabled:opacity-60'
            type='submit'
            disabled={loading || !name || !order}
          >
            Thêm danh mục
          </button>
        </div>
      </fetcher.Form>

      <div className='col-span-6 space-y-6'>
        <h2 className='text-2xl font-semibold'>Danh sách danh mục</h2>

        <ul className='space-y-2 px-4'>
          {getLayer1Categories(categories).map((cat1, i) => (
            <li key={i}>
              <Link
                to={`/cmsdesk/categories/${cat1.id}/edit`}
                className='text-blue-800 hover:underline'
              >
                {`${cat1.cat_order} - ${cat1.cat_name}`}
              </Link>

              <ul className='pl-2'>
                {getLayer2Categories(categories, cat1).map((cat2, j) => (
                  <li key={j} className='my-2 text-blue-800'>
                    <span className='text-sm'>-- </span>
                    <Link
                      to={`/cmsdesk/categories/${cat2.id}/edit`}
                      className='hover:underline'
                    >
                      {`${cat2.cat_order} - ${cat2.cat_name}`}
                    </Link>

                    <ul className='pl-2'>
                      {getLayer3Categories(categories, cat2).map((cat3, k) => (
                        <li key={k} className='my-2 text-blue-800'>
                          <span className='text-sm'>---- </span>
                          <Link
                            to={`/cmsdesk/categories/${cat3.id}/edit`}
                            className='hover:underline'
                          >
                            {`${cat3.cat_order} - ${cat3.cat_name}`}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
