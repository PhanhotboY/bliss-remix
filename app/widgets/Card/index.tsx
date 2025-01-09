import { Link } from '@remix-run/react';

export default function Card({
  data,
}: {
  data: {
    title: string;
    link: string;
    image: string;
    description: string;
    tag: string;
  };
}) {
  return (
    <article
      className='col-span-12 md:col-span-6 lg:col-span-3 border shadow-lg border border-zinc-200 rounded-xl'
      title={data.title}
    >
      <Link to={data.link} className=''>
        <figure className='aspect-video overflow-hidden'>
          <img src={data.image} alt={data.title} />
        </figure>

        <div className='p-4 flex flex-col gap-4 mt-2'>
          <div className='tag bg-[--main-color] rounded-full px-4 py-2 w-fit text-[--sub3-text] text-xs uppercase font-semibold'>
            {data.tag}
          </div>

          <h4 className='text-base font-semibold'>{data.title}</h4>

          <p className='text-sm text-[--sub2-text]'>{data.description}</p>
        </div>
      </Link>
    </article>
  );
}
