import Select from '~/widgets/Select';
import Hydrated from '@components/Hydrated';
import TextEditor from '@components/TextEditor/index.client';
import TextInput from '@components/TextInput';
import ImageInput from '@components/ImageInput';
import { PAGE } from '~/constants/page.constant';

export default function BlogEditor({
  titleState: [title, setTitle],
  thumbnailState: [thumbnail, setThumbnail],
  templateState: [template, setTemplate],
  categoryState: [category, setCategory],
  contentState: [content, setContent],
}: {
  templateState: [string, (template: string) => void];
  titleState: [string, (title: string) => void];
  thumbnailState: [string, (thumbnail: string) => void];
  categoryState: [string, (category: string) => void];
  contentState: [string, (content: string) => void];
}) {
  return (
    <>
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
      <div className='col-span-6 row-span-2'>
        <ImageInput
          label='Thumbnail'
          name='thumbnail'
          id='thumbnail'
          value={thumbnail}
          onChange={(value) => setThumbnail(value)}
        />
      </div>

      <div className='col-span-6'>
        <Select
          className='w-full'
          label='Template'
          name='template'
          defaultValue={template}
          onChange={(e) => setTemplate(e.target.value)}
        >
          {Object.values(PAGE.TEMPLATE).map((tem, i) => (
            <option key={i} value={tem.code}>
              {tem.name}
            </option>
          ))}
        </Select>
      </div>

      <div className='col-span-6'>
        <Select
          className='w-full'
          label='Danh mục'
          name='category'
          defaultValue={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {Object.values(PAGE.CATEGORY).map((cat, i) => (
            <option key={i} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </Select>
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
    </>
  );
}
