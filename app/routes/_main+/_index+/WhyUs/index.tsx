import Heading2 from '~/widgets/Heading2';

export default function WhyUs() {
  return (
    <section className='container'>
      <Heading2>6 LÝ DO NÊN CHỌN NAILS NHÀ Ý</Heading2>

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
          src='/assets/why-us.png'
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
      'PHÒNG KHÁM CHUYÊN KHOA DA LIỄU SỬ DỤNG CÔNG NGHỆ NHẬP KHẨU TỪ CANADA',
  },
  {
    icon: '/assets/why-us/2.png',
    content:
      'QUY TRÌNH ĐIỀU TRỊ CHUẨN Y KHOA ĐƯỢC FDA PHÊ DUYỆT VÀ BÁC SĨ DA LIỄU TRÊN THẾ GIỚI TIN DÙNG.',
  },
  {
    icon: '/assets/why-us/3.png',
    content: '100% BÁC SĨ DA LIỄU TRỰC TIẾP KHÁM .',
  },
  {
    icon: '/assets/why-us/4.png',
    content: 'HIỆU QUẢ TƯƠNG ỨNG VỚI GÓI DỊCH V.',
  },
  {
    icon: '/assets/why-us/5.png',
    content: '100% ĐIỀU DƯỠNG Y KHOA ĐƯỢC ĐÀO TẠO CHUYÊN SÂU',
  },
  {
    icon: '/assets/why-us/6.png',
    content: 'TRANG BỊ NHÀ THUỐC CHUẨN GPP VỚI THUỐC ĐẶC TRỊ CHÍNH HÃNG 100%.',
  },
];

const items = [
  {
    title: '100%',
    img: '/assets/why-us/7.png',
    content: 'Bác sĩ tại phòng khám là bác sĩ chuyên khoa da liễu',
  },
  {
    title: '2196+',
    img: '/assets/why-us/8.png',
    content: 'Bệnh nhân đã và đang điều trị tại phòng khám',
  },
  {
    title: '50+',
    img: '/assets/why-us/9.png',
    content: 'Dịch vụ làm đẹp chuẩn Quốc tế với công nghệ cao cấp',
  },
];
