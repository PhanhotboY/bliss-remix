import {
  unstable_composeUploadHandlers,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from '@remix-run/node';
import { uploadImage2Cld } from '~/services/cloudinary.server';

const uploadHandler = ({ id, folder }: { id?: string; folder?: string }) =>
  unstable_composeUploadHandlers(
    // our custom upload handler
    async ({ name, contentType, data, filename }) => {
      if (!['thumbnail', 'avatar', 'logo', 'img'].includes(name) || !data) {
        return undefined;
      }
      const uploadedImage = await uploadImage2Cld(data, { id, folder });

      return uploadedImage.secure_url;
    },
    // fallback to memory for everything else
    unstable_createMemoryUploadHandler()
  );

export const uploadImage = (request: Request, folder?: string) =>
  unstable_parseMultipartFormData(request, uploadHandler({ folder }));
