import { ICategory } from '~/interfaces/category.interface';
import { fetcher } from '.';
import { ISessionUser } from '~/interfaces/auth.interface';

const getCategories = async () => {
  const categories = await fetcher('/categories');
  return categories as Array<ICategory>;
};

const getCategory = async (id: string) => {
  const category = await fetcher(`/categories/${id}`);
  return category as ICategory;
};

const createCategory = async (data: any, request: ISessionUser) => {
  const category = await fetcher('/categories', {
    method: 'POST',
    body: JSON.stringify(data),
    request,
  });
  return category as ICategory;
};

const updateCategory = async (id: string, data: any, request: ISessionUser) => {
  const category = await fetcher(`/categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    request,
  });
  return category;
};

const deleteCategory = async (id: string, request: ISessionUser) => {
  const category = await fetcher(`/categories/${id}`, {
    method: 'DELETE',
    request,
  });
  return category;
};

export {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
};
