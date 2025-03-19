import { Link } from '@remix-run/react';
import { getPublicPeriod } from '~/lib';
import { IPage } from '~/interfaces/page.interface';
import { RiEyeFill } from '@remixicon/react';
import Hydrated from '../Hydrated';
import TextRenderer from '../TextRenderer';

export default function VerticalArtical({
  post,
  detailed = false,
  important = false,
  className = '',
}: {
  post: IPage;
  detailed?: boolean;
  important?: boolean;
  className?: string;
}) {
  return (
    <article className={`flex-col text-[--sub5-text] ${className}`}>
      <figure className='text-[--sub7-text] hover:text-[--main-color]'>
        <div className='w-full aspect-video'>
          <Link to={`/blog/${post.pst_slug}`} className='thumb-wrapper'>
            <img
              className='object-cover w-full h-full'
              src={post.pst_thumbnail?.img_url}
              alt={post.pst_title}
              title={post.pst_title}
            />
          </Link>
        </div>

        <figcaption className='content flex flex-col col-span-4'>
          <h2
            className={`${
              important ? 'text-2xl' : 'text-base'
            } text-inherit mt-2 max-md:px-2 font-bold`}
            title={post.pst_title}
            style={{
              display: '-webkit-box',
              textOverflow: 'ellipsis',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflowWrap: 'break-word',
              overflow: 'hidden',
            }}
          >
            <Link to={`/blog/${post.pst_slug}`}>{post.pst_title}</Link>
          </h2>
        </figcaption>
      </figure>

      {detailed && (
        <div className='max-md:px-2'>
          <div className='m-1 md:m-4 flex items-center'>
            <time className='text-xs' dateTime={post.createdAt}>
              {getPublicPeriod(post.createdAt)}
            </time>
            <p className='mx-2'>|</p>{' '}
            <RiEyeFill size={16} className='mr-1 text-[--main-color]' />
            {post.pst_views}
          </div>

          <TextRenderer content={post.pst_excerpt} truncate />
        </div>
      )}
    </article>
  );
}
