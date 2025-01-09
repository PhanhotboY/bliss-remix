import { ActionFunctionArgs, LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import ServiceEditor from '~/components/ServiceEditor';
import { authenticator } from '~/services/auth.server';
import { getPosts } from '~/services/post.server';
import {
  deleteService,
  getService,
  getServices,
  updateService,
} from '~/services/service.server';

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const id = params.id;
  if (!id) {
    throw new Response(null, {
      status: 404,
      statusText: 'Post not found',
    });
  }

  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/cmsdesk/login',
  });
  switch (request.method) {
    case 'PUT':
      try {
        let formData = await request.formData();

        const name = formData.get('name') as string;
        const description = formData.get('description') as string;
        const basePrice = formData.get('basePrice') as string;
        const discountPrice = formData.get('discountPrice') as string;
        const page = formData.get('page') as string;

        // Save the post to the database
        const post = await updateService(
          id,
          { name, description, basePrice, discountPrice, page },
          user!
        );

        // return redirect('/cmsdesk/pages');
        return json({
          post,
          toast: { message: 'Cập nhật dịch vụ thành công!', type: 'success' },
        });
      } catch (error: any) {
        console.error(error);
        return json({
          toast: { message: error.message, type: 'error' },
        });
      }

    case 'DELETE':
      try {
        // Delete the post from the database
        const res = await deleteService(id, user!);
        return json({
          res,
          toast: { message: 'Xóa dịch vụ thành công!', type: 'success' },
        });
      } catch (error: any) {
        console.error(error);
        return json({
          toast: { message: error.message, type: 'error' },
        });
      }

    default:
      return json({
        error: 'Method not allowed',
        toast: { message: 'Có lỗi xảy ra!', type: 'error' },
      });
  }
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const id = params.id;
  if (!id) {
    throw new Error('Post not found');
  }
  // Fetch the post from the database
  const [service, pages] = await Promise.all([getService(id), getPosts()]);

  return json({ service, pages });
};

export default function EditPost() {
  const { service } = useLoaderData<typeof loader>();

  return (
    <ServiceEditor
      fetcherKey={service.id || 'update-service'}
      service={service}
      type='update'
    />
  );
}
