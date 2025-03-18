import { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData, useNavigate } from '@remix-run/react';

import { getBranches } from '~/services/branch.server';
import { RiAddLine } from '@remixicon/react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import LoadingOverlay from '~/components/LoadingOverlay';
import BranchCard from './components/BranchCard';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const branches = await getBranches();

    return { branches };
  } catch (error: any) {
    return { branches: [], error };
  }
};

export default function PageManager() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { branches } = useLoaderData<typeof loader>();

  if (!branches.length) {
    return (
      <div className='container flex flex-col items-center justify-center h-full'>
        <h1 className='text-2xl font-bold'>No branches found</h1>
        <button
          className='mt-4 rounded-lg bg-blue-500 p-3 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg active:bg-blue-500/80'
          onClick={async () => {
            try {
              setLoading(true);

              navigate(`/cmsdesk/branches/new`);
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

      {branches.map((branch: any, i: number) => (
        <BranchCard branch={branch} key={i} />
      ))}

      <button
        className='fixed bottom-24 right-10 center rounded-lg bg-blue-500 p-3 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg active:bg-blue-500/80'
        onClick={async () => {
          try {
            setLoading(true);

            navigate(`/cmsdesk/branches/new`);
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
