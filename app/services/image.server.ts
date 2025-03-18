import { ISessionUser } from '~/interfaces/auth.interface';
import { fetcher } from '.';
import { IImage, IImageDetail } from '~/interfaces/image.interface';

const getImage = async (name: string) => {
  const image = await fetcher(`/images/${name}`);

  return image as IImageDetail;
};

const getImages = async () => {
  const images = await fetcher('/images');
  return images as IImage[];
};

const updateImage = async (name: string, data: any, request: ISessionUser) => {
  const res = await fetcher(`/images/${name}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    request,
  });
  return res;
};

const createImage = async (data: FormData, request: ISessionUser) => {
  const image = await fetcher('/images', {
    method: 'POST',
    body: data,
    request,
  });
  return image as IImage[];
};

const deleteImage = async (name: string, request: ISessionUser) => {
  const res = await fetcher(`/images/${name}`, {
    method: 'DELETE',
    request,
  });
  return res;
};

export { getImage, getImages, updateImage, createImage, deleteImage };
