import { Link } from '@remix-run/react';
import { RefObject, useRef } from 'react';
import Slider from 'react-slick';

import './index.css';
import Hydrated from '~/components/Hydrated';
import { IPage } from '~/interfaces/page.interface';
import { LinksFunction } from '@remix-run/node';

// @ts-ignore
const SliderComponent = !!Slider.default ? Slider.default : Slider;

export default function SameCategoryArticles({
  articles,
}: {
  articles: IPage[];
}) {
  let sliderRef = useRef<Slider>(null);

  const settings = {
    autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slideToScroll: 1,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    dots: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          dots: false,
        },
      },
    ],
    appendDots: (dots: any[]) => (
      <div
        style={{
          position: 'absolute',
          bottom: '107%',
          width: '100%',
          display: 'flex',
          justifyContent: 'end',
        }}
      >
        <ul style={{ margin: '0px' }}> {dots} </ul>
      </div>
    ),
    customPaging: (i: number) => (
      <div
        className='dot hidden md:block'
        style={{
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          margin: 0,
        }}
      ></div>
    ),
  };

  return (
    <section
      id='article_slider'
      className='text-white py-6 px-4 col-span-12 relative'
      style={{
        background: 'linear-gradient(var(--main-color) 0, #003414 100%)',
      }}
    >
      <div className='flex items-center justify-between w-full'>
        <h2 className='text-xl font-bold uppercase mr-2 text-[--sub3-text]'>
          cùng chuyên mục
        </h2>

        <div className='border-b grow mt-5'></div>
      </div>

      <div className='mt-4'>
        <Hydrated fallback={<div>Loading...</div>}>
          {() => (
            <SliderComponent
              ref={(slider: Slider) => {
                sliderRef = slider as any as RefObject<Slider>;
              }}
              {...settings}
            >
              {articles.slice(0, 8).map((article, i) => (
                <article
                  className='col-span-3 flex-col px-2 text-white hover:text-white/50'
                  key={i}
                >
                  <figure>
                    <Link
                      to={`/blog/${article.pst_slug}`}
                      className='thumb-wrapper'
                      draggable={false}
                    >
                      <img
                        src={article.pst_thumbnail}
                        alt={article.pst_title}
                        title={article.pst_title}
                      />
                    </Link>

                    <div className='content flex flex-col col-span-4'>
                      <h2
                        className={`text-base text-inherit mt-2 font-semibold`}
                        title={article.pst_title}
                      >
                        <Link to={`/blog/${article.pst_slug}`}>
                          {article.pst_title}
                        </Link>
                      </h2>
                    </div>
                  </figure>
                </article>
              ))}
            </SliderComponent>
          )}
        </Hydrated>
      </div>
    </section>
  );
}
