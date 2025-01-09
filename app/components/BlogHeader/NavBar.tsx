import { Link, NavLink } from '@remix-run/react';
import { RiCloseLine } from '@remixicon/react';

export default function NavBar({
  className,
  isMenuOpen,
  setIsMenuOpen,
}: {
  className?: string;
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
}) {
  return (
    <nav
      className={
        'h-0 md:h-full bg-[--main-color] md:sticky top-0 z-40 ' + className ||
        ''
      }
    >
      <div className='container py-2'>
        <nav
          className={`${
            isMenuOpen ? 'left-0' : '-left-full'
          } lg:ml-4 max-lg:fixed lg:block transition-all duration-300 inset-0 w-full h-full bg-black/50 lg:bg-inherit flex`}
          onClick={() => setIsMenuOpen(false)}
        >
          <button
            className='lg:hidden absolute top-4 right-4 text-white'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <RiCloseLine />
          </button>

          <ul
            className='flex items-center text-[--sub1-text] rounded-lg bg-white lg:bg-inherit h-full min-w-60 gap-4 lg:w-full flex-col lg:flex-row m-2 lg:m-0 p-4 lg:p-0'
            onClick={(e) => e.stopPropagation()}
          >
            {[
              { title: 'Phụ huynh', slug: '#phu-huynh' },
              { title: 'Chủ trường', slug: '#chu-truong' },
              { title: 'Giáo viên', slug: '#giao-vien' },
              // { title: 'Kiddihub Store', slug: 'store' },
              { title: 'Kiddihub Blog', slug: 'blog' },
              { title: 'Đối tác', slug: '#doi-tac' },
            ].map((item, index) => (
              <li
                key={index}
                className='mx-2 text-[--sub1-text] md:text-[--sub3-text] font-semibold'
              >
                <NavLink
                  className='p-2 hover:text-[--sub1-color]'
                  to={`/${item.slug}`}
                >
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </nav>
  );
}
