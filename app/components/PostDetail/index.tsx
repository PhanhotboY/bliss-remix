import { IPostDetail } from '~/interfaces/post.interface';
import { getPublicPeriod } from '~/lib';
import { useRootLoaderData } from '~/lib/useRootLoaderData';
import { RiEyeFill } from '@remixicon/react';

import './index.css';
import TextRenderer from '../TextRenderer';

export default function PostDetail({ post }: { post: IPostDetail }) {
  const { appSettings } = useRootLoaderData();

  return (
    <section id='post-detail' className='col-span-6 text-[--sub1-text]'>
      <article className={`block print:m-0`}>
        <img
          className='w-32 m-auto hidden print:block'
          src={appSettings.app_logo}
          alt={appSettings.app_title}
        />
        <h1 className='!text-3xl font-semibold my-4'>{post.pst_title}</h1>

        <div className='flex md:block items-center border-y py-1'>
          <time className='text-sm' dateTime={getPublicPeriod(post.createdAt)}>
            {getPublicPeriod(post.createdAt)}
          </time>

          <span className='mx-2'>|</span>

          <RiEyeFill size={16} className='inline text-[--main-color] mr-1' />
          {post.pst_views}
        </div>

        <div className='w-full my-4'>
          <img
            src={post.pst_thumbnail}
            alt={post.pst_title}
            className='w-full h-auto'
          />
        </div>

        <TextRenderer content={post.pst_content} />
      </article>
    </section>
  );
}
