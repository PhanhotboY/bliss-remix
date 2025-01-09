import { Link, useLoaderData } from '@remix-run/react';

import { loader } from '~/routes/_main+/_index+/_index';

export default function FeaturedServices() {
  const { sliders } = useLoaderData<typeof loader>();

  return (
    <section className='bg-[--sub3-color] -my-8 md:-my-12 lg:-my-16 py-8 md:py-12 lg:py-16'>
      <div className='container col-span-12 gap-4 lg:gap-8'>
        <div className='col-span-12 h-16 md:h-20 lg:h-28 w-fit m-auto'>
          <img
            className='h-full object-container object-center'
            src='/assets/dich-vu-noi-bat.png'
            alt='dich vu noi bat'
          />
        </div>

        {content.map((c, i) => (
          <p key={i} className='col-span-12 m-0'>
            {c}
          </p>
        ))}

        {sliders
          .find((s) => s.sld_type === 'services')
          ?.sld_images.map((s, i) => (
            <div className='col-span-12 md:col-span-6' key={i}>
              <Link to={`${s.link}`}>
                <img
                  className='w-full h-full object-contain object-center'
                  src={s.url}
                  alt={s.alt}
                />
              </Link>
            </div>
          ))}
      </div>
    </section>
  );
}

const content = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu velit leo. Maecenas aliquam, tortor varius ultricies sollicitudin, enim nulla consequat diam, ac blandit ipsum magna id eros. Duis in mollis elit, sed porta nunc. Curabitur vel blandit ligula. Nam accumsan pharetra ex a euismod.',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec cursus varius est, nec consectetur purus tristique id.',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec cursus varius est, nec consectetur purus tristique id.',
];
