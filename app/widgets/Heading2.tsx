import { ReactNode } from 'react';

export default function Heading2({ children }: { children: ReactNode }) {
  return (
    <h2 className='col-span-12 text-center text-2xl lg:text-3xl text-[--sub2-text] font-bold uppercase'>
      {children}
    </h2>
  );
}
