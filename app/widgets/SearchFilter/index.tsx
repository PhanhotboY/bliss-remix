import { Form, useFetcher, useLocation, useNavigate } from '@remix-run/react';
import { RiCloseLine } from '@remixicon/react';
import {
  DetailedHTMLProps,
  FormEvent,
  InputHTMLAttributes,
  useState,
} from 'react';

export default function SearchFilter({
  className,
  closeFilter,
}: {
  className?: string;
  closeFilter: () => void;
}) {
  const [schoolType, setSchoolType] = useState<string>('');
  const fetcher = useFetcher();
  const location = useLocation();
  const navigate = useNavigate();

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const queryParams = new URLSearchParams(location.search);

    // Remove `schoolType` from the query params
    queryParams.delete('schoolType');

    // Add the new `schoolType` if it exists
    if (schoolType) {
      queryParams.set('schoolType', schoolType);
    }

    // Decode commas in `schoolType` if needed
    const updatedSearch = queryParams.toString().replace(/%2C/g, ',');

    // Navigate to the updated URL
    navigate(`${location.pathname}?${updatedSearch}`);
  };

  return (
    <section
      className={`${className} fixed lg:sticky inset-0 bg-black/80 lg:bg-white lg:block col-span-3 lg:top-[220px] 
    border border-zinc-200 rounded-lg shadow bg-white p-2 lg:p-4 z-50 lg:z-10 h-full lg:h-fit
    flex justify-end`}
      onClick={closeFilter}
    >
      <fetcher.Form
        className='w-3/4 lg:w-full h-full'
        action={location.pathname + location.search}
        method='GET'
        onSubmit={(e) => {
          closeFilter();
          submitHandler(e);
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='w-full h-full flex flex-col justify-between gap-4 bg-white w-1/2 rounded-lg p-4 lg:p-0'>
          <div className='flex flex-col gap-4'>
            <div className='title'>
              <h3 className='text-lg font-semibold'>Bộ lọc</h3>
            </div>

            <div className='flex flex-col gap-4'>
              <h4 className='text-sm text-[--sub2-text]'>Loại hình trường</h4>

              <div className='flex flex-wrap gap-2'>
                {[
                  { label: 'Tư thục', value: 'tu-thuc' },
                  { label: 'Công lập', value: 'cong-lap' },
                  { label: 'Song ngữ', value: 'song-ngu' },
                  { label: 'Quốc tế', value: 'quoc-te' },
                ].map((item, i) => (
                  <ColorfulCheckbox
                    key={i}
                    selected={schoolType}
                    label={item.label}
                    value={item.value}
                    name={`schoolType${i}`}
                    onChange={(e) => {
                      setSchoolType((prev) => {
                        const types = prev ? prev.split(',') : [];

                        if (e.target.checked) {
                          // Add the new value if it doesn't exist
                          return [...types, item.value].join(',');
                        } else {
                          // Remove the unchecked value
                          return types
                            .filter((type) => type !== item.value)
                            .join(',');
                        }
                      });
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className='flex gap-4 mt-4'>
            <button
              className='text-base border border-zinc-200 text-[--sub2-text] rounded-lg px-6 py-2 h-full col-span-1 w-full'
              type='submit'
              onClick={() => {
                setSchoolType('');
              }}
            >
              Đặt lại
            </button>

            <button
              className='bg-[--main-color] text-white text-base rounded-lg px-6 py-2 h-full col-span-1 w-full'
              type='submit'
            >
              Áp dụng
            </button>
          </div>
        </div>
      </fetcher.Form>

      <button
        className='lg:hidden absolute top-4 left-4 text-[--sub3-text] hover:bg-white/30 p-2 rounded-full'
        onClick={closeFilter}
      >
        <RiCloseLine />
      </button>
    </section>
  );
}

const ColorfulCheckbox = ({
  selected,
  name,
  value,
  label,
  ...props
}: {
  selected: string;
  label: string;
} & DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>) => {
  return (
    <div className='flex'>
      <input
        id={name}
        type='checkbox'
        name={name}
        value={value}
        hidden
        {...props}
      />
      <label
        htmlFor={name}
        className={`select-none cursor-pointer rounded-lg border border-zinc-200 
          py-2 px-3 text-sm text-[--sub1-text]
          ${
            selected.split(',').includes(value as string)
              ? 'bg-[--main-color] text-[--sub3-text] border-[--main-color]'
              : ''
          }`}
      >
        {label}
      </label>
    </div>
  );
};
