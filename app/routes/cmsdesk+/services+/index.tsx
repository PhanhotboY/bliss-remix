import { ActionFunctionArgs, json } from '@remix-run/node';
import { useFetcher, useLoaderData, useNavigate } from '@remix-run/react';

import { getServices, createService } from '~/services/service.server';
import { RiAddLine } from '@remixicon/react';
import { useState } from 'react';
import { authenticator } from '~/services/auth.server';
import { toast } from 'react-toastify';
import LoadingOverlay from '~/components/LoadingOverlay';
import ServiceCard from '~/widgets/ServiceCard';

export const loader = async () => {
  const services = await getServices();

  return json({ services });
};

export default function ServiceManager() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { services } = useLoaderData<typeof loader>();

  if (!services.length) {
    return (
      <div className='container flex flex-col items-center justify-center h-full'>
        <h1 className='text-2xl font-bold'>No services found</h1>
        <button
          className='mt-4 rounded-lg bg-blue-500 p-3 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg active:bg-blue-500/80'
          onClick={async () => {
            try {
              setLoading(true);

              navigate(`/cmsdesk/services/new`);
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

      {services.map((service: any, i: number) => (
        <ServiceCard service={service} key={i} />
      ))}

      <button
        className='fixed bottom-24 right-10 center rounded-lg bg-blue-500 p-3 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg active:bg-blue-500/80'
        onClick={async () => {
          try {
            navigate(`/cmsdesk/services/new`);
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
