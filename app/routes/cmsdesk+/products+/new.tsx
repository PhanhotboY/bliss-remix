import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from '@remix-run/node';
import {
  useFetcher,
  useLoaderData,
  useNavigate,
  useParams,
} from '@remix-run/react';
import { RiCloseLine, RiUploadCloud2Line } from '@remixicon/react';
import { useEffect, useRef, useState } from 'react';
import { toast as notify } from 'react-toastify';

import Hydrated from '~/components/Hydrated';
import TextEditor from '~/components/TextEditor/index.client';
import TextInput from '~/components/TextInput';
import { uploadImage } from '~/lib/uploadHandler.server';
import { authenticator } from '~/services/auth.server';
import { createProduct } from '~/services/product.server';
import { getProductCategories } from '~/services/productCategory.server';
import Select from '~/widgets/Select';

export const action = async ({ request }: ActionFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request);
  switch (request.method) {
    case 'POST':
      try {
        const r = request.clone();
        let formData = await r.formData();

        const folder = formData.get('folder') as string;
        const file = formData.get('thumbnail') as File;
        let thumbnail;

        if (file.size > 0) {
          formData = await uploadImage(request, folder);
          thumbnail = formData.get('thumbnail') as string;
        }
        const name = formData.get('name') as string;
        const description = formData.get('description') as string;
        const category = formData.get('category') as string;
        const quantity = formData.get('quantity') as string;
        const basePrice = formData.get('basePrice') as string;
        const discountPrice = formData.get('discountPrice') as string;
        const isPublished = formData.get('isPublished') === 'true';

        // Save the product to the database
        const product = await createProduct(
          {
            name,
            description,
            thumbnail,
            category,
            quantity,
            basePrice,
            discountPrice,
            isPublished,
          },
          user!
        );

        return json({
          toast: {
            message: isPublished
              ? 'Sản phẩm được tạo thành công!'
              : 'Bản nháp được lưu thành công!',
            type: 'success',
          },
          product,
        });
      } catch (error: any) {
        return json({
          toast: { message: error.statusText || error.message, type: 'error' },
          product: null,
        });
      }

    default:
      return json({
        toast: { message: 'Method not allowed', type: 'error' },
        product: null,
      });
  }
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const productCategories = await getProductCategories();

  return json({ productCategories });
};

export default function CreateProduct() {
  const navigate = useNavigate();
  const { productCategories } = useLoaderData<typeof loader>();

  const [isChanged, setIsChanged] = useState(false);
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [quantity, setQuantity] = useState('');
  const [basePrice, setBasePrice] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');
  const [category, setCategory] = useState(productCategories[0].id);

  const [loading, setLoading] = useState(false);
  const params = useParams();

  const toastIdRef = useRef<any>(null);

  const fetcher = useFetcher<typeof action>();

  useEffect(() => {
    switch (fetcher.state) {
      case 'submitting':
        toastIdRef.current = notify.loading('Loading...', {
          autoClose: false,
        });
        setLoading(true);
        break;

      case 'idle':
        if (fetcher.data?.toast && toastIdRef.current) {
          const { toast: toastData } = fetcher.data as any;
          notify.update(toastIdRef.current, {
            render: toastData.message,
            type: toastData.type || 'success', // Default to 'success' if type is not provided
            autoClose: 3000,
            isLoading: false,
          });
          toastIdRef.current = null;
          setLoading(false);
          fetcher.data.product?.id &&
            navigate(`/cmsdesk/products/${fetcher.data.product.id}/edit`);
          break;
        }

        notify.update(toastIdRef.current, {
          render: 'An error occurred',
          autoClose: 3000,
          isLoading: false,
          type: 'warning',
        });

        break;
    }
  }, [fetcher.state]);

  useEffect(() => {
    setIsChanged(
      '' !== name ||
        '[]' !== JSON.stringify(JSON.parse(description || '{}').blocks || {}) ||
        '' !== thumbnail ||
        '' !== category
    );
  }, [description, name, thumbnail, category]);

  return (
    <fetcher.Form
      className='container grid grid-cols-12 gap-y-4 mt-8'
      method='POST'
      encType='multipart/form-data'
    >
      <div className='col-span-12'>
        <label
          htmlFor='name'
          className='block text-sm font-semibold leading-6 text-black'
        >
          Name
        </label>

        <div className='mt-2.5'>
          <input
            type='text'
            name='name'
            id='name'
            defaultValue={name}
            // value={name}
            required
            onChange={(e) => setName(e.target.value)}
            autoComplete='name'
            className='block w-full rounded px-3.5 py-2 border border-zinc-300 placeholder:text-gray-400 focus:outline-none'
          />
        </div>
      </div>

      {/* Thumbnail */}
      <div className='col-span-12 flex gap-x-4'>
        <div className='w-1/2'>
          <p className='block text-sm font-semibold leading-6 text-black mb-4'>
            Thumbnail
          </p>

          <div className='items-center justify-center'>
            {thumbnail && (
              <div className='relative wrapper rounded-xl border border-blue-100 w-full flex justify-center p-2 shadow-sm shadow-blue-500 '>
                <img
                  src={thumbnail}
                  alt=''
                  className='w-1/2 aspect-video m-auto'
                />

                <button
                  className='absolute top-2 right-4'
                  type='button'
                  onClick={() => setThumbnail('')}
                >
                  <RiCloseLine />
                </button>
              </div>
            )}

            <label
              htmlFor='thumbnail'
              className='cursor-pointer flex flex-col w-full items-center rounded-xl border-2 border-dashed border-blue-400 bg-white p-6 text-center'
              style={{ display: !thumbnail ? 'block' : 'none' }}
            >
              <RiUploadCloud2Line className='w-6 h-6 text-blue-400 m-auto' />

              <h2 className='text-xl mt-2 font-medium text-gray-700 tracking-wide'>
                Thumbnail
              </h2>

              <p className='mt-2 text-gray-500 tracking-wide'>
                Upload or darg & drop your file SVG, PNG, JPG or GIF.
              </p>

              <input
                id='thumbnail'
                type='file'
                name='thumbnail'
                accept='image/*'
                className='hidden'
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const url = URL.createObjectURL(file);
                  setThumbnail(url);
                }}
              />
            </label>

            <input
              className='hidden'
              type='text'
              name='folder'
              value='blog'
              readOnly
            />
          </div>
        </div>

        <div className='w-1/2 flex flex-col'>
          <Select
            className='w-full'
            label='Danh mục sản phẩm'
            name='category'
            required
            defaultValue={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {productCategories.map((cat, i) => (
              <option key={i} value={cat.id}>
                {cat.pct_name}
              </option>
            ))}
          </Select>

          <div className='w-full mt-4 flex gap-4'>
            <TextInput
              label='Số lượng'
              name='quantity'
              type='number'
              value={quantity}
              required
              onChange={setQuantity}
            />

            <TextInput
              label='Giá gốc'
              name='basePrice'
              type='number'
              value={basePrice}
              required
              onChange={setBasePrice}
            />

            <TextInput
              label='Giá giảm'
              name='discountPrice'
              type='number'
              value={discountPrice}
              required
              onChange={setDiscountPrice}
            />
          </div>
        </div>
      </div>

      <div className='col-span-12'>
        <label className='block text-sm font-semibold leading-6 text-black'>
          Description
        </label>

        <Hydrated fallback={<div>Loading...</div>}>
          {() => (
            <TextEditor
              value={description}
              onChange={(c) => {
                setDescription(c);
              }}
            />
          )}
        </Hydrated>
        <input type='hidden' name='description' value={description} />
      </div>

      <div className='col-span-12 flex text-xs justify-between fixed top-0 right-0 w-10/12 bg-white px-8 py-4'>
        <button
          className='center rounded-lg bg-red py-2 px-3 font-sans font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg enable:active:bg-red-500/80 disabled:opacity-60'
          type='button'
          disabled={loading}
          onClick={async () => {
            if (confirm('Những thay đổi bạn thực hiện sẽ không được lưu.')) {
              navigate('/cmsdesk/products');
            }
          }}
        >
          Hủy
        </button>

        <div className='flex gap-x-2'>
          <button
            className='center rounded-lg bg-blue-500 py-2 px-3 font-sans font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg enable:active:bg-blue-500/80 disabled:opacity-60'
            type='submit'
            disabled={!isChanged || loading}
            name='isPublished'
            value='true'
          >
            Tạo sản phẩm
          </button>

          <button
            className='center rounded-lg border border-blue-500 py-2 px-3 font-sans font-bold uppercase text-blue-500 shadow-md shadow-blue-500/20 transition-all hover:shadow-lg active:opacity-60'
            type='submit'
            disabled={loading}
            name='isPublished'
            value='false'
          >
            Lưu bản nháp
          </button>
        </div>
      </div>
    </fetcher.Form>
  );
}
