import './index.css';

import Hydrated from '../Hydrated';
import Heading from './Heading';
import Paragraph from './Paragraph';
import Image from './Image';
import List from './List';
import LinkTool from './LinkTool';
import { useEffect } from 'react';

export default function TextRenderer({
  content,
  truncate,
}: {
  content: string;
  truncate?: boolean;
}) {
  const { blocks } = JSON.parse(content || '{"blocks": []}');

  useEffect(() => {
    document.querySelectorAll('.edjs-paragraph a').forEach((a) => {
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noreferrer noopener');
    });
  });

  return (
    <section
      className='text-renderer'
      style={
        truncate
          ? {
              display: '-webkit-box',
              textOverflow: 'ellipsis',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflowWrap: 'break-word',
              overflow: 'hidden',
            }
          : {}
      }
    >
      {blocks.map((block: any, index: number) => {
        // @ts-ignore
        const Component = components[block.type] || Paragraph;
        return <Component key={index} data={block.data} tunes={block.tunes} />;
      })}
    </section>
  );
}

const components = {
  header: Heading,
  paragraph: Paragraph,
  image: Image,
  list: List,
  linkTool: LinkTool,
  // quote: Quote,
  // code: Code,
  // delimiter: Delimiter,
  // table: Table,
  // warning: Warning,
  // checklist: Checklist,
  // raw: Raw,
  // embed: Embed,
};
