import {
  useFetcher,
  useLoaderData,
  useNavigate,
  useParams,
} from '@remix-run/react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import { loader, action } from '~/routes/cmsdesk+/pages+/$id.edit';
import Select from '~/widgets/Select';
import Hydrated from '../Hydrated';
import TextEditor from '../TextEditor/index.client';
import TextRenderer from '../TextRenderer';
import { IPost, IPostDetail } from '~/interfaces/post.interface';
import TextInput from '../TextInput';
import ImageInput from '../ImageInput';
import Wrapper from './Wrapper';
import { PAGE } from '~/constants/page.constant';

export default function BlogEditor({
  post,
  type,
  template,
  setTemplate,
}: {
  post?: IPostDetail;
  type: 'update' | 'create';
  template: string;
  setTemplate: (template: string) => void;
}) {
  const { postTemplates, postCategories } = useLoaderData<typeof loader>();

  const [isChanged, setIsChanged] = useState(false);
  const [content, setContent] = useState(post?.pst_content || '');
  const [title, setTitle] = useState(post?.pst_title || '');
  const [thumbnail, setThumbnail] = useState(post?.pst_thumbnail || '');
  const [category, setCategory] = useState(
    post?.pst_category._id ||
      postCategories.find((cat) => cat.pct_slug === PAGE.CATEGORY.NONE.slug)
        ?.id ||
      postCategories[0].id
  );

  useEffect(() => {
    if (post) {
      setIsChanged(
        post.pst_title !== title ||
          JSON.stringify(JSON.parse(post.pst_content || '{}')?.blocks || []) !==
            JSON.stringify(JSON.parse(content || '{}')?.blocks || []) ||
          post.pst_thumbnail !== thumbnail ||
          post.pst_category._id !== category ||
          post.pst_template._id !== template
      );
    }
  }, [post, content, title, thumbnail, category, template]);

  return (
    <Wrapper fetcherKey={post?.id || 'new'} type={type} isChanged={isChanged}>
      <div className='col-span-12'>
        <TextInput
          label='Title'
          type='text'
          name='title'
          id='title'
          value={title}
          onChange={(value) => setTitle(value)}
          autoComplete='title'
          required
        />
      </div>

      {/* Thumbnail */}
      <div className='col-span-12 flex gap-x-4'>
        <div className='w-1/2'>
          <ImageInput
            label='Thumbnail'
            name='thumbnail'
            id='thumbnail'
            value={thumbnail}
            onChange={(value) => setThumbnail(value)}
          />
        </div>

        <div className='w-1/2 flex flex-col'>
          <Select
            className='w-full'
            label='Danh mục'
            name='category'
            defaultValue={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {postCategories.map((cat, i) => (
              <option key={i} value={cat.id}>
                {cat.pct_name}
              </option>
            ))}
          </Select>

          <Select
            className='w-full mt-4'
            label='Template'
            name='template'
            defaultValue={template}
            onChange={(e) => setTemplate(e.target.value)}
          >
            {postTemplates.map((tem, i) => (
              <option key={i} value={tem.id}>
                {tem.ptp_name}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className='col-span-12'>
        <label className='block text-sm font-semibold leading-6 text-black'>
          Content
        </label>

        <Hydrated fallback={<div>Loading...</div>}>
          {() => (
            <TextEditor
              value={content}
              onChange={(c) => {
                setContent(c);
              }}
            />
          )}
        </Hydrated>
        <input type='hidden' name='content' value={content} />
      </div>
    </Wrapper>
  );
}
