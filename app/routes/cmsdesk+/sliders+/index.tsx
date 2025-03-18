import { json, useLoaderData } from '@remix-run/react';

import SliderInput from '~/widgets/SliderInput';
import { ActionFunctionArgs } from '@remix-run/node';
import HandsomeError from '~/components/HandsomeError';
import { getSliders, updateSlider } from '~/services/slider.server';
import { authenticator } from '~/services/auth.server';

export const meta = [
  {
    title: 'Manage Sliders',
  },
];

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    switch (request.method) {
      case 'POST':
        const user = await authenticator.isAuthenticated(request);
        if (!user) {
          return json({
            toast: { message: 'Vui lòng đăng nhập!', type: 'error' },
          });
        }

        const formData = await request.formData();

        await updateSlider(
          formData.get('type') as string,
          { images: JSON.parse(formData.get('images') as string) },
          user
        );

        return json({
          toast: { message: 'Upload images successfully!', type: 'success' },
        });

      default:
        return json({
          toast: { message: 'Method Not Allowed', type: 'error' },
        });
    }
  } catch (error: any) {
    return json({ toast: { message: error.message, type: 'error' } });
  }
};

export const loader = async () => {
  const sliders = await getSliders();

  return json({ sliders });
};

export default function CmsDesk() {
  const { sliders } = useLoaderData<typeof loader>();

  return (
    <div className='container flex flex-col gap-8'>
      <SliderInput
        label='Banners'
        type='banner'
        defaultImages={
          sliders.find((slider) => slider.sld_type === 'banner')?.sld_images
        }
      />

      <SliderInput
        label='Các dịch vụ'
        type='services'
        defaultImages={
          sliders.find((slider) => slider.sld_type === 'services')?.sld_images
        }
        hasLink
      />

      <SliderInput
        label='Kết quả điều trị mụn'
        type='result-acnes'
        defaultImages={
          sliders.find((slider) => slider.sld_type === 'result-acnes')
            ?.sld_images
        }
      />
      <SliderInput
        label='Kết quả điều trị thâm'
        type='result-scars'
        defaultImages={
          sliders.find((slider) => slider.sld_type === 'result-scars')
            ?.sld_images
        }
      />
      <SliderInput
        label='Kết quả trẻ hóa da'
        type='result-rejuvenation'
        defaultImages={
          sliders.find((slider) => slider.sld_type === 'result-rejuvenation')
            ?.sld_images
        }
      />

      <SliderInput
        label='Khách hàng'
        type='clients'
        defaultImages={
          sliders.find((slider) => slider.sld_type === 'clients')?.sld_images
        }
      />

      <SliderInput
        label='Bài báo'
        type='testimony'
        defaultImages={
          sliders.find((slider) => slider.sld_type === 'testimony')?.sld_images
        }
        hasLink
      />
    </div>
  );
}

export const ErrorBoundary = () => <HandsomeError basePath='/cmsdesk/images' />;
