import { LoaderFunctionArgs } from '@remix-run/node';
import {
  Link,
  useFetcher,
  useLoaderData,
  useLocation,
  useNavigate,
  useRevalidator,
  useSearchParams,
} from '@remix-run/react';

import { getPages } from '~/services/page.server';
import PostCard from '~/components/PostCard';
import { RiAddLine } from '@remixicon/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import LoadingOverlay from '~/components/LoadingOverlay';
import { authenticator } from '~/services/auth.server';
import { PAGE } from '~/constants/page.constant';
import Defer from '~/components/Defer';
import Select from '~/widgets/Select';
import { IPage } from '~/interfaces/page.interface';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/cmsdesk/login',
  });

  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const isPublished = !['false'].includes(
    searchParams.get('published') ?? 'true'
  );
  const pages = getPages({ isPublished, user }).catch((error) => {
    console.error(error);
    return [];
  });

  return { pages };
};

export default function PageManager() {
  const { pages: fetchedPages } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [published, setPublished] = useState(
    !['false'].includes(searchParams[0].get('published') ?? 'true')
  );
  const [pageTemplate, setPageTemplate] = useState<string>('');

  useEffect(() => {
    setPublished(
      !['false'].includes(searchParams[0].get('published') ?? 'true')
    );
  }, [searchParams[0].get('published')]);

  return (
    <div className='container flex flex-col items-center h-full'>
      <div className='w-full flex justify-between px-4 border-b border-gray'>
        <div className='flex gap-4'>
          <Link
            className={`-mb-[1px] rounded-t px-2 py-1 border-gray ${
              published ? 'border border-b-white text-orange' : ''
            }`}
            to={`/cmsdesk/pages?${
              searchParams[0].get('published') === 'true'
                ? searchParams[0].toString()
                : new URLSearchParams({
                    ...Object.fromEntries(searchParams[0].entries()),
                    published: 'true',
                  }).toString()
            }`}
            prefetch='intent'
          >
            Trang đã đăng
          </Link>

          <Link
            className={`-mb-[1px] rounded-t px-2 py-1 border-gray ${
              !published ? 'border border-b-white text-orange' : ''
            }`}
            to={`/cmsdesk/pages?${
              searchParams[0].get('published') === 'false'
                ? searchParams[0].toString()
                : new URLSearchParams({
                    ...Object.fromEntries(searchParams[0].entries()),
                    published: 'false',
                  }).toString()
            }`}
            prefetch='intent'
          >
            Trang nháp
          </Link>
        </div>

        <Select
          value={pageTemplate}
          onChange={(e) => setPageTemplate(e.target.value)}
        >
          <option value=''>Tất cả</option>

          {Object.entries(PAGE.TEMPLATE).map(([key, value]) => (
            <option value={value.code} key={key}>
              {value.name}
            </option>
          ))}
        </Select>
      </div>

      <div className='grid grid-cols-12 gap-4'>
        <Defer resolve={fetchedPages}>
          {(pages) => {
            if (pages.length === 0)
              return (
                <div className='col-span-12 flex items-center justify-center'>
                  <h1 className='text-2xl font-bold'>No pages found</h1>
                </div>
              );

            return pages
              .filter((page) =>
                pageTemplate === '' ? true : pageTemplate === page.pst_template
              )
              .map((page: any, i: number) => <PostCard post={page} key={i} />);
          }}
        </Defer>
      </div>

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

      {loading && <LoadingOverlay />}
    </div>
  );
}
