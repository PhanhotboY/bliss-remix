import { IPostCategory } from '~/interfaces/postCategory.interface';
import { fetcher } from '.';

const getPostCategories = async () => {
  const postCategories = await fetcher('/posts/categories');
  return postCategories as IPostCategory[];
};

const createPostCategory = async (data: any) => {
  const postCategory = await fetcher('/posts/categories', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return postCategory;
};

export { getPostCategories, createPostCategory };
