import { IMAGE } from '~/constants/image.constant';

export default function ImageTypeMarkup({ type }: { type: string }) {
  if (!type || type === IMAGE.TYPE.NONE.code) return null;

  let color = {} as { bg: string; text: string };

  switch (type as Values<typeof IMAGE.TYPE>['code']) {
    case 'banner':
      color = { bg: 'bg-[#FF5733]', text: 'text-white' };
      break;

    case 'a-day-at-school':
      color = { bg: 'bg-[#33FF57]', text: 'text-black' };
      break;

    case 'cta':
      color = { bg: 'bg-[#3357FF]', text: 'text-white' };
      break;

    case 'classroom':
      color = { bg: 'bg-[#FF33A1]', text: 'text-white' };
      break;

    case 'dining-room':
      color = { bg: 'bg-[#A133FF]', text: 'text-white' };
      break;

    case 'imagination-room':
      color = { bg: 'bg-[#33FFF5]', text: 'text-black' };
      break;

    case 'library':
      color = { bg: 'bg-[#FFC733]', text: 'text-black' };
      break;

    case 'playground':
      color = { bg: 'bg-[#57FF33]', text: 'text-black' };
      break;

    case 'program-framework':
      color = { bg: 'bg-[#FF3333]', text: 'text-white' };
      break;

    case 'register-form':
      color = { bg: 'bg-[#33A1FF]', text: 'text-black' };
      break;

    case 'scholarship':
      color = { bg: 'bg-[#8D33FF]', text: 'text-white' };
      break;

    case 'special-features':
      color = { bg: 'bg-[#FF8D33]', text: 'text-black' };
      break;

    case 'teaching-staff':
      color = { bg: 'bg-[#33FF8D]', text: 'text-black' };
      break;

    case 'video':
      color = { bg: 'bg-[#A1FF33]', text: 'text-black' };
      break;

    default:
      color = { bg: 'bg-[#FF5733]', text: 'text-white' };
  }

  return (
    <p
      className={`m-auto w-fit rounded px-2 py-1 text-xs font-bold ${color.bg} ${color.text}`}
    >
      {Object.values(IMAGE.TYPE).find((t) => t.code === type)?.name}
    </p>
  );
}
