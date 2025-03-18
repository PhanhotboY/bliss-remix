import { ActionFunctionArgs } from '@remix-run/node';

import { authenticator } from '~/services/auth.server';
import BranchEditor from './components/BranchEditor';
import { createBranch } from '~/services/branch.server';
import { getMapLink } from '~/utils';

export const action = async ({ request }: ActionFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request);
  switch (request.method) {
    case 'POST':
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
            page: null,
          };
        }

        // Save the page to the database
        const branch = await createBranch(
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

export default function CreateBranch() {
  return <BranchEditor type='create' />;
}
