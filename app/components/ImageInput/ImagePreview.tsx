export default function ImagePreview({
  src,
  handleOpenPicker,
}: {
  src: string;
  handleOpenPicker?: () => void;
}) {
  return (
    <div className='relative wrapper rounded-xl border border-blue-100 w-full flex justify-center p-2 shadow-sm shadow-blue-500 '>
      <img src={src} alt='' className='w-full h-40 object-contain' />

      {handleOpenPicker && (
        <button
          className='absolute top-2 right-4 p-1 rounded bg-zinc-200/80 hover:bg-zinc-200 border border-zinc-200 transition-all'
          type='button'
          onClick={handleOpenPicker}
        >
          Thay đổi
        </button>
      )}
    </div>
  );
}
