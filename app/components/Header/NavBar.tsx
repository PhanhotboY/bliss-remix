import { NavLink } from '@remix-run/react';
import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiCloseLine,
} from '@remixicon/react';
import { useState } from 'react';
import { useRootLoaderData } from '~/lib/useRootLoaderData';
import {
  getLayer1Categories,
  getLayer2Categories,
  getLayer3Categories,
} from '~/utils/category.util';
import SearchBox from '../SearchBox';

export default function ({
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
}) {
  const { categories } = useRootLoaderData();

  const [openMenu, setOpenMenu] = useState('');

  return (
    <nav
      className={`${
        isSidebarOpen ? 'right-0' : 'right-full'
      } fixed lg:static md:flex top-0 transition-all duration-300 w-full lg:w-fit h-full bg-black/50 
      lg:bg-inherit text-base xl:text-lg max-lg:overflow-y-auto`}
      onClick={() => setIsSidebarOpen(false)}
    >
      <div className='p-2 h-full w-64 sm:w-80 uppercase'>
        <ul
          className='flex items-center text-[--sub3-text] rounded-lg bg-white h-full 
    lg:w-full flex-col lg:flex-row lg:m-0 p-4 lg:p-0'
          onClick={(e) => e.stopPropagation()}
        >
          <li className='lg:hidden w-full'>
            <SearchBox />
          </li>

          {getLayer1Categories(categories).map((cat, index) => (
            <li
              key={index}
              className='relative lg:flex mx-2 font-semibold w-full items-center'
              onMouseEnter={() => setOpenMenu(cat.id)}
              onMouseLeave={() => setOpenMenu('')}
            >
              <div className='flex items-center'>
                <NavLink
                  className={({ isActive }) =>
                    `p-2 flex items-center gap-1 hover:text-[--sub1-text] w-max grow ${
                      isActive ? 'text-[--sub1-text]' : ''
                    }`
                  }
                  to={`/${cat.cat_page.pst_slug}`}
                >
                  <span>{cat.cat_name}</span>
                  {!!getLayer2Categories(categories, cat).length && (
                    <RiArrowDownSLine className='hidden lg:block' size={16} />
                  )}
                </NavLink>

                {!!getLayer2Categories(categories, cat).length && (
                  <div className='p-2 md:hidden'>
                    <RiArrowDownSLine
                      className={`lg:hidden ${
                        openMenu === cat.id ? 'rotate-180' : 'rotate-0'
                      }`}
                      onClick={() =>
                        setOpenMenu(openMenu === cat.id ? '' : cat.id)
                      }
                    />
                  </div>
                )}
              </div>
              {!!getLayer2Categories(categories, cat).length && (
                <ul
                  className='static lg:absolute flex flex-col lg:flex-row text-base top-full -left-10 
                  bg-white lg:shadow-lg lg:rounded-lg lg:py-4 w-max max-lg:border-l border-zinc-200 lg:divide-x font-normal 
                  text-[--sub5-text] lg:border w-full lg:w-max transition-all duration-500'
                  style={{
                    height: openMenu === cat.id ? 'max-content' : 0,
                    transform: openMenu === cat.id ? 'scaleY(1)' : 'scaleY(0)',
                    paddingBlock: openMenu === cat.id ? '8px' : 0,
                    overflow: 'hidden',
                  }}
                >
                  {getLayer2Categories(categories, cat).map((child, j) => (
                    <li key={j} className='flex flex-col'>
                      <NavLink
                        className={`py-2 px-6 w-full ${
                          !!getLayer3Categories(categories, child).length
                            ? 'font-semibold text-[--sub7-text]'
                            : ''
                        } hover:bg-zinc-100`}
                        to={`/${child.cat_page.pst_slug}`}
                      >
                        {child.cat_name}
                      </NavLink>

                      {!!getLayer3Categories(categories, child).length && (
                        <ul className=''>
                          {getLayer3Categories(categories, child).map(
                            (grandChild, k) => (
                              <li key={k} className='flex'>
                                <NavLink
                                  className='ml-4 lg:mr-2 w-full py-2 px-6 font-medium hover:bg-zinc-100'
                                  to={`/${grandChild.cat_page.pst_slug}`}
                                >
                                  {grandChild.cat_name}
                                </NavLink>
                              </li>
                            )
                          )}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}

          <li>
            <div className='mt-2 block lg:hidden'>
              <button
                className='w-max inline-flex items-center gap-2 rounded-full px-3 py-1
    transition-all hover:shadow-lg disabled:pointer-events-none border-2 border-[--sub1-text] text-[--sub1-text]
    font-bold disabled:opacity-50 disabled:shadow-none active:bg-[--sub1-text] active:text-[--sub6-text]'
              >
                Đặt lịch tư vấn
              </button>
            </div>
          </li>
        </ul>
      </div>

      <button
        className='lg:hidden absolute top-4 right-4 text-white'
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <RiCloseLine />
      </button>
    </nav>
  );
}
