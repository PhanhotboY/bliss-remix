import Select from '@widgets/Select/index';
import TextInput from '@components/TextInput';
import { PAGE } from '~/constants/page.constant';
import { IImage } from '~/interfaces/image.interface';

export default function LandingPageEditor({
  titleState: [title, setTitle],
  templateState: [template, setTemplate],
}: {
  templateState: [string, (template: string) => void];
  titleState: [string, (title: string) => void];
  thumbnailState: [IImage, (thumbnail: IImage) => void];
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
    </>
  );
}
