import { Link } from '@remix-run/react';
import { RiMapPinFill, RiMapPinLine } from '@remixicon/react';

import { useRootLoaderData } from '~/lib/useRootLoaderData';
import { getMapLink, toAddressString } from '~/utils';
import Hydrated from '../Hydrated';
import { useEffect } from 'react';

export default function Footer() {
  const { appSettings: app } = useRootLoaderData();

  useEffect(() => {
    const script = document.createElement('script');

    script.src =
      'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v21.0&appId=950974113535167';
    script.async = true;
    script.defer = true;
    script.crossOrigin = 'anonymous';
    document.body.appendChild(script);
  }, []);

  return (
    <footer className='border-t border-zinc-200 py-8 bg-[--sub2-color] text-[--sub10-text]'>
      <div id='fb-root'></div>

      <div className='container gap-4 md:gap-8 lg:gap-16'>
        <section className='col-span-12 md:col-span-4 flex flex-col gap-4'>
          <Heading3>VỀ CHÚNG TÔI</Heading3>

          <div className='w-full h-24 col-span-4 md:items-center px-8'>
            <Link to='/'>
              <img
                className='object-contain object-center z-0'
                src={app.app_logo}
                alt={app.app_title}
              />
            </Link>
          </div>

          <p>{app.app_description}</p>

          <div className='w-full'>
            <iframe
              className='w-full'
              src={getMapLink(app.app_google.map)}
              height='150'
              style={{ border: 0 }}
              allowFullScreen={true}
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
            ></iframe>
          </div>
        </section>

        <section className='col-span-12 md:col-span-4 flex flex-col'>
          <Heading3>NAILS NHÀ Ý</Heading3>

          <p>
            <b>Hệ thống cơ sở</b>
          </p>
          <p className='leading-8'>
            <RiMapPinFill className='inline' size={20} />{' '}
            {toAddressString(app.app_address)}
          </p>

          <br />
          <p>
            <b>Mã Số thuế:</b> {app.app_taxCode}
          </p>
          <p>
            <b>Hotline Tư vấn & CSKH:</b>{' '}
            <a className='hover:underline' href={`tel:${app.app_msisdn}`}>
              {app.app_msisdn}
            </a>
          </p>
          <p>
            <b>Email:</b>{' '}
            <a className='hover:underline' href={`mailto:${app.app_email}`}>
              {app.app_email}
            </a>
          </p>
        </section>

        <section className='col-span-12 md:col-span-4 flex flex-col'>
          <Heading3>SOCIAL MEDIA</Heading3>

          <Hydrated>
            {() => (
              <div
                className='fb-page'
                data-href='https://www.facebook.com/@iconictalents.vn'
                data-tabs='timeline'
                data-width='500px'
                data-height='500px'
                data-small-header='false'
                data-adapt-container-width='true'
                data-hide-cover='false'
                data-show-facepile='true'
              >
                <blockquote
                  cite='https://www.facebook.com/@iconictalents.vn'
                  className='fb-xfbml-parse-ignore'
                >
                  <a href='https://www.facebook.com/@iconictalents.vn'>
                    Iconic Talents - Sinh Trắc Vân Tay Hiện Đại
                  </a>
                </blockquote>
              </div>
            )}
          </Hydrated>
        </section>
      </div>
    </footer>
  );
}

const Heading3 = ({ children }: { children: string }) => (
  <div className='py-4 w-fit'>
    <h3 className='text-lg w-max font-semibold uppercase text-[--sub10-text]'>
      {children}
    </h3>

    <div className='w-8 h-1 bg-black/10 mt-2'></div>
  </div>
);
