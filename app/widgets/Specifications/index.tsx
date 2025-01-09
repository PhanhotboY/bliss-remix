import { RiGroupLine } from '@remixicon/react';

export default function Specifications() {
  return (
    <section className='container grid grid-cols-12 gap-8 scale-125 md:scale-100 flex-wrap items-center justify-evenly text-[--sub1-text]'>
      <div className='flex justify-center w-full items-center w-fit col-span-12 md:col-span-6 lg:col-span-4'>
        <RiGroupLine />

        <div className='pl-4 ml-4 border-l-4 border-[color:--main-color]'>
          <b className='text-xl uppercase'>
            40 triệu <span className='text-[--main-color]'>+</span>
          </b>

          <p className='text-sm'>Lượt truy cập</p>
        </div>
      </div>

      <div className='flex justify-center w-full items-center w-fit col-span-12 md:col-span-6 lg:col-span-4'>
        <RiGroupLine />

        <div className='pl-4 ml-4 border-l-4 border-[color:--main-color]'>
          <b className='text-xl uppercase'>
            40 triệu <span className='text-[--main-color]'>+</span>
          </b>

          <p className='text-sm'>Lượt truy cập</p>
        </div>
      </div>

      <div className='flex justify-center w-full items-center w-fit col-span-12 md:col-span-6 md:col-start-4 lg:col-span-4'>
        <RiGroupLine />

        <div className='pl-4 ml-4 border-l-4 border-[color:--main-color]'>
          <b className='text-xl uppercase'>
            40 triệu <span className='text-[--main-color]'>+</span>
          </b>

          <p className='text-sm'>Lượt truy cập</p>
        </div>
      </div>
    </section>
  );
}
