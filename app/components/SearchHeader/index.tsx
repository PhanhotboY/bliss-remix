import SearchBar from './SearchBar';
import SelectBar from './SelectBar';

export default function SearchHeader({
  openFilter,
}: {
  openFilter: () => void;
}) {
  const schoolType = 'mam non';

  return (
    <>
      <SearchBar />

      <section className='bg-white col-span-12'>
        <div className='container'>
          <div className='py-2'>
            <h1 className='text-2xl font-semibold leading-loose'>
              Top 25 trường {schoolType} tốt mới nhất Tháng{' '}
              {new Date().getMonth() + 1}/{new Date().getFullYear()}
            </h1>

            <p>
              Danh sách trường {schoolType} tốt mới nhất Tháng{' '}
              {new Date().getMonth() + 1}/{new Date().getFullYear()} bao gồm:
              trường mẫu giáo, mầm non song ngữ, mầm non quốc tế, mầm non công
              lập, nhà trẻ tốt được ba mẹ review nhiều nhất
            </p>
          </div>
        </div>
      </section>

      <SelectBar openFilter={openFilter} />
    </>
  );
}
