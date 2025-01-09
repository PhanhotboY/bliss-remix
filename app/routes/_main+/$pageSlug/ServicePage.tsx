import { Link, useLoaderData } from '@remix-run/react';
import Heading2 from '~/widgets/Heading2';
import { loader } from '.';
import Slider from 'react-slick';
import { RefObject, useRef, useState } from 'react';
import Hydrated from '~/components/Hydrated';
import TextRenderer from '~/components/TextRenderer';

import './servicePage.css';
import { toCurrencyString } from '~/utils';
import BookingPopup from '~/components/BookingPopup';

// @ts-ignore
const SliderComponent = !!Slider.default ? Slider.default : Slider;

export default function ServicePage() {
  const { services, page } = useLoaderData<typeof loader>();

  const [isShowBookingPopup, setIsShowBookingPopup] = useState(false);

  let sliderRef = useRef<Slider>(null);

  return (
    <main className='flex flex-col gap-16 pt-16'>
      <h1 className='col-span-12 text-center text-2xl lg:text-4xl text-[--sub2-text] font-black uppercase -my-6'>
        DỊCH VỤ NỔI BẬT
      </h1>

      <section id='service-slider'>
        <div className='col-span-12 relative'>
          <Hydrated>
            {() => (
              <SliderComponent className='center px-96' {...settings}>
                {services.map((svc, i) => (
                  <div
                    key={i}
                    className='w-full px-6 flex flex-col gap-4 hover:cursor-grab '
                  >
                    <Link className='' to={`/blog/${svc.svc_page.pst_slug}`}>
                      <div className='w-full aspect-video h-fit overflow-hidden'>
                        <img
                          className='hover:scale-105 transform transition-all duration-500'
                          src={svc.svc_page.pst_thumbnail}
                          alt={svc.svc_page.pst_title}
                        />
                      </div>
                    </Link>

                    <div className='text-center uppercase text-xl font-bold'>
                      <h3 className='text-[--main-color]'>{svc.svc_name}</h3>
                    </div>

                    <div className='description'>
                      <TextRenderer content={svc.svc_description} truncate />
                    </div>

                    <div className='flex justify-evenly items-center'>
                      <div className='flex flex-col'>
                        <h3 className='col-span-12 text-center lg:text-2xl text-[--sub2-text] font-black uppercase'>
                          Ưu đãi chỉ{' '}
                          <span className='capitalize'>
                            {toCurrencyString(svc.svc_discountPrice)}
                          </span>
                        </h3>

                        <p className='text-[--sub8-text]'>
                          (Giá gốc:{' '}
                          <span className='line-through'>
                            {svc.svc_basePrice.toLocaleString()} VNĐ
                          </span>
                          )
                        </p>
                      </div>

                      <button
                        className='w-max inline-flex items-center gap-2 rounded-full px-6 py-2 
    transition-all hover:shadow-lg disabled:pointer-events-none bg-[--main-color] text-white
    font-bold disabled:opacity-50 disabled:shadow-none hover:scale-105'
                        onClick={() => setIsShowBookingPopup(true)}
                      >
                        Đặt lịch tư vấn
                      </button>
                    </div>
                  </div>
                ))}
              </SliderComponent>
            )}
          </Hydrated>
        </div>
      </section>

      <TextRenderer content={page.pst_content} />

      {isShowBookingPopup && (
        <BookingPopup hidePopup={() => setIsShowBookingPopup(false)} />
      )}
    </main>
  );
}

const settings = {
  autoplay: true,
  infinite: true,
  speed: 500,
  autoplaySpeed: 3000,
  slidesToShow: 1,
  variableWidth: false,
  pauseOnHover: true,
  centerMode: true,
  lazyLoad: true,
  arrows: false,
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
