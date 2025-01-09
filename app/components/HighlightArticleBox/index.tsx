import { Link } from '@remix-run/react';
import { RiArrowRightSLine, RiMovie2Line } from '@remixicon/react';
import { IPost } from '~/interfaces/post.interface';
import { useEffect, useState } from 'react';

export default function HighlightPostBox({
  // category = { title: '', slug: '' },
  // posts = [],
  postsGetter,
}: {
  // category: { title: string; slug: string };
  posts?: Array<IPost>;
  postsGetter: () => Promise<Array<IPost>>;
}) {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Array<IPost>>([]);

  useEffect(() => {
    postsGetter().then((posts) => {
      setPosts(posts);
      setLoading(false);
    });
  }, []);

  return (
    <section className='bg-[--main-color] col-span-full'>
      <div className='container p-4 text-white'>
        <div className='flex justify-between w-full overflow-hidden'>
          <h2 className='font-bold text-xl'>
            <Link
              to={`/danh-muc/${category.slug}`}
              className='flex items-center hover:text-white/80'
            >
              <RiMovie2Line size={20} className='mr-2' />
              {category.title}
            </Link>
          </h2>

          <Link
            className='text-sm hover:text-white/80'
            to={`/danh-muc/${category.slug}`}
          >
            Xem thêm
            <RiArrowRightSLine className='inline-block' />
          </Link>
        </div>

        <div className='grid grid-cols-12 gap-x-4 md:gap-x-6 mt-4'>
          {loading ? (
            <div>Loading...</div>
          ) : (
            posts.slice(0, 4).map((post, index) => (
              <article
                className='col-span-6 max-md:mb-2 md:col-span-3 flex-col text-white'
                key={index}
              >
                <figure className='hover:text-white/80'>
                  <Link to={`/blog/${post.slug}`} className='thumb-wrapper'>
                    <img
                      src={post.thumbnailUrl}
                      alt={post.title}
                      title={post.title}
                    />
                  </Link>

                  <div className='content flex flex-col col-span-4'>
                    <h2
                      className={`text-base text-inherit mt-2 font-semibold`}
                      title={post.title}
                    >
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                  </div>
                </figure>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
