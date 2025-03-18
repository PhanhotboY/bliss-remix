import { ActionFunctionArgs, json } from '@remix-run/node';
import { getPosts } from '~/services/page.server';

export const action = async ({ request }: ActionFunctionArgs) => {
  const url = new URL(request.url);
  const posts = await getPosts();
  return json(posts);
};

export const loader = async ({ request }: ActionFunctionArgs) => {
  const url = new URL(request.url);
  const posts = await getPosts();
  return json(posts);
};
