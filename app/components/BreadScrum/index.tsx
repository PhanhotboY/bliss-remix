import { Link } from '@remix-run/react';
import { Fragment } from 'react';

import style from './index.module.css';

export default function BreadScrum({
  links,
}: {
  links: { label: string; path: string }[];
}) {
  return (
    <nav className={`${style.breadscrum} w-full`}>
      <ul className=''>
        <li className='inline w-max'>
          <Link to='/'>Trang chủ</Link>
        </li>

        {links.map((link, i) => (
          <li className='inline w-max' key={i}>
            <Link to={link.path}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
