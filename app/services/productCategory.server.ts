import { IProductCategory } from '~/interfaces/productCategory.interface';
import { fetcher } from '.';

const getProductCategories = async () => {
  const categories = await fetcher('/products/categories');

  return categories as Array<IProductCategory>;
};

const createProductCategory = async (category: any) => {
  const res = await fetcher('/products/categories', {
    method: 'POST',
    body: JSON.stringify(category),
  });

  return res;
};

export { getProductCategories, createProductCategory };
