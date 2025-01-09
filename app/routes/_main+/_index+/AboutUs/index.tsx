export default function About() {
  return (
    <section className='container gap-4 lg:gap-8'>
      <div className='col-span-12 md:col-span-6'>
        <h2 className='text-[--main-color] font-bold text-center text-3xl lg:text-5xl my-6'>
          Về Bliss Beauty Clinic
        </h2>

        <div className='overflow-y-auto h-fit md:h-[150px] lg:h-[255px] pb-4'>
          <div>
            <p>
              Bliss Beauty Clinic được thành lập vào năm 2022 và đã nhanh chóng
              mở rộng với chuỗi hệ thống làm đẹp uy tín tại TP.HCM. Với mục tiêu
              “Tái sinh làn da – Nâng tầm nhan sắc”, chúng tôi đã và đang giúp
              cho hàng ngàn khách hàng đạt được làn da sạch khỏe, rạng rỡ mỗi
              ngày.
            </p>

            <br />

            <p>
              Sở hữu đội ngũ Y bác sĩ, chuyên gia da liễu giỏi chuyên môn, giàu
              kinh nghiệm. Bliss Beauty mang đến những liệu trình trị liệu tiên
              tiến, không xâm lấn, không đau, không tái nhiễm và không cần nghỉ
              dưỡng.
            </p>

            <br />
            <p>
              Bliss Beauty tự hào với giá trị cốt lõi: “THẤU HIỂU – TẬN TÂM –
              ĐỒNG HÀNH – HIỆU QUẢ”. Chúng tôi luôn lắng nghe, thấu hiểu nhu cầu
              của từng khách hàng. Từ đó, thiết kế phác đồ cá nhân hóa, đảm bảo
              mang lại kết quả tốt nhất. Tại Bliss Beauty, mỗi khách hàng đều
              được chăm sóc tận tình, từ khâu thăm khám – trị liệu – chăm sóc
              sau trị liệu. Đảm bảo sự hài lòng và hiệu quả cho khách hàng.
            </p>
          </div>
        </div>
      </div>

      <div className='col-span-12 md:col-span-6'>
        <img
          className='h-full w-full object-contain object-top'
          src='/assets/about-bliss.png'
          alt=''
        />
      </div>
    </section>
  );
}
