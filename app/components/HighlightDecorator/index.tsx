export default function HighlightDecorator({ children }: { children?: any }) {
  return (
    <p className='border border-orange-500 bg-yellow-500/20 p-2 my-2'>
      {children}
    </p>
  );
}
