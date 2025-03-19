import { useLoaderData } from '@remix-run/react';
import Slider from 'react-slick';

import Heading2 from '~/widgets/Heading2';
import { loader } from '~/routes/_main+/_index+/_index';
import { RefObject, useRef, useState } from 'react';
import Hydrated from '~/components/Hydrated';
import { IImage } from '~/interfaces/image.interface';

// @ts-ignore
const SliderComponent = !!Slider.default ? Slider.default : Slider;

export default function Results() {
  const { sliders } = useLoaderData<typeof loader>();

  const [activeType, setActiveType] = useState(RESULT_TYPE.ACNES.VALUE);
  const [results, setResults] = useState<IImage[]>(
    sliders.find((slider) => slider.sld_type === activeType)?.sld_images || []
  );

  let sliderRef = useRef<Slider>(null);

  return (
    <section className='container'>
      <Heading2>THÀNH QUẢ ĐẠT ĐƯỢC TẠI HẢI ANH STARBEAUTY</Heading2>

      <div className='col-span-12'>
        <div className='flex justify-center space-x-0 md:space-x-4'>
          {Object.values(RESULT_TYPE).map((res) => (
            <button
              key={res.VALUE}
              className={`font-semibold uppercase text-base md:text-lg px-4 py-1 ${
                activeType === res.VALUE
                  ? 'rounded-full bg-[--sub1-text] text-[--sub6-text]'
                  : ''
              }`}
              onClick={() => {
                setActiveType(res.VALUE);
                setResults(
                  sliders.find((slider) => slider.sld_type === res.VALUE)
                    ?.sld_images || []
                );
              }}
            >
              {res.LABEL}
            </button>
          ))}
        </div>
      </div>

      <div className='col-span-12 -mx-4'>
        <Hydrated>
          {() => (
            <SliderComponent
              ref={(slider: Slider) => {
                sliderRef = slider as any as RefObject<Slider>;
              }}
              {...settings}
            >
              {results.map((img, i) => (
                <div key={i} className='px-4 aspect-square'>
                  <img
                    className='w-full h-full object-contain'
                    src={img.img_url}
                    alt={img.img_title}
                  />
                </div>
              ))}
            </SliderComponent>
          )}
        </Hydrated>
      </div>
    </section>
  );
}

const settings = {
  autoplay: true,
  infinite: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 3,
  variableWidth: false,
  pauseOnHover: true,
  dots: true,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        rows: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        rows: 3,
      },
    },
  ],
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
      className='dot hidden md:block'
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

const RESULT_TYPE = {
  ACNES: {
    LABEL: 'VI CHẠM THỦ CÔNG',
    VALUE: 'result-1',
  },
  SCARS: {
    LABEL: 'HỌC VIÊN',
    VALUE: 'result-2',
  },
  REJUVENATION: {
    LABEL: 'PHUN XĂM',
    VALUE: 'result-3',
  },
};
