import { RiFilter2Line } from '@remixicon/react';
import { DetailedHTMLProps, SelectHTMLAttributes } from 'react';
import { SCHOOL } from '~/constants/school.constant';
import Select from '~/widgets/Select';

export default function SelectBar({ openFilter }: { openFilter: () => void }) {
  return (
    <section className='options sticky top-[112px] lg:top-[144px] bg-white py-2 shadow-sm col-span-12 z-20'>
      <div className='container flex flex-col lg:flex-row flex-col-reverse gap-4 justify-between items-start lg:items-center text-sm'>
        <div className='flex gap-2 lg:gap-4'>
          <button
            className='lg:hidden bg-slate-200/50 rounded p-3'
            onClick={openFilter}
          >
            <RiFilter2Line />
          </button>

          <Select name='tuition' label='Học phí:'>
            {Object.values(SCHOOL.TUITION).map(({ name, slug }, i) => (
              <option className='' value={slug} key={i}>
                {name}
              </option>
            ))}
          </Select>

          <Select name='program' label='Chương trình học:'>
            {Object.values(SCHOOL.PROGRAM).map(({ name, slug }, i) => (
              <option className='' value={slug} key={i}>
                {name}
              </option>
            ))}
          </Select>
        </div>

        <p className='max-lg:text-xs'>
          <b>Tìm thấy:</b> {11} trường
        </p>
      </div>
    </section>
  );
}
