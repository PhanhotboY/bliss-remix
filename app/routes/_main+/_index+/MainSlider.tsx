import Slider from 'react-slick';
import { Link, useLoaderData } from '@remix-run/react';
import { RefObject, useRef } from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from '@remixicon/react';

import { loader } from './_index';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Hydrated from '~/components/Hydrated';

// @ts-ignore
const SliderComponent = !!Slider.default ? Slider.default : Slider;

export default function MainSlider() {
  const settings = {
    autoplay: true,
    infinite: true,
    speed: 500,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    variableWidth: false,
    pauseOnHover: true,
    dots: true,
    appendDots: (dots: any[]) => (
      <div
        style={{
          position: 'absolute',
          bottom: '5%',
          width: '100%',
          height: 'fit-content',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <ul style={{ margin: '0px' }}> {dots} </ul>
      </div>
    ),
    customPaging: (i: number) => (
      <div
        className='dot'
        style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          margin: 0,
          border: '1px solid var(--sub1-text)',
        }}
      ></div>
    ),
  };

  const { sliders } = useLoaderData<typeof loader>();
  let sliderRef = useRef<Slider>(null);
  const next = () => {
    // @ts-ignore
    sliderRef.slickNext();
  };
  const previous = () => {
    // @ts-ignore
    sliderRef.slickPrev();
  };

  return (
    <section id='main-slider' className='grid grid-cols-12'>
      <div className='col-span-12 relative aspect-video overflow-hidden'>
        <Hydrated>
          {() => (
            <SliderComponent
              className='w-full h-full'
              ref={(slider: Slider) => {
                sliderRef = slider as any as RefObject<Slider>;
              }}
              {...settings}
            >
              {sliders
                .find((sli) => sli.sld_type === 'banner')
                ?.sld_images.map((img, i) => (
                  <div key={i} className='w-full h-full'>
                    {/* <Link to='/'> */}
                    <img
                      className='w-full h-full object-cover'
                      src={img.url}
                      alt={img.alt}
                    />
                    {/* </Link> */}
                  </div>
                ))}
            </SliderComponent>
          )}
        </Hydrated>

        <button
          className='hidden md:block button absolute bg-black/30 rounded-r-lg -left-2 top-1/2 
          -translate-y-1/2 px-1 py-6 text-[--sub6-text] hover:bg-black/50'
          onClick={previous}
          title='Trước'
        >
          <RiArrowLeftSLine size={32} />
        </button>

        <button
          className='hidden md:block button absolute bg-black/30 rounded-l-lg -right-2 top-1/2 
          -translate-y-1/2 px-1 py-6 text-[--sub6-text] hover:bg-black/50'
          onClick={next}
          title='Tiếp theo'
        >
          <RiArrowRightSLine size={32} />
        </button>
      </div>
    </section>
  );
}
