import { useLoaderData } from '@remix-run/react';

import { loader } from '.';
import CTA from '../_index+/CTA';
import { useRootLoaderData } from '~/lib/useRootLoaderData';
import { getMapLink } from '~/utils';
import { IBranch } from '~/interfaces/branch.interface';
import { useState } from 'react';

export default function ContactPage() {
  const { page, branches } = useLoaderData<typeof loader>();
  const { appSettings } = useRootLoaderData();

  const [seletedBranch, setSelectedBranch] = useState<IBranch | null>(
    branches[0]
  );

  return (
    <main className=''>
      <section className='w-full h-fit'>
        <img
          src={page.pst_thumbnail?.img_url}
          alt={`${page.pst_title} thumbnail`}
        />
      </section>

      <div className='container my-16 gap-8'>
        <div className='col-span-12 sm:col-span-3'>
          <h2 className='uppercase text-[--main-color] text-2xl font-bold'>
            Hệ thống cơ sở
          </h2>

          <ul className='flex flex-col mt-4 divide-y divide-zinc-200 bg-zinc-100'>
            {branches?.map((bra, i) => (
              <li
                key={i}
                className='hover:text-[--sub1-text] cursor-pointer'
                onClick={() => setSelectedBranch(bra)}
              >
                <p
                  className={`px-4 py-2 bg-white ${
                    seletedBranch?.id === bra.id ? 'border-l-4' : ''
                  } border-[--main-color]`}
                >
                  {bra.bra_name}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className='col-span-12 sm:col-span-9'>
          <iframe
            className='w-full'
            src={getMapLink(seletedBranch?.bra_map || '')}
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
