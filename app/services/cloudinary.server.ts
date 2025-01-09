import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { writeAsyncIterableToWritable } from '@remix-run/node';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadImage2Cld(
  data: AsyncIterable<Uint8Array>,
  { id, folder }: { id?: string; folder?: string }
) {
  const uploadPromise = new Promise<UploadApiResponse>(
    async (resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          public_id: id,
          folder,
        },
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(result!);
        }
      );
      await writeAsyncIterableToWritable(data, uploadStream);
    }
  );

  return uploadPromise;
}

const uploadImageFromUrl = async (
  url: string,
  { id, folder }: { id?: string; folder?: string }
) => {
  return cloudinary.uploader.upload(url, {
    public_id: id,
    folder,
  });
};

export { uploadImage2Cld, uploadImageFromUrl };
