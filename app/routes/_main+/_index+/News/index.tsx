import { useLoaderData } from '@remix-run/react';

import Heading2 from '~/widgets/Heading2';
import { loader } from '~/routes/_main+/_index+/_index';
import VerticalArtical from '~/components/Post/Vertical';
import TextRenderer from '~/components/TextRenderer';

export default function News() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <section className='container'>
      <Heading2>TIN TỨC SỰ KIỆN</Heading2>

      <VerticalArtical
        className='col-span-12 md:col-span-6 row-span-1 md:row-span-2'
        post={posts[0]}
        detailed
        important
      />

      {posts.slice(1, 4).map((post) => (
        <VerticalArtical
          className='col-span-6 md:col-span-3'
          key={post.id}
          post={post}
        />
      ))}
    </section>
  );
}
