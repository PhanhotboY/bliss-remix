import { ActionFunctionArgs, LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useState } from 'react';

import BlogEditor from '~/components/PostEditor/Blog';
import ContactPageEditor from '~/components/PostEditor/ContactPage';
import LandingPageEditor from '~/components/PostEditor/LandingPage';
import { PAGE } from '~/constants/page.constant';
import { uploadImage } from '~/lib/uploadHandler.server';
import { authenticator } from '~/services/auth.server';
import { deletePost, getPostDetail, updatePost } from '~/services/post.server';
import { getPostCategories } from '~/services/postCategory.server';
import { getPostTemplates } from '~/services/postTemplate.server';

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
        const r = request.clone();
        let formData = await r.formData();

        const folder = formData.get('folder') as string;
        const file = formData.get('thumbnail') as File;
        let thumbnail;

        if (file?.size > 0) {
          formData = await uploadImage(request, folder);
          thumbnail = formData.get('thumbnail') as string;
        }
        const title = formData.get('title') as string;
        const content = formData.get('content') as string;
        const category = formData.get('category') as string;
        const template = formData.get('template') as string;
        const isPublished = formData.get('isPublished') === 'true';

        // Save the post to the database
        const post = await updatePost(
          id,
          { title, content, thumbnail, category, template, isPublished },
          user
        );

        // return redirect('/cmsdesk/pages');
        return json({
          post,
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
        // Delete the post from the database
        const res = await deletePost(id, user!);
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

  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/cmsdesk/login',
  });
  // Fetch the post from the database
  const post = await getPostDetail(id, user);
  const postTemplates = await getPostTemplates();
  const postCategories = await getPostCategories();

  return json({ post, postTemplates, postCategories });
};

export default function EditPost() {
  const { post, postTemplates } = useLoaderData<typeof loader>();

  const [template, setTemplate] = useState(
    post.pst_template._id ||
      postTemplates.find((tem) => tem.ptp_code === PAGE.TEMPLATE.BLOG.code)
        ?.id ||
      postTemplates[0].id
  );

  switch (template) {
    case postTemplates.find(
      (tem) => tem.ptp_code === PAGE.TEMPLATE.LANDING_PAGE.code
    )?.id:
      return (
        <LandingPageEditor
          post={post}
          type='update'
          template={template}
          setTemplate={setTemplate}
        />
      );

    case postTemplates.find(
      (tem) => tem.ptp_code === PAGE.TEMPLATE.CONTACT_PAGE.code
    )?.id:
      return (
        <ContactPageEditor
          post={post}
          type='update'
          template={template}
          setTemplate={setTemplate}
        />
      );

    default:
      return (
        <BlogEditor
          post={post}
          type='update'
          template={template}
          setTemplate={setTemplate}
        />
      );
  }
}
