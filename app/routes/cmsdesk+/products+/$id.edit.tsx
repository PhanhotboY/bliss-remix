import { ActionFunctionArgs, LoaderFunctionArgs, json } from '@remix-run/node';
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
import ImageInput from '~/components/ImageInput';
import TextEditor from '~/components/TextEditor/index.client';
import TextInput from '~/components/TextInput';
import { uploadImage } from '~/lib/uploadHandler.server';
import { authenticator } from '~/services/auth.server';
import {
  deleteProduct,
  getProduct,
  updateProduct,
} from '~/services/product.server';
import { getProductCategories } from '~/services/productCategory.server';
import Select from '~/widgets/Select';

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const id = params.id;
  if (!id) {
    throw new Response(null, {
      status: 404,
      statusText: 'Product not found',
    });
  }

  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/cmsdesk/login',
  });
  switch (request.method) {
    case 'PUT':
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
        const template = formData.get('template') as string;

        // Save the product to the database
        const product = await updateProduct(
          id,
          { name, description, thumbnail, category, template },
          user
        );

        // return redirect('/cmsdesk/products');
        return json({
          product,
          toast: { message: 'Cập nhật bài viết thành công!', type: 'success' },
        });
      } catch (error: any) {
        console.error(error);
        return json({
          toast: { message: error.message, type: 'error' },
        });
      }

    case 'DELETE':
      try {
        // Delete the product from the database
        const res = await deleteProduct(id, user!);
        return json({
          res,
          toast: { message: 'Xóa bài viết thành công!', type: 'success' },
        });
      } catch (error: any) {
        console.error(error);
        return json({
          toast: { message: error.message, type: 'error' },
        });
      }

    default:
      return json(
        { error: 'Method not allowed', toast: { message: 'Có lỗi xảy ra!' } },
        { status: 405 }
      );
  }
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const id = params.id;
  if (!id) {
    throw new Error('Product not found');
  }
  // Fetch the product from the database
  const product = await getProduct(id);
  const productCategories = await getProductCategories();

  return json({ product, productCategories });
};

export default function EditProduct() {
  const navigate = useNavigate();
  const { product, productCategories } = useLoaderData<typeof loader>();

  const [isChanged, setIsChanged] = useState(false);
  const [name, setName] = useState(product.prd_name || '');
  const [description, setDescription] = useState(product.prd_description || '');
  const [thumbnail, setThumbnail] = useState(product.prd_thumbnail || '');
  const [category, setCategory] = useState(
    product.prd_category._id || productCategories[0].id
  );
  const [quantity, setQuantity] = useState(product.prd_quantity || 0);
  const [basePrice, setBasePrice] = useState(product.prd_basePrice || 0);
  const [discountPrice, setDiscountPrice] = useState(
    product.prd_discountPrice || 0
  );

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
          break;
        }

        notify.update(toastIdRef.current, {
          render: fetcher.data?.toast.message,
          autoClose: 3000,
          isLoading: false,
          type: 'error',
        });

        break;
    }
  }, [fetcher.state]);

  useEffect(() => {
    setIsChanged(
      product.prd_name !== name ||
        JSON.stringify(
          JSON.parse(product.prd_description || '{}').blocks || {}
        ) !== JSON.stringify(JSON.parse(description || '{}').blocks || {}) ||
        product.prd_thumbnail !== thumbnail ||
        product.prd_category._id !== category
    );
  }, [product, description, name, thumbnail, category]);

  return (
    <fetcher.Form
      className='container grid grid-cols-12 gap-y-4 mt-8'
      method='PUT'
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
            onChange={(e) => setName(e.target.value)}
            autoComplete='name'
            className='block w-full rounded px-3.5 py-2 border border-zinc-300 placeholder:text-gray-400 focus:outline-none'
          />
        </div>
      </div>

      {/* Thumbnail */}
      <div className='col-span-12 flex gap-x-4'>
        <div className='w-1/2'>
          <ImageInput
            label='Thumbnail'
            name='thumbnail'
            id='thumbnail'
            value={thumbnail}
            onChange={(value) => setThumbnail(value)}
          />
        </div>

        <div className='w-1/2 flex flex-col'>
          <Select
            className='w-full'
            label='Danh mục sản phẩm'
            name='category'
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
            if (confirm('Bạn có chắc muốn xóa bài viết này chứ?')) {
              await fetch(
                `/cmsdesk/products/${params.id}/edit?_data=routes/cmsdesk.products_.$id.edit`,
                {
                  method: 'DELETE',
                }
              );
              navigate('/cmsdesk/products');
            }
          }}
        >
          Xóa
        </button>

        <div className='flex gap-x-2'>
          <button
            className='center rounded-lg bg-blue-500 py-2 px-3 font-sans font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg enable:active:bg-blue-500/80 disabled:opacity-60'
            type='submit'
            disabled={!isChanged || loading}
          >
            Lưu
          </button>

          <button
            className='center rounded-lg border border-blue-500 py-2 px-3 font-sans font-bold uppercase text-blue-500 shadow-md shadow-blue-500/20 transition-all hover:shadow-lg active:opacity-60'
            onClick={() => navigate('/cmsdesk/products')}
            type='button'
            disabled={loading}
          >
            Quay lại
          </button>
        </div>
      </div>
    </fetcher.Form>
  );
}
