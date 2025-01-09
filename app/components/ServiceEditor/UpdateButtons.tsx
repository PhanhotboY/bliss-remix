import { useNavigate, useParams } from '@remix-run/react';

export default function UpdateButtons({
  loading,
  isChanged,
}: {
  loading: boolean;
  isChanged: boolean;
}) {
  const navigate = useNavigate();
  const params = useParams();

  return (
    <div className='col-span-12 flex text-xs justify-between fixed top-0 right-0 w-10/12 bg-white px-8 py-4'>
      <button
        className='center rounded-lg bg-red py-2 px-3 font-sans font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg enable:active:bg-red-500/80 disabled:opacity-60'
        type='button'
        disabled={loading}
        onClick={async () => {
          if (confirm('Bạn có chắc muốn xóa bài viết này chứ?')) {
            await fetch(
              `/cmsdesk/services/${params.id}/edit?_data=routes/cmsdesk.services_.$id.edit`,
              {
                method: 'DELETE',
              }
            );
            navigate('/cmsdesk/services');
          }
        }}
      >
        Xóa
      </button>

      <div className='flex gap-x-2'>
        <button
          className='center rounded-lg bg-blue-500 py-2 px-3 font-sans font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg enable:active:bg-blue-500/80 disabled:opacity-60'
          type='submit'
          disabled={!isChanged || loading}
        >
          Lưu
        </button>

        <button
          className='center rounded-lg border border-blue-500 py-2 px-3 font-sans font-bold uppercase text-blue-500 shadow-md shadow-blue-500/20 transition-all hover:shadow-lg active:opacity-60'
          onClick={() => navigate('/cmsdesk/services')}
          type='button'
          disabled={loading}
        >
          Quay lại
        </button>
      </div>
    </div>
  );
}
