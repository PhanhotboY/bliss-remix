import { Link } from '@remix-run/react';
import { format } from 'date-fns';
import { IBranch } from '~/interfaces/branch.interface';

export default function BranchCard({
  branch,
  cols,
}: {
  branch: IBranch;
  cols?: { sm?: number; md?: number; lg?: number; xl?: number };
}) {
  const colClasses = `col-span-4 sm:col-span-${cols?.sm || 6} md:col-span-${
    cols?.md || 4
  } lg:col-span-${cols?.lg || 3} xl:col-span-${cols?.xl || 3}`;

  return (
    <div
      className={`${colClasses} group flex flex-col items-center text-dark shadow-lg p-2 border rounded-xl transition-all ease duration-300 hover:shadow-2xl`}
    >
      <Link
        to={`/cmsdesk/branches/${branch.id}/edit`}
        className='w-full h-full rounded-xl overflow-hidden'
      >
        <div className='flex items-center justify-between w-full p-2'>
          <div className='flex flex-col w-full'>
            <h2 className='font-semibold capitalize  text-base sm:text-lg'>
              <span
                className='bg-gradient-to-r from-accent/50 to-accent/50  dark:from-accentDark/50
              dark:to-accentDark/50
              bg-[length:0px_6px]
              group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 '
                style={{
                  display: '-webkit-box',
                  textOverflow: 'ellipsis',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflowWrap: 'break-word',
                  overflow: 'hidden',
                }}
              >
                {branch.bra_name}
              </span>
            </h2>

            <div className='text-[--sub6-text] text-sm w-2/3 overflow-hidden'>
              <p className='truncate'>{branch.bra_email}</p>
              <p>{branch.bra_msisdn}</p>
            </div>
          </div>

          <div className='flex justify-between items-center mt-2'>
            {branch.bra_isMain && (
              <div
                className={`center relative inline-block select-none whitespace-nowrap rounded-full bg-green
                py-1 px-2 align-baseline font-sans text-xs font-medium capitalize leading-none 
                tracking-wide text-white hover:cursor-pointer`}
              >
                <span className='font-bold'>Chi nhánh chính</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
