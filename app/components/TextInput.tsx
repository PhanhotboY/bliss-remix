import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

export default function TextInput({
  label,
  name,
  type = 'text',
  pattern,
  oneline = false,
  onChange,
  className,
  ...props
}: {
  name: string;
  label: string;
  value?: string | number;
  oneline?: boolean;
  pattern?: string;
  onChange?: (e: any) => void;
} & Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'onChange'
>) {
  return (
    <div className={`w-full ${oneline ? 'flex' : ''} items-center gap-4`}>
      <label
        htmlFor={name}
        className='block text-sm font-semibold leading-6 text-black'
      >
        {label}
      </label>
      <div className='mt-2.5 flex-grow'>
        <input
          type={type}
          name={name}
          id={name}
          step={props.step || 1000}
          pattern={pattern}
          onChange={(e) => onChange && onChange(e.target.value)}
          autoComplete={name}
          className={
            `block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm shadow-blue-500
          ring-1 ring-inset ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
          focus:ring-blue-400 sm:text-sm sm:leading-6 focus:outline-none ` +
            className
          }
          {...props}
        />
      </div>
    </div>
  );
}
