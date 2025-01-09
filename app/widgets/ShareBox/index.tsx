import { RiFacebookFill, RiLinkM, RiPrinterLine } from '@remixicon/react';
import { MouseEventHandler } from 'react';
import { useRootLoaderData } from '~/lib/useRootLoaderData';
import Hydrated from '~/components/Hydrated';

export default function ShareBox() {
  const shareOnFacebook: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    // @ts-ignore
    FB.ui(
      {
        method: 'share',
        href: window.location.href,
      },
      // @ts-ignore
      function (response) {}
    );
  };

  const handlePrint = (e: any) => {
    e.preventDefault();
    const printContent = document.getElementById('post-detail')
      ?.outerHTML as string;

    const newWindow = window.open(
      window.location.href,
      '',
      'height=600,width=800'
    );

    newWindow?.document.write('<html><title>' + document.title + '</title>');
    newWindow?.document.write(
      '<script src="https://cdn.tailwindcss.com"></script>'
    );
    newWindow?.document.write(
      '<link rel="stylesheet" href="/print.css"></link>'
    );
    newWindow?.document.write('</head><body >');
    newWindow?.document.write(printContent);
    newWindow?.document.write('</body></html>');

    newWindow?.document.close(); // necessary for IE >= 10

    newWindow!.onload = function () {
      newWindow?.focus(); // necessary for IE >= 10*/

      newWindow?.print();
    };
  };

  return (
    <Hydrated fallback={<div>Loading</div>}>
      {() => (
        <section className='flex items-center justify-center p-4 rounded-lg bg-zinc-100 w-fit'>
          <h3 className='text-xl font-bold text-[--sub4-text]'>Chia sẻ</h3>

          <ul className='flex items-center border-l border-[color:--sub4-text] ml-4'>
            <li className='ml-4'>
              <a href='#' onClick={shareOnFacebook}>
                <RiFacebookFill className='text-[color:#0866ff]' size={24} />
              </a>
            </li>

            <li className='ml-4'>
              <a href='#' onClick={handlePrint}>
                <RiPrinterLine size={24} />
              </a>
            </li>

            <li className='ml-4'>
              <a
                href='#'
                onClick={(e) => {
                  e.preventDefault();
                  navigator.clipboard.writeText(window.location.href);
                }}
              >
                <RiLinkM size={24} />
              </a>
            </li>
          </ul>
        </section>
      )}
    </Hydrated>
  );
}
