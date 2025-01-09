import { Link } from '@remix-run/react';

import { useState, useRef } from 'react';
import {
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
  ButtonGroup,
  ClickAwayListener,
} from '@mui/material';
import { RiArrowDownSFill } from '@remixicon/react';
import { ICategoryDetail } from '~/types';

export default function BoxHeader({
  category,
}: {
  category: Partial<ICategoryDetail> | string;
}) {
  const isString = typeof category === 'string';

  return (
    <div className='box-header flex col-span-full w-full mb-6'>
      <h2 className='max-md:pl-2 font-bold text-xl mr-2 text-[--main-color] uppercase'>
        {isString ? (
          category
        ) : (
          <Link to={`/danh-muc/${category.slug}`}>{category.title}</Link>
        )}
      </h2>

      <div className='h-fit pb-2 flex justify-end border-b grow border-[--main-color]'>
        <ul className='hidden md:flex items-start h-fit min-h-4'>
          {isString ||
            category.subCategories?.map((sub, i) => (
              <li
                className='ml-4 text-xs font-medium hover:text-[--main-color]'
                key={i}
              >
                <Link to={`/danh-muc/${sub.slug}`}>{sub.title}</Link>
              </li>
            ))}
        </ul>

        {isString || <SplitButton categories={category.subCategories || []} />}
      </div>
    </div>
  );
}

export function SplitButton({
  categories,
}: {
  categories: { title: string; slug: string }[];
}) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleMenuItemClick = (event: any, index: number) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  return (
    <div className='block md:hidden'>
      <ButtonGroup
        variant='contained'
        className='shadow-none min-h-4'
        ref={anchorRef}
        aria-label='Button group with a nested menu'
      >
        {categories.length !== 0 && (
          <button
            className='bg-[--main-color] rounded-full text-white mr-2'
            onClick={handleToggle}
          >
            <RiArrowDownSFill />
          </button>
        )}
      </ButtonGroup>

      <Popper
        sx={{ zIndex: 1 }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id='split-button-menu' autoFocusItem>
                  {categories.map((cat, index) => (
                    <MenuItem
                      key={index}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      <Link
                        className='block w-full h-full'
                        to={`/danh-muc/${cat.slug}`}
                      >
                        {cat.title}
                      </Link>
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}
