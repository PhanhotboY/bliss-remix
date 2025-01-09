import { ActionFunctionArgs } from '@remix-run/node';
import { authenticator, logout } from '~/services/auth.server';

export const action = async ({ request }: ActionFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request);
  await logout(user!);
  return await authenticator.logout(request, {
    redirectTo: '/cmsdesk/login',
  });
};
