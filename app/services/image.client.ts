import { IImage } from '~/interfaces/image.interface';

const uploadImages = async (files: FileList) => {
  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append('img', files[i]);
  }

  const res = await fetch('/api/images/upload', {
    method: 'POST',
    body: formData,
  });

  return (await res.json()) as
    | {
        images: IImage[];
        success: 1;
        file: {
          url: string;
        };
        toast: { message: string; type: string };
      }
    | {
        success: 0;
        toast: { message: string; type: string };
      };
};

export { uploadImages };
