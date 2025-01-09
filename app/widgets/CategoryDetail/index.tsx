import { format } from 'date-fns';
import TextInput from '~/components/TextInput';
import { ICategory } from '~/interfaces/category.interface';
import Select from '../Select';
import { IPost } from '~/interfaces/post.interface';
import { useState } from 'react';
import {
  getLayer1Categories,
  getLayer2Categories,
} from '~/utils/category.util';

export default function CategoryDetail({
  posts,
  category,
  categories,
  popupHidder,
}: {
  posts: IPost[];
  category: ICategory;
  categories: ICategory[];
  popupHidder: () => void;
}) {
  const [order, setOrder] = useState(category.cat_order);
  const [name, setName] = useState(category.cat_name);
  const [parent, setParent] = useState(category.cat_parent?._id || '');
  const [page, setPage] = useState(category.cat_page._id || '');

  return (
    <div
      className='fixed inset-0 z-50 bg-black/65 flex items-center'
      onClick={popupHidder}
    >
      <div
        className='bg-white w-1/2 rounded-lg flex flex-col p-4 mx-auto h-fit space-y-4'
        onClick={(e) => e.stopPropagation()}
      >
        <TextInput
          label='Thứ tự'
          name='order'
          value={order}
          step={100}
          onChange={(value) => {
            setOrder(value);
          }}
        />

        <TextInput
          label='Tên danh mục'
          name='name'
          value={name}
          onChange={(value) => {
            setName(value);
          }}
        />

        <Select
          label='Danh mục cha'
          name='parent'
          className='w-full'
          value={parent}
          onChange={(e) => {
            setParent(e.target.value);
          }}
        >
          <option value=''>Không có</option>
          {[
            ...getLayer1Categories(categories),
            ...getLayer2Categories(categories),
          ].map((cat, i) => (
            <option key={i} value={cat.id}>
              {cat.cat_name}
            </option>
          ))}
        </Select>

        <Select
          label='Chọn trang'
          name='page'
          className='w-full'
          required
          value={page}
          onChange={(e) => {
            setPage(e.target.value);
          }}
        >
          <option value=''>Không có</option>
          {posts.map((post, i) => (
            <option key={i} value={post.id}>
              {post.pst_title}
            </option>
          ))}
        </Select>

        <p>
          <b>Thời gian cập nhật: </b>
          {(() => {
            try {
              return format(new Date(category.updatedAt), 'hh:mm, dd/MM/yyyy');
            } catch (error) {
              return category.updatedAt;
            }
          })()}
        </p>

        <div className='flex justify-between items-center'>
          <button
            className='center rounded-lg bg-red py-2 px-3 font-sans font-bold uppercase text-white 
          shadow-md shadow-red/20 transition-all hover:shadow-lg enable:active:bg-red/80 
          disabled:opacity-60'
            type='button'
            onClick={async () => {
              try {
                await fetch(`/cmsdesk/categories/${category.id}/edit`, {
                  method: 'DELETE',
                  body: JSON.stringify({ name, order, parent, page }),
                });
              } catch (error) {
                console.error('Error setting viewed category:', error);
              }
              popupHidder();
            }}
          >
            Xóa
          </button>

          <button
            className='center rounded-lg bg-green py-2 px-3 font-sans font-bold uppercase text-white 
        shadow-md shadow-green/20 transition-all hover:shadow-lg enable:active:bg-green/80 
        disabled:opacity-60'
            type='button'
            onClick={async () => {
              try {
                await fetch(`/cmsdesk/categories/${category.id}/edit`, {
                  method: 'PUT',
                  body: JSON.stringify({ name, order, parent, page }),
                });
              } catch (error) {
                console.error('Error setting viewed category:', error);
              }
              popupHidder();
            }}
          >
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  );
}
