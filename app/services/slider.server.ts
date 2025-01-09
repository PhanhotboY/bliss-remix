import { ISlider } from '~/interfaces/slider.interface';
import { fetcher } from '.';
import { ISessionUser } from '~/interfaces/auth.interface';

const getSliders = async () => {
  const res = await fetcher(`/sliders`);
  return res as Array<ISlider>;
};

const updateSlider = async (type: string, data: any, request: ISessionUser) => {
  const res = await fetcher(`/sliders/${type}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    request,
  });
  return res;
};

export { getSliders, updateSlider };
