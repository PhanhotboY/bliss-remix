import { Link } from '@remix-run/react';
import { format } from 'date-fns';
import { IPost } from '~/interfaces/post.interface';

export default function PostCard({
  post,
  cols,
}: {
  post: IPost & { pst_isPublished: boolean };
  cols?: { sm?: number; md?: number; lg?: number; xl?: number };
}) {
  const colClasses = `col-span-3 sm:col-span-${cols?.sm || 6} md:col-span-${
    cols?.md || 4
  } lg:col-span-${cols?.lg || 3} xl:col-span-${cols?.xl || 3}`;
  console.log(post);
  return (
    <div
      className={`${colClasses} group flex flex-col items-center text-dark shadow-lg p-2 border rounded-xl transition-all ease duration-300 hover:shadow-2xl`}
    >
      <Link
        to={`/cmsdesk/pages/${post.id}/edit`}
        className='w-full h-full rounded-xl overflow-hidden'
      >
        <img
          src={post.pst_thumbnail || '/placeholder.png'}
          alt={post.pst_title}
          loading='lazy'
          className='aspect-video w-full object-cover object-center  group-hover:scale-105 transition-all ease duration-300 '
        />
      </Link>

      <div className='flex flex-col w-full p-2'>
        <Link
          to={`/cmsdesk/pages/${post.id}/edit`}
          className='inline-block my-1'
        >
          <h2 className='font-semibold capitalize  text-base sm:text-lg'>
            <span
              className='bg-gradient-to-r from-accent/50 to-accent/50  dark:from-accentDark/50
              dark:to-accentDark/50
              bg-[length:0px_6px]
              group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 '
              style={{
                display: '-webkit-box',
                textOverflow: 'ellipsis',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflowWrap: 'break-word',
                overflow: 'hidden',
              }}
            >
              {post.pst_title}
            </span>
          </h2>
        </Link>

        <div className='flex justify-between items-center'>
          <span className='capitalize text-zinc-500 dark:text-light/50 text-sm'>
            {(() => {
              try {
                return format(new Date(post.updatedAt), 'MMMM dd, yyyy');
              } catch (error) {
                return post.updatedAt;
              }
            })()}
          </span>

          <div
            className={`center relative inline-block select-none whitespace-nowrap rounded-full 
          ${
            post.pst_isPublished ? 'bg-green' : 'bg-red'
          } py-1 px-2 align-baseline font-sans text-xs font-medium capitalize leading-none 
          tracking-wide text-white hover:cursor-pointer`}
          >
            <div className='mt-px'>
              <span className='font-bold'>
                {post.pst_isPublished ? 'đã đăng' : 'chưa đăng'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
