import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';

import { authenticator } from '~/services/auth.server';
import BranchEditor from './components/BranchEditor';
import {
  createBranch,
  deleteBranch,
  getBranchDetail,
  updateBranch,
} from '~/services/branch.server';
import { useLoaderData } from '@remix-run/react';
import { getMapLink } from '~/utils';

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/cmsdesk/login',
  });
  const id = params.id;
  if (!id) {
    throw new Response(null, {
      status: 404,
      statusText: 'Branch not found',
    });
  }

  switch (request.method) {
    case 'PUT':
      try {
        let formData = await request.formData();

        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const msisdn = formData.get('msisdn') as string;
        const thumbnail = formData.get('thumbnail') as string;
        const map = formData.get('map') as string;
        const isMain = formData.get('isMain') === 'on';
        const province = formData.get('province') as string;
        const district = formData.get('district') as string;
        const street = formData.get('street') as string;

        if (
          !name ||
          !email ||
          !msisdn ||
          !thumbnail ||
          !map ||
          !province ||
          !district ||
          !street
        ) {
          return {
            toast: {
              message: 'Vui lòng điền đầy đủ thông tin!',
              type: 'error',
            },
            branch: null,
          };
        }

        // Save the branch to the database
        const branch = await updateBranch(
          id,
          {
            name,
            email,
            msisdn,
            thumbnail,
            map: getMapLink(map),
            isMain,
            address: { province, district, street },
          },
          user!
        );

        return {
          toast: {
            message: 'Chi nhánh được tạo thành công!',
            type: 'success',
          },
          branch,
        };
      } catch (error: any) {
        return {
          toast: { message: error.statusText || error.message, type: 'error' },
          branch: null,
        };
      }

    case 'DELETE':
      try {
        // Delete the page from the database
        const res = await deleteBranch(id, user!);
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
        toast: { message: 'Method not allowed', type: 'error' },
        branch: null,
      };
  }
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const id = params.id;
  if (!id) {
    throw new Error('Chi nhánh không tồn tại');
  }

  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/cmsdesk/login',
  });
  // Fetch the branch from the database
  const branch = await getBranchDetail(id);

  return { branch };
};

export default function UpdateBranch() {
  const { branch } = useLoaderData<typeof loader>();

  return <BranchEditor branch={branch} type='update' />;
}
