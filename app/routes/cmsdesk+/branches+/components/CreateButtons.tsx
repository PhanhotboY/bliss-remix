import { useNavigate } from '@remix-run/react';

export default function CreateButtons({
  loading,
  isChanged = true,
}: {
  loading: boolean;
  isChanged?: boolean;
}) {
  const navigate = useNavigate();

  return (
    <div className='col-span-12 flex text-xs justify-between fixed top-0 right-0 w-10/12 bg-white px-8 py-4 z-10'>
      <button
        className='center rounded-lg bg-red py-2 px-3 font-sans font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg enable:active:bg-red-500/80 disabled:opacity-60'
        type='button'
        disabled={loading}
        onClick={async () => {
          if (confirm('Những thay đổi bạn thực hiện sẽ không được lưu.')) {
            navigate('/cmsdesk/branches');
          }
        }}
      >
        Hủy
      </button>

      <div className='flex gap-x-2'>
        <button
          className='center rounded-lg bg-blue-500 py-2 px-3 font-sans font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg enable:active:bg-blue-500/80 disabled:opacity-60'
          type='submit'
          disabled={!isChanged || loading}
        >
          Thêm chi nhánh
        </button>
      </div>
    </div>
  );
}
