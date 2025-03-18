import { IPage } from '~/interfaces/page.interface';
import HorizontalPost from '../Post/Horizontal';
import VerticalArtical from '../Post/Vertical';
// import BoxHeader from '../BoxHeading';
import SideBar from '../../routes/blog+/SideBar';
import { useEffect, useState } from 'react';

export default function SmallPostBox({
  postsGetter,
  // category,
  showSidebar = false,
  detailed = false,
  ratio = '6/3',
  cols = 9,
  height,
  ads,
}: {
  // category: ICategoryDetail | string;
  postsGetter: () => Promise<IPage[]>;
  showSidebar?: boolean;
  detailed?: boolean;
  ratio?: string;
  cols?: number;
  height?: number;
  ads?: Array<any>;
}) {
  const [posts, setPosts] = useState<IPage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    postsGetter().then((posts) => {
      setPosts(posts);
      setLoading(false);
    });
  }, []);

  return (
    <section className='flex flex-col md:grid col-span-full grid-cols-12 gap-x-6'>
      <div className={`grid col-span-${cols} mt-4`}>
        {/* <BoxHeader category={category} /> */}

        <div className={`grid grid-cols-${cols} col-span-full gap-x-4`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            !!posts.length && (
              <>
                <div
                  className={`max-md:col-span-full col-span-${
                    ratio.split('/')[0]
                  } h-fit`}
                >
                  <VerticalArtical post={posts[0]} detailed important />
                </div>

                <div
                  className={`max-md:col-span-full col-span-${
                    ratio.split('/')[1]
                  }`}
                  style={{
                    maxHeight: height ? `${height}px` : '500px',
                  }}
                >
                  <ul
                    className={`scroll max-md:grid grid-cols-2 px-2 gap-x-4 md:gap-x-2 max-md:mt-4 md:scroll md:divide-y h-full md:overflow-auto`}
                  >
                    {posts.slice(1).map((post, index) => (
                      <li
                        className={`col-span-1 md:[&:not(:first-child)]:pt-2.5 ${
                          index > 3 ? 'hidden md:block' : ''
                        }`}
                        key={index}
                      >
                        <HorizontalPost
                          post={post}
                          ratio='1/2'
                          colSpan={3}
                          detailed={detailed}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )
          )}
        </div>
      </div>

      {showSidebar && <SideBar posts={posts} />}
    </section>
  );
}
