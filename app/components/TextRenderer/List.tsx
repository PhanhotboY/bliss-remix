export default function List({
  data,
}: {
  data: {
    items: { content: string }[];
    meta: { counterType: '' | 'numeric' };
    style: 'ordered' | 'unordered';
  };
}) {
  return (
    <ul className={data.style === 'ordered' ? 'list-decimal' : 'list-disc'}>
      {data.items.map((item, index) => (
        <li className='ml-8' key={index}>
          {item.content}
        </li>
      ))}
    </ul>
  );
}
