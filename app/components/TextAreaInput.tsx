import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

export default function TextAreaInput({
  label,
  name,
  type = 'text',
  pattern,
  onChange,
  ...props
}: {
  name: string;
  label: string;
  type?: string;
  pattern?: string;
  onChange?: (e: any) => void;
} & Omit<
  DetailedHTMLProps<
    InputHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >,
  'onChange'
>) {
  return (
    <div className='w-full'>
      <label
        htmlFor={name}
        className='block text-sm font-semibold leading-6 text-black'
      >
        {label}
      </label>
      <div className='mt-2.5'>
        <textarea
          name={name}
          id={name}
          step={props.step || 1000}
          onChange={(e) => onChange && onChange(e.target.value)}
          autoComplete='given-name'
          className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm shadow-blue-500 ring-1 ring-inset ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6 focus:outline-none'
          rows={3}
          {...props}
        />
      </div>
    </div>
  );
}
