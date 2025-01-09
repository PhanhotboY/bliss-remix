import { RiArrowDownSLine } from '@remixicon/react';
import { ChangeEvent } from 'react';

export default function SearchSelect({
  label,
  name,
  value,
  sketch,
  options,
  onChange,
  className,
  selectAll,
}: {
  name?: string;
  label?: string;
  sketch?: boolean;
  className?: string;
  selectAll?: boolean;
  value: { name: string; slug: string };
  options: Array<{ name: string; slug: string }>;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <div
      className={`max-lg:border rounded border-zinc-200 relative h-full w-full ${
        sketch ? 'lg:w-fit' : 'lg:w-40'
      } ${className || ''}`}
    >
      <p
        className={`${
          sketch ? 'lg:hidden' : ''
        } text-xs absolute left-4 top-1 z-0 text-[--sub2-text]`}
      >
        {label}
      </p>

      <select
        className={`${
          sketch ? 'w-full lg:w-48 max-lg:pt-6 py-2' : 'pt-6'
        } pl-4 max-lg:pb-2 outline-none bg-inherit font-semibold text-[--sub1-text] h-full w-full relative z-10 cursor-pointer`}
        name={name}
        style={{
          WebkitAppearance: 'none',
          MozAppearance: 'none',
        }}
        aria-expanded='true'
        value={value.slug}
        onChange={onChange}
      >
        {selectAll && <option value=''>Tất cả</option>}

        {options.map((o, i) => (
          <option key={i} value={o.slug} className='max-w-40'>
            {o.name}
          </option>
        ))}
      </select>
      {sketch && (
        <RiArrowDownSLine className='absolute right-2 lg:left-full top-1/2 -translate-y-1/2' />
      )}
    </div>
  );
}
