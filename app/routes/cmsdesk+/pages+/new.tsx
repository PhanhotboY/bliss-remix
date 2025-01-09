import { ActionFunctionArgs, LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useState } from 'react';

import BlogEditor from '~/components/PostEditor/Blog';
import { uploadImage } from '~/lib/uploadHandler.server';
import { authenticator } from '~/services/auth.server';
import { createPost } from '~/services/post.server';
import { getPostCategories } from '~/services/postCategory.server';
import { getPostTemplates } from '~/services/postTemplate.server';

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
        const title = formData.get('title') as string;
        const content = formData.get('content') as string;
        const category = formData.get('category') as string;
        const template = formData.get('template') as string;
        const isPublished = formData.get('isPublished') === 'true';

        if (!title || !content || !category || !template) {
          return json({
            toast: {
              message: 'Vui lòng điền đầy đủ thông tin!',
              type: 'error',
            },
            post: null,
          });
        }

        // Save the post to the database
        const post = await createPost(
          { title, content, thumbnail, category, template, isPublished },
          user!
        );

        return json({
          toast: {
            message: isPublished
              ? 'Bài viết được tạo thành công!'
              : 'Bản nháp được lưu thành công!',
            type: 'success',
          },
          post,
        });
      } catch (error: any) {
        return json({
          toast: { message: error.statusText || error.message, type: 'error' },
          post: null,
        });
      }

    default:
      return json({
        toast: { message: 'Method not allowed', type: 'error' },
        post: null,
      });
  }
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const postTemplates = await getPostTemplates();
  const postCategories = await getPostCategories();

  return json({ postTemplates, postCategories });
};

export default function CreatePost() {
  const { postTemplates } = useLoaderData<typeof loader>();

  const [template, setTemplate] = useState(
    postTemplates.find((tem) => tem.ptp_code === 'blog')?.id ||
      postTemplates[0].id
  );

  return (
    <BlogEditor type='create' template={template} setTemplate={setTemplate} />
  );
}
