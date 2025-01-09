import { ISessionUser } from '~/interfaces/auth.interface';
import { fetcher } from '.';
import { IPost, IPostDetail } from '~/interfaces/post.interface';

const getPosts = async (q?: string) => {
  const posts = await fetcher('/posts?type=blog');
  return posts as IPost[];
};

const getPages = async ({
  isPublished,
  user: request,
}: {
  isPublished?: boolean;
  user: ISessionUser;
}) => {
  const query = new URLSearchParams([
    ['isPublished', isPublished?.toString() || ''],
  ]);

  const posts = await fetcher(`/posts/all?${query.toString()}`, { request });
  return posts as IPost[];
};

const getUnpublishedPages = async ({
  user: request,
}: {
  user: ISessionUser;
}) => {
  const posts = await fetcher('/posts/unpublished', { request });
  return posts as IPost[];
};

const getPostDetail = async (id: string, request: ISessionUser) => {
  const post = await fetcher(`/posts/${id}`, { request });
  return post as IPostDetail;
};

const getPage = async (slug: string) => {
  const page = await fetcher(`/posts/${slug}`);
  return page as IPostDetail;
};

const createPost = async (data: any, request: ISessionUser) => {
  const post = await fetcher('/posts', {
    method: 'POST',
    body: JSON.stringify(data),
    request,
  });
  return post;
};

const updatePost = async (id: string, data: any, request: ISessionUser) => {
  const post = await fetcher(`/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    request,
  });
  return post;
};

const deletePost = async (id: string, request: ISessionUser) => {
  const post = await fetcher(`/posts/${id}`, {
    method: 'DELETE',
    request,
  });
  return post;
};

const increaseViewCount = async (id: string) => {
  const res = await fetcher(`/posts/${id}/views`, {
    method: 'POST',
  });
  return res;
};

export {
  getPosts,
  getPages,
  getPage,
  getPostDetail,
  createPost,
  updatePost,
  deletePost,
  increaseViewCount,
};
