import { useLoaderData } from '@remix-run/react';
import { RefObject, useRef } from 'react';
import Slider from 'react-slick';

import { loader } from './_index';
import Heading2 from '~/widgets/Heading2';
import Hydrated from '~/components/Hydrated';
import './customer.css';

// @ts-ignore
const SliderComponent = !!Slider.default ? Slider.default : Slider;

export default function Customers() {
  const { sliders } = useLoaderData<typeof loader>();

  return (
    <section className=''>
      <Heading2>CÂU CHUYỆN KHÁCH HÀNG</Heading2>

      <section id='customer-slider'>
        <div className='container lg:px-16'>
          <div className='col-span-12 relative'>
            <Hydrated>
              {() => (
                <SliderComponent {...settings}>
                  {sliders
                    .find((sli) => sli.sld_type === 'clients')
                    ?.sld_images.map((img, i) => (
                      <div key={i} className='w-full px-4 flex flex-col gap-2'>
                        <div className='w-80 lg:w-full h-fit p-8 aspect-square m-auto'>
                          <img
                            className='w-full h-full rounded-full'
                            src={img.img_url}
                            alt={img.img_title}
                          />
                        </div>

                        <div className='-mt-8 text-center uppercase text-[--main-color]'>
                          {/* name */}
                          <h3 className='text-lg text-inherit font-semibold'>
                            Thuy Duong
                          </h3>
                          {/* title */}
                          <p className='text-sm'>Sinh Vien</p>
                        </div>

                        <div className='text-center'>
                          {/* content */}
                          <p className=''>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Vivamus lacinia odio vitae vestibulum
                            vestibulum. Cras porttitor malesuada felis. Donec
                            commodo diam eget nisi fringilla, at maximus ligula
                            dapibus. Proin tristique tellus in urna facilisis,
                            vel ullamcorper nisi auctor.
                          </p>

                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Vivamus lacinia odio vitae vestibulum
                            vestibulum. Cras porttitor malesuada felis. Donec
                            commodo diam eget nisi fringilla, at maximus ligula
                            dapibus. Proin tristique tellus in urna facilisis,
                            vel ullamcorper nisi auctor.
                          </p>
                        </div>
                      </div>
                    ))}
                </SliderComponent>
              )}
            </Hydrated>
          </div>
        </div>
      </section>
    </section>
  );
}

const settings = {
  className: 'center',
  autoplay: true,
  infinite: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 3,
  variableWidth: false,
  pauseOnHover: true,
  centerMode: true,
  lazyLoad: true,
  responsive: [
    {
      breakpoint: 1028,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        rows: 2,
        centerMode: false,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        rows: 3,
        centerMode: false,
      },
    },
  ],
};
