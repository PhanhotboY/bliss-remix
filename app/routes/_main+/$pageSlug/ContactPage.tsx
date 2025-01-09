import { useLoaderData } from '@remix-run/react';

import { loader } from '.';
import CTA from '../_index+/CTA';
import { useRootLoaderData } from '~/lib/useRootLoaderData';
import { getMapLink } from '~/utils';

export default function ContactPage() {
  const { page } = useLoaderData<typeof loader>();
  const { appSettings } = useRootLoaderData();

  return (
    <main className=''>
      <section className='w-full h-fit'>
        <img src={page.pst_thumbnail} alt={`${page.pst_title} thumbnail`} />
      </section>

      <div className='container my-16 gap-8'>
        <div className='col-span-12 sm:col-span-3'>
          <h2 className='uppercase text-[--main-color] text-2xl font-bold'>
            Hệ thống cơ sở
          </h2>

          <ul className='flex flex-col mt-4 divide-y divide-zinc-200 bg-zinc-100'>
            <li className='hover:text-[--sub1-text] cursor-pointer'>
              <p className='px-4 py-2 bg-white border-l-4 border-[--main-color]'>
                Cơ sở Cà Mau
              </p>
            </li>
          </ul>
        </div>

        <div className='col-span-12 sm:col-span-9'>
          <iframe
            className='w-full'
            src={getMapLink(appSettings.app_google.map)}
            height='500'
            style={{ border: 0 }}
            allowFullScreen={true}
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
          ></iframe>
        </div>
      </div>

      <CTA />
    </main>
  );
}
