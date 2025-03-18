import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';

import { authenticator } from '~/services/auth.server';
import { createPage } from '~/services/page.server';
import PageEditor from './components/PageEditor';

export const action = async ({ request }: ActionFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request);
  switch (request.method) {
    case 'POST':
      try {
        const r = request.clone();
        let formData = await r.formData();

        const folder = formData.get('folder') as string;
        const thumbnail = formData.get('thumbnail') as File;

        const title = formData.get('title') as string;
        const content = formData.get('content') as string;
        const category = formData.get('category') as string;
        const template = formData.get('template') as string;
        const isPublished = formData.get('isPublished') === 'true';

        if (!title || !template) {
          return {
            toast: {
              message: 'Vui lòng điền đầy đủ thông tin!',
              type: 'error',
            },
            page: null,
          };
        }

        // Save the page to the database
        const page = await createPage(
          { title, content, thumbnail, category, template, isPublished },
          user!,
        );

        return {
          toast: {
            message: isPublished
              ? 'Bài viết được tạo thành công!'
              : 'Bản nháp được lưu thành công!',
            type: 'success',
          },
          page,
        };
      } catch (error: any) {
        return {
          toast: { message: error.statusText || error.message, type: 'error' },
          page: null,
        };
      }

    default:
      return {
        toast: { message: 'Method not allowed', type: 'error' },
        page: null,
      };
  }
};

export default function CreatePage() {
  return <PageEditor />;
}
