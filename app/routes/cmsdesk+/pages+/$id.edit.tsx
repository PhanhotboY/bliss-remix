import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { authenticator } from '~/services/auth.server';
import { deletePage, getPostDetail, updatePage } from '~/services/page.server';
import PageEditor from './components/PageEditor';

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const id = params.id;
  if (!id) {
    throw new Response(null, {
      status: 404,
      statusText: 'Page not found',
    });
  }

  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/cmsdesk/login',
  });

  switch (request.method) {
    case 'PUT':
      try {
        let formData = await request.formData();

        const folder = formData.get('folder') as string;
        const thumbnail = formData.get('thumbnail') as File;

        const title = formData.get('title') as string;
        const content = formData.get('content') as string;
        const category = formData.get('category') as string;
        const template = formData.get('template') as string;
        const isPublished = formData.get('isPublished');

        // Save the page to the database
        const page = await updatePage(
          id,
          { title, content, thumbnail, category, template, isPublished },
          user,
        );

        // return redirect('/cmsdesk/pages');
        return {
          page,
          toast: { message: 'Cập nhật bài viết thành công!', type: 'success' },
        };
      } catch (error: any) {
        console.error(error);
        return {
          toast: { message: error.message, type: 'error' },
        };
      }

    case 'DELETE':
      try {
        // Delete the page from the database
        const res = await deletePage(id, user!);
        return {
          res,
          toast: { message: 'Xóa bài viết thành công!', type: 'success' },
        };
      } catch (error: any) {
        console.error(error);
        return {
          toast: { message: error.message, type: 'error' },
        };
      }

    default:
      return {
        error: 'Method not allowed',
        toast: { message: 'Có lỗi xảy ra!', type: 'error' },
      };
  }
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const id = params.id;
  if (!id) {
    throw new Error('Page not found');
  }

  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/cmsdesk/login',
  });
  // Fetch the page from the database
  const page = await getPostDetail(id, user);

  return { page };
};

export default function EditPage() {
  const { page } = useLoaderData<typeof loader>();

  return <PageEditor page={page} />;
}
