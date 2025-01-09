import { Link, useLoaderData } from '@remix-run/react';

import Heading2 from '~/widgets/Heading2';
import { loader } from './_index';

export default function Testimony() {
  const { sliders } = useLoaderData<typeof loader>();

  return (
    <section className='container'>
      <Heading2>BÁO CHÍ NÓI GÌ VỀ NAILS NHÀ Ý</Heading2>

      <div className='col-span-12 flex items-center justify-evenly gap-8 flex-wrap'>
        {sliders
          .find((sli) => sli.sld_type === 'testimony')
          ?.sld_images.map((img, i) => (
            <div key={i} className='h-28 max-w-60'>
              {img.link ? (
                <Link to={img.link} target='_blank'>
                  <img
                    className='h-full object-contain object-center'
                    src={img.url}
                    alt={img.alt}
                    title={img.alt}
                  />
                </Link>
              ) : (
                <img
                  className='h-full object-contain object-center'
                  src={img.url}
                  alt={img.alt}
                  title={img.alt}
                />
              )}
            </div>
          ))}
      </div>
    </section>
  );
}
