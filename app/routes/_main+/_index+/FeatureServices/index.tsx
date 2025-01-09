import { Link, useLoaderData } from '@remix-run/react';

import { loader } from '~/routes/_main+/_index+/_index';

export default function FeaturedServices() {
  const { sliders } = useLoaderData<typeof loader>();

  return (
    <section className='bg-[--sub3-color] -my-8 md:-my-12 lg:-my-16 py-8 md:py-12 lg:py-16'>
      <div className='container col-span-12 gap-4 lg:gap-8'>
        <div className='col-span-12 h-16 md:h-20 lg:h-28 w-fit m-auto'>
          <img
            className='h-full object-container object-center'
            src='/assets/dich-vu-noi-bat.png'
            alt='dich vu noi bat'
          />
        </div>

        {content.map((c, i) => (
          <p key={i} className='col-span-12 m-0'>
            {c}
          </p>
        ))}

        {sliders
          .find((s) => s.sld_type === 'services')
          ?.sld_images.map((s, i) => (
            <div className='col-span-12 md:col-span-6' key={i}>
              <Link to={`${s.link}`}>
                <img
                  className='w-full h-full object-contain object-center'
                  src={s.url}
                  alt={s.alt}
                />
              </Link>
            </div>
          ))}
      </div>
    </section>
  );
}

const content = [
  'Bliss Beauty Clinic tự hào là người bạn đồng hành tin cậy của +20.000 khách hàng trong hành trình tìm lại vẻ đẹp tự nhiên và rạng ngời. Chúng tôi đã và đang dần khẳng định vị thế của mình trong lĩnh vực chăm sóc da chuyên nghiệp tại TP.HCM.',
  'Các dịch vụ nổi bật, bao gồm: Chăm sóc da mụn Hydrogen AI tiên tiến, Oxy tươi tái tạo làn da, Peel da kiểm soát mụn, trẻ hoá da – nâng cơ không xâm lấn,…Với giá thành hợp lý, ưu đãi hấp dẫn, phù hợp với mọi đối tượng. Mang đến cho khách hàng những giải pháp làm đẹp hiệu quả và tiết kiệm.',
  'Là hệ thống chăm sóc da uy tín, chuyên nghiệp, Bliss Beauty sở hữu đội ngũ y bác sĩ, chuyên gia giỏi chuyên môn, giàu kinh nghiệm. Luôn tận tâm phục vụ và mang đến những trải nghiệm làm đẹp hài lòng nhất cho khách hàng.',
];
