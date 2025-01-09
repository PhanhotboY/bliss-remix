import { IPost } from '~/interfaces/post.interface';
import VerticalArtical from '../Post/Vertical';
// import BoxHeader from '../BoxHeading';
import { useEffect, useState } from 'react';

export default function PostBox({
  postsGetter,
}: // category,
{
  // category: ICategoryDetail | ICategory;
  postsGetter: () => Promise<Array<IPost>>;
}) {
  const [posts, setPosts] = useState<Array<IPost>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    postsGetter().then((posts) => {
      setPosts(posts);
      setLoading(false);
    });
  }, []);

  return (
    <section className='grid col-span-full grid-cols-12 gap-x-6'>
      {/* <BoxHeader category={category} /> */}

      <div className='grid grid-cols-12 col-span-full gap-x-6'>
        {loading ? (
          <div>Loading...</div>
        ) : (
          !!posts.length && (
            <>
              <div className='col-span-full md:col-span-6'>
                <VerticalArtical post={posts[0]} detailed important />
              </div>

              <div className='scroll grid grid-cols-2 md:grid-cols-6 col-span-full md:col-span-6 gap-4 md:gap-6 max-md:mt-4 max-md:px-2'>
                {posts.slice(1, 5).map((post, index) => (
                  <div className='col-span-1 md:col-span-3' key={index}>
                    <VerticalArtical post={post} />
                  </div>
                ))}
              </div>
            </>
          )
        )}
      </div>
    </section>
  );
}
