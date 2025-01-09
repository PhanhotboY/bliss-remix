import { ISessionUser } from '~/interfaces/auth.interface';
import { fetcher } from '.';
import { IProduct, IProductDetails } from '~/interfaces/product.interface';

const getProducts = async (options?: { category?: string }) => {
  const query = new URLSearchParams(options).toString();
  const products = await fetcher(`/products?${query}`);

  return products as Array<IProduct>;
};

const getProduct = async (id: string) => {
  const product = await fetcher(`/products/${id}`);

  return product as IProductDetails;
};

const createProduct = async (product: any, request: ISessionUser) => {
  const res = await fetcher('/products', {
    method: 'POST',
    body: JSON.stringify(product),
    request,
  });

  return res;
};

const updateProduct = async (
  id: string,
  product: any,
  request: ISessionUser
) => {
  const res = await fetcher(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(product),
    request,
  });

  return res;
};

const deleteProduct = async (id: string, request: ISessionUser) => {
  const res = await fetcher(`/products/${id}`, {
    method: 'DELETE',
    request,
  });

  return res;
};

export { getProducts, getProduct, createProduct, updateProduct, deleteProduct };
