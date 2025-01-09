import UserProfileCard from '~/widgets/UserProfileCard';
import UserProfileDetails from '~/widgets/UserProfileDetails';
import { ActionFunctionArgs, json, LoaderFunctionArgs } from '@remix-run/node';
import { authenticator } from '~/services/auth.server';
import { getCurrentUser, updateUser } from '~/services/user.server';
import { useLoaderData } from '@remix-run/react';

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());
    const user = await authenticator.isAuthenticated(request);

    const res = await updateUser(user!.user.id, data, user!);

    return json({
      user: res,
      toast: { message: 'Update user successfully!', type: 'success' },
    });
  } catch (error: any) {
    return json({ toast: { message: error.message, type: 'error' } });
  }
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const auth = await authenticator.isAuthenticated(request);
  const user = await getCurrentUser(auth!);
  return json({ user });
};

export default function ManageAccount() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <div className='container'>
      <UserProfileDetails user={user} />
    </div>
  );
}
