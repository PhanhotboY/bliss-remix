import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

export default function CheckboxInput({
  label,
  name,
  checked,
  pattern,
  onChange,
  ...props
}: {
  name: string;
  label: string;
  pattern?: string;
  onChange: (e: any) => void;
} & Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'onChange'
>) {
  return (
    <div className='w-full flex items-center gap-4'>
      <label
        htmlFor={name}
        className='block text-sm font-semibold leading-6 text-black'
      >
        {label}
      </label>

      <label className='relative inline-flex items-center cursor-pointer'>
        <input
          id={name}
          name={name}
          type='checkbox'
          className='sr-only peer'
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          {...props}
        />

        <div
          className='w-11 h-6 bg-zinc-300 peer-focus:outline-none peer-focus:ring-2 
        peer-focus:ring-gray-500 rounded-full peer dark:bg-gray-700 peer-checked:bg-orange'
        ></div>

        <div
          className='absolute left-0.5 top-0.5 w-5 h-5 bg-white border border-gray-300 
        rounded-full transition-transform peer-checked:translate-x-full'
        ></div>
      </label>
    </div>
  );
}
