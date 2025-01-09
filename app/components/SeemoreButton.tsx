import { Link } from '@remix-run/react';

export default function SeemoreButton({
  loadData,
  href,
  className = '',
}: {
  loadData?: () => void;
  href?: string;
  className?: string;
}) {
  return (
    <Link
      className={`${className} cursor-pointer block m-auto w-fit uppercase border rounded-full px-10 text-[--sub2-text] border-[color:--sub2-text] duration-500 transition-colors hover:border-[color:--main-color] py-2.5 hover:bg-[--main-color] hover:text-white`}
      to={href || '#'}
      onClick={
        loadData &&
        ((e) => {
          e.preventDefault();
          loadData();
        })
      }
    >
      Xem thêm
    </Link>
  );
}
