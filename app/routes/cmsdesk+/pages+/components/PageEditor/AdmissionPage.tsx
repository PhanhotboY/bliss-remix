import Select from '@widgets/Select/index';
import TextInput from '@components/TextInput';
import { PAGE } from '~/constants/page.constant';
import ImageInput from '~/components/ImageInput';

export default function AdmissionPageEditor({
  titleState: [title, setTitle],
  templateState: [template, setTemplate],
  thumbnailState: [thumbnail, setThumbnail],
}: {
  templateState: [string, (template: string) => void];
  titleState: [string, (title: string) => void];
  thumbnailState: [string, (thumbnail: string) => void];
}) {
  return (
    <>
      <div className='col-span-12'>
        <TextInput
          label='Title'
          type='text'
          name='title'
          id='title'
          defaultValue={title}
          value={title}
          onChange={(value) => setTitle(value)}
          autoComplete='title'
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
          className='w-full mt-4'
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
    </>
  );
}
