import Heading2 from '~/widgets/Heading2';

export default function WhyUs() {
  return (
    <section className='container'>
      <Heading2>6 LÝ DO NÊN CHỌN HẢI ANH STARBEAUTY</Heading2>

      <div className='col-span-12 lg:col-span-6 grid grid-cols-6 gap-8 rounded-lg bg-[--sub1-color] p-6 font-semibold text-[--sub7-text] text-sm'>
        {reasons.map((reason, index) => (
          <div key={index} className='col-span-6 md:col-span-3 flex gap-4'>
            <div className='w-12 min-w-12 h-fit'>
              <img src={reason.icon} alt={reason.content} />
            </div>

            <div className='w-fit'>
              <p className='break-words'>{reason.content}</p>
            </div>
          </div>
        ))}
      </div>

      <div className='col-span-12 lg:col-span-6 h-96 rounded-lg overflow-hidden'>
        <img
          className='h-full'
          src='/assets/tu-van-voi-bac-si.png'
          alt='tu van voi bac si'
        />
      </div>

      {items.map((item) => (
        <div
          key={item.title}
          className='hidden lg:grid col-span-4 grid-cols-4 bg-[--sub1-color] rounded-lg p-4 gap-8'
        >
          <div className='col-span-2 rounded-full overflow-hidden aspect-square'>
            <img className='h-full' src={item.img} alt={item.title} />
          </div>

          <div className='col-span-2'>
            <h3 className='uppercase text-[--sub2-text] font-semibold text-5xl'>
              {item.title}
            </h3>
            <p className='mt-4'>{item.content}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

const reasons = [
  {
    icon: '/assets/why-us/1.png',
    content:
      'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    icon: '/assets/why-us/2.png',
    content:
      'Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor.',
  },
  {
    icon: '/assets/why-us/3.png',
    content: 'Excepteur sint occaecat cupidatat non proident sunt in culpa.',
  },
  {
    icon: '/assets/why-us/4.png',
    content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem.',
  },
  {
    icon: '/assets/why-us/5.png',
    content:
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.',
  },
  {
    icon: '/assets/why-us/6.png',
    content:
      'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet consectetur adipisci velit.',
  },
];

const items = [
  {
    title: '100%',
    img: '/assets/why-us/7.png',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    title: '2196+',
    img: '/assets/why-us/8.png',
    content:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    title: '50+',
    img: '/assets/why-us/9.png',
    content:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
];
