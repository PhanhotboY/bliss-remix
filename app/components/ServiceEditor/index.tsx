import { useFetcher, useLoaderData, useNavigate } from '@remix-run/react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import UpdateButtons from './UpdateButtons';
import CreateButtons from './CreateButtons';
import { action, loader } from '~/routes/cmsdesk+/services+/new';
import Select from '~/widgets/Select';
import TextInput from '../TextInput';
import { IService } from '~/interfaces/service.interface';
import Hydrated from '../Hydrated';
import TextEditor from '../TextEditor/index.client';

export default function ServiceEditor({
  service,
  fetcherKey,
  type,
}: {
  service?: IService;
  fetcherKey: string;
  type: 'update' | 'create';
}) {
  const navigate = useNavigate();
  const { pages } = useLoaderData<typeof loader>();

  const [loading, setLoading] = useState(false);

  const [isChanged, setIsChanged] = useState(false);
  const [name, setName] = useState(service?.svc_name || '');
  const [description, setDescription] = useState(
    service?.svc_description || ''
  );
  const [basePrice, setBasePrice] = useState(service?.svc_basePrice || 0);
  const [discountPrice, setDiscountPrice] = useState(
    service?.svc_discountPrice || 0
  );
  const [page, setPage] = useState(service?.svc_page._id || '');

  useEffect(() => {
    if (service) {
      setIsChanged(
        service.svc_name !== name ||
          JSON.stringify(
            JSON.parse(service.svc_description || '{}').blocks || {}
          ) !== JSON.stringify(JSON.parse(description || '{}').blocks || {}) ||
          service.svc_basePrice !== basePrice ||
          service.svc_discountPrice !== discountPrice ||
          service.svc_page._id !== page
      );
    }
  }, [service, name, description, basePrice, discountPrice, page]);

  const toastIdRef = useRef<any>(null);

  const fetcher = useFetcher<typeof action>({ key: fetcherKey });

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
          if (type === 'create' && toastData.type === 'success') {
            navigate(`/cmsdesk/services/${fetcher.data.service?.id}/edit`);
          }
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
    <fetcher.Form
      className='container grid grid-cols-12 gap-y-4 mt-8'
      method={type === 'update' ? 'PUT' : 'POST'}
      encType='multipart/form-data'
    >
      <div className='col-span-12'>
        <TextInput
          label='Tên dịch vụ'
          type='text'
          name='name'
          id='name'
          value={name}
          onChange={(value) => setName(value)}
          autoComplete='name'
          required
        />
      </div>

      {/* Thumbnail */}
      <div className='col-span-12 flex gap-x-4'>
        <div className='w-1/2'>
          <div className='relative wrapper rounded-xl border border-blue-100 w-full flex justify-center p-2 shadow-sm shadow-blue-500 '>
            <img
              src={
                pages.find((p) => p.id === page)?.pst_thumbnail ||
                '/placeholder.png'
              }
              alt=''
              className='w-full h-40 object-contain'
            />
          </div>
        </div>

        <div className='w-1/2 flex flex-col'>
          <Select
            className='w-full'
            label='Chọn trang'
            name='page'
            defaultValue={page}
            onChange={(e) => setPage(e.target.value)}
            required
          >
            <option value='' disabled>
              Chọn trang
            </option>
            {pages.map((page, i) => (
              <option key={i} value={page.id}>
                {page.pst_title}
              </option>
            ))}
          </Select>

          <div className='flex gap-4 mt-4'>
            <TextInput
              label='Giá gốc'
              type='number'
              name='basePrice'
              id='basePrice'
              value={basePrice}
              onChange={(value) => setBasePrice(Number(value))}
              autoComplete='price'
              required
            />

            <TextInput
              label='Giá giảm'
              type='number'
              name='discountPrice'
              id='discountPrice'
              value={discountPrice}
              onChange={(value) => setDiscountPrice(Number(value))}
              autoComplete='price'
              required
            />
          </div>
        </div>
      </div>

      <div className='col-span-12'>
        <label className='block text-sm font-semibold leading-6 text-black'>
          Mô tả
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
        <input type='hidden' name='description' value={description} required />
      </div>

      {type === 'update' && (
        <UpdateButtons loading={loading} isChanged={isChanged} />
      )}

      {type === 'create' && <CreateButtons loading={loading} />}
    </fetcher.Form>
  );
}
