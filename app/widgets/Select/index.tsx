import { DetailedHTMLProps, SelectHTMLAttributes } from 'react';

export default function Select({
  name,
  label,
  children,
  className,
  ...props
}: DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & {
  label: string;
}) {
  return (
    <section
      className={`flex flex-col text-xs lg:text-sm bg-slate-200/50 rounded w-fit max-lg:max-w-40 px-2 ${className}`}
    >
      <label className='font-semibold z-0 cursor-text pt-2' htmlFor={name}>
        {label}
      </label>

      <select
        className='w-full outline-none py-2 lg:py-3 font-bold lg:font-normal max-lg:text-base bg-transparent relative z-10 cursor-pointer'
        id={name}
        name={name}
        {...props}
      >
        {children}
      </select>
    </section>
  );
}
