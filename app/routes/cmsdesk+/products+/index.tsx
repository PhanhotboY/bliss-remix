import { ActionFunctionArgs, json } from '@remix-run/node';
import { useFetcher, useLoaderData, useNavigate } from '@remix-run/react';

import { getProducts, createProduct } from '~/services/product.server';
import { RiAddLine } from '@remixicon/react';
import { useState } from 'react';
import { authenticator } from '~/services/auth.server';
import { toast } from 'react-toastify';
import LoadingOverlay from '~/components/LoadingOverlay';
import ProductCard from '~/widgets/ProductCard';

export const loader = async () => {
  const products = await getProducts();

  return json({ products });
};

export default function ProductManager() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { products } = useLoaderData<typeof loader>();

  return (
    <div className='container grid grid-cols-12 gap-4'>
      {loading && <LoadingOverlay />}

      {products.map((product: any, i: number) => (
        <ProductCard product={product} key={i} />
      ))}

      <button
        className='fixed bottom-24 right-10 center rounded-lg bg-blue-500 p-3 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg active:bg-blue-500/80'
        onClick={async () => {
          try {
            navigate(`/cmsdesk/products/new`);
          } catch (error: any) {
            toast[(error.type as 'error') || 'error'](error.message);
          } finally {
            setLoading(false);
          }
        }}
      >
        <RiAddLine />
      </button>
    </div>
  );
}
