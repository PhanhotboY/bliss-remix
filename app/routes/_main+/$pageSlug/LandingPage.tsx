import { useLoaderData } from '@remix-run/react';

import { loader } from '.';
import TextRenderer from '~/components/TextRenderer';

export default function LandingPage() {
  const { page } = useLoaderData<typeof loader>();

  return (
    <main className='mb-16'>
      <section className='w-full h-fit'>
        <img src={page.pst_thumbnail} alt={`${page.pst_title} thumbnail`} />
      </section>

      <div className='container block'>
        <TextRenderer content={page.pst_content} />
      </div>
    </main>
  );
}
