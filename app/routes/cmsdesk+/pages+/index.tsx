import { json, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData, useNavigate } from '@remix-run/react';

import { getPages } from '~/services/post.server';
import PostCard from '~/components/PostCard';
import { RiAddLine } from '@remixicon/react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import LoadingOverlay from '~/components/LoadingOverlay';
import { authenticator } from '~/services/auth.server';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/cmsdesk/login',
  });

  const pages = await getPages({ user });

  return json({ pages });
};

export default function PostManager() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { pages } = useLoaderData<typeof loader>();

  if (!pages.length) {
    return (
      <div className='container flex flex-col items-center justify-center h-full'>
        <h1 className='text-2xl font-bold'>No pages found</h1>
        <button
          className='mt-4 rounded-lg bg-blue-500 p-3 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg active:bg-blue-500/80'
          onClick={async () => {
            try {
              setLoading(true);

              navigate(`/cmsdesk/pages/new`);
            } catch (error: any) {
              toast[(error.type as 'error') || 'error'](error.message);
            } finally {
              setLoading(false);
            }
          }}
        >
          <RiAddLine />
        </button>
      </div>
    );
  }

  return (
    <div className='container grid grid-cols-12 gap-4'>
      {loading && <LoadingOverlay />}

      {pages.map((post: any, i: number) => (
        <PostCard post={post} key={i} />
      ))}

      <button
        className='fixed bottom-24 right-10 center rounded-lg bg-blue-500 p-3 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg active:bg-blue-500/80'
        onClick={async () => {
          try {
            setLoading(true);

            navigate(`/cmsdesk/pages/new`);
          } catch (error: any) {
            toast[(error.type as 'error') || 'error'](error.message);
          } finally {
            setLoading(false);
          }
        }}
      >
        <RiAddLine />
      </button>
    </div>
  );
}
