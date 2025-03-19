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
              <Link to={`${s.img_link}`}>
                <img
                  className='w-full h-full object-contain object-center'
                  src={s.img_url}
                  alt={s.img_title}
                />
              </Link>
            </div>
          ))}
      </div>
    </section>
  );
}

const content = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget felis vel ante placerat varius. Sed pulvinar, magna vel tincidunt gravida, lectus magna fermentum elit, at facilisis velit arcu a risus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.',
  'Etiam vestibulum, nisl eu finibus ultrices, ipsum neque dignissim ipsum, a convallis turpis magna eget turpis. Suspendisse potenti. Mauris vel metus sit amet magna iaculis pharetra. Donec venenatis erat non velit eleifend, vel cursus risus aliquam. Cras ultrices vehicula justo, in congue libero tincidunt in.',
  'Maecenas semper metus in risus pharetra, id scelerisque nisi blandit. Suspendisse potenti. Vestibulum eget metus et ante interdum faucibus. Integer eget magna quis lacus facilisis porttitor. Nullam eu risus vestibulum, euismod odio vel, interdum nisi.',
];
