import { useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Image from '@editorjs/image';
// @ts-ignore
import Link from '@editorjs/link';
// @ts-ignore
import Raw from '@editorjs/raw';
// @ts-ignore
import Embed from '@editorjs/embed';
import Table from '@editorjs/table';
import Quote from '@editorjs/quote';
// @ts-ignore
import Marker from '@editorjs/marker';
import Warning from '@editorjs/warning';
import Underline from '@editorjs/underline';
import Delimiter from '@editorjs/delimiter';
import Paragraph from '@editorjs/paragraph';
// @ts-ignore
import AlignmentTuneTool from 'editorjs-text-alignment-blocktune';

import './index.css';

export default function TextEditor({
  value,
  onChange,
}: {
  value: any;
  onChange: (...args: any[]) => any;
}) {
  const isReady = useRef(false);
  const [editor, setEditor] = useState<EditorJS>();

  useEffect(() => {
    if (!isReady.current) {
      const editor = new EditorJS({
        holder: 'editorjs',
        // @ts-ignore
        tools,
        data: value && JSON.parse(value),
        onChange: (api, e) => {
          api.saver.save().then((outputData: any) => {
            onChange(JSON.stringify(outputData));
          });
        },
      });
      isReady.current = true;
      setEditor(editor);
    }
  }, []);

  return <div id='editorjs' className='border rounded mt-2'></div>;
}

const tools = {
  list: {
    class: List,
    inlineToolbar: true,
  },
  header: {
    class: Header,
    tunes: ['textAlign'],
  },
  paragraph: {
    class: Paragraph,
    tunes: ['textAlign'],
  },
  image: {
    class: Image,
    config: {
      endpoints: {
        byFile: '/api/images/upload', // Your backend file uploader endpoint
        byUrl: '/api/images/fetchUrl', // Your endpoint that provides uploading by Url
      },
      field: 'img',
    },
  },
  linkTool: {
    class: Link,
    config: {
      endpoint: '/api/fetchUrl', // Your backend endpoint for url data fetching,
    },
  },
  html: Raw,
  embed: Embed,
  table: {
    class: Table,
    inlineToolbar: true,
    config: {
      maxRows: 5,
      maxCols: 5,
    },
  },
  quote: Quote,
  marker: Marker,
  warning: Warning,
  underline: Underline,
  delimiter: Delimiter,
  textAlign: {
    class: AlignmentTuneTool,
    config: {
      default: 'left',
    },
  },
};
