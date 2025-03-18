import { Link } from '@remix-run/react';
import { RiArrowLeftSLine, RiArrowRightSLine } from '@remixicon/react';
import { RefObject, useRef } from 'react';
import Slider from 'react-slick';
import { getPublicPeriod } from '~/lib';
import Hydrated from '../Hydrated';
import { IPage } from '~/interfaces/page.interface';

// @ts-ignore
const SliderComponent = !!Slider.default ? Slider.default : Slider;

export default function FeaturedNews({ posts }: { posts: IPage[] }) {
  let sliderRef = useRef<Slider>(null);
  const next = () => {
    // @ts-ignore
    sliderRef.slickNext();
  };
  const previous = () => {
    // @ts-ignore
    sliderRef.slickPrev();
  };

  const settings = {
    autoplay: true,
    infinite: true,
    speed: 500,
    autoplaySpeed: 3000,
    slidesToShow: 4,
    pauseOnHover: true,
    arrows: false,
    dots: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <section className='col-span-full mt-4'>
      <div
        className='relative pt-16 md:pt-24 pb-4 grid grid-cols-12 gap-x-6 px-2'
        style={{
          background: 'url("/bg-box.png") center/cover no-repeat',
        }}
      >
        <div
          className='absolute px-4 md:px-10 py-4 top-0 left-1/2 -translate-x-1/2'
          style={{
            background: 'url("/bg-title.png") center -5px / cover no-repeat',
          }}
        >
          <h2 className='uppercase mt-1 md:mt-5 text-xl md:text-2xl text-[--sub1-text] font-semibold'>
            Tin nổi bật
          </h2>
        </div>

        <div className='col-span-12 relative'>
          <Hydrated>
            {() => (
              <SliderComponent
                ref={(slider: Slider) => {
                  sliderRef = slider as any as RefObject<Slider>;
                }}
                {...settings}
              >
                {posts.map((post, i) => (
                  <article className='px-3 flex-col' draggable={false} key={i}>
                    <div className='bg-white'>
                      <figure className='hover:text-[--main-color]'>
                        <Link
                          to={`/blog/${post.pst_slug}`}
                          className='thumb-wrapper'
                        >
                          <img
                            src={post.pst_thumbnail}
                            alt={post.pst_title}
                            title={post.pst_title}
                          />
                        </Link>

                        <h2
                          className={`text-base text-inherit mt-2 font-semibold px-2`}
                          title={post.pst_title}
                          style={{
                            display: '-webkit-box',
                            textOverflow: 'ellipsis',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflowWrap: 'break-word',
                            overflow: 'hidden',
                            minHeight: '48px',
                          }}
                        >
                          <Link to={`/blog/${post.pst_slug}`}>
                            {post.pst_title}
                          </Link>
                        </h2>
                      </figure>

                      <div className='content flex flex-col px-2'>
                        <div>
                          <time className='text-xs' dateTime={post.createdAt}>
                            {getPublicPeriod(post.createdAt)}
                          </time>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </SliderComponent>
            )}
          </Hydrated>

          <button
            className='hidden md:block button absolute bg-white/85 rounded-r-lg -left-2 top-1/2 -translate-y-1/2 px-1 py-6'
            style={{
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
            }}
            onClick={previous}
            title='Trước'
          >
            <RiArrowLeftSLine size={32} />
          </button>

          <button
            className='hidden md:block button absolute bg-white/85 rounded-l-lg -right-2 top-1/2 -translate-y-1/2 px-1 py-6'
            style={{
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
            }}
            onClick={next}
            title='Tiếp theo'
          >
            <RiArrowRightSLine size={32} />
          </button>
        </div>
      </div>
    </section>
  );
}
