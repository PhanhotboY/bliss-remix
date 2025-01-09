import { useLoaderData } from '@remix-run/react';
import SearchBox from '../SearchBox';
import { loader } from '~/routes/_main.$schoolModel';

export default function SearchBar() {
  const { schoolModel } = useLoaderData<typeof loader>();

  return (
    <section className='sticky top-[72px] w-full bg-[--sub2-color] py-2 col-span-12 z-50'>
      <div className='container'>
        <SearchBox sketch defaultSchoolModel={schoolModel} />
      </div>
    </section>
  );
}
