import { Link } from '@remix-run/react';
import { format } from 'date-fns';
import { IProduct } from '~/interfaces/product.interface';

export default function ProductCard({
  product,
  cols,
}: {
  product: IProduct;
  cols?: { sm?: number; md?: number; lg?: number; xl?: number };
}) {
  const colClasses = `col-span-3 sm:col-span-${cols?.sm || 6} md:col-span-${
    cols?.md || 4
  } lg:col-span-${cols?.lg || 3} xl:col-span-${cols?.xl || 3}`;

  return (
    <div
      className={`${colClasses} group flex flex-col items-center text-dark shadow-lg p-2 border rounded-xl transition-all ease duration-300 hover:shadow-2xl`}
    >
      <Link
        to={`/cmsdesk/products/${product.id}/edit`}
        className='w-full h-full rounded-xl overflow-hidden'
      >
        <img
          src={product.prd_thumbnail}
          alt={product.prd_name}
          className='aspect-video w-full object-cover object-center  group-hover:scale-105 transition-all ease duration-300 '
        />
      </Link>

      <div className='flex flex-col w-full p-2'>
        <Link
          to={`/cmsdesk/products/${product.id}/edit`}
          className='inline-block my-1'
        >
          <h2 className='font-semibold capitalize  text-base sm:text-lg'>
            <span
              className='bg-gradient-to-r from-accent/50 to-accent/50  dark:from-accentDark/50
              dark:to-accentDark/50
              bg-[length:0px_6px]
              group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 '
            >
              {product.prd_name}
            </span>
          </h2>
        </Link>

        <span className='mb-1 bg-[--main-color] w-fit rounded-full text-[--sub6-text] px-2 text-sm'>
          {product.prd_category.pct_name}
        </span>

        <div className='uppercase text-[--sub5-text]'>
          <span className='line-through'>
            {product.prd_basePrice.toLocaleString()}vnd
          </span>
          <span className='ml-2 font-bold text-[--sub4-text]'>
            {product.prd_discountPrice.toLocaleString()}vnd
          </span>
        </div>
      </div>
    </div>
  );
}
