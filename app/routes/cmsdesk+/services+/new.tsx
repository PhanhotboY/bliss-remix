import { ActionFunctionArgs, LoaderFunctionArgs, json } from '@remix-run/node';
import ServiceEditor from '~/components/ServiceEditor';

import { uploadImage } from '~/lib/uploadHandler.server';
import { authenticator } from '~/services/auth.server';
import { getPosts } from '~/services/page.server';
import { createService } from '~/services/service.server';

export const action = async ({ request }: ActionFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request);
  switch (request.method) {
    case 'POST':
      try {
        let formData = await request.formData();

        const name = formData.get('name') as string;
        const description = formData.get('description') as string;
        const basePrice = Number(formData.get('basePrice'));
        const discountPrice = Number(formData.get('discountPrice'));
        const page = formData.get('page') as string;

        if (!name || !description || !basePrice || !discountPrice || !page) {
          throw new Error('Vui lòng điền đầy đủ thông tin');
        }

        // Save the service to the database
        const service = await createService(
          { name, description, basePrice, discountPrice, page },
          user!
        );

        return json({
          toast: {
            message: 'Dịch vụ đã được tạo thành công',
            type: 'success',
          },
          service,
        });
      } catch (error: any) {
        return json({
          toast: { message: error.statusText || error.message, type: 'error' },
          service: null,
        });
      }

    default:
      return json({
        toast: { message: 'Method not allowed', type: 'error' },
        service: null,
      });
  }
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const pages = await getPosts();

  return json({ pages });
};

export default function CreateService() {
  return <ServiceEditor fetcherKey='new-service' type='create' />;
}
