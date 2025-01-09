import { ActionFunctionArgs, json } from '@remix-run/node';
import { uploadImage } from '~/lib/uploadHandler.server';

export const action = async ({ request }: ActionFunctionArgs) => {
  const r = request.clone();
  const body = await r.formData();

  const folder = body.get('folder') as string;

  try {
    const formData = await uploadImage(request, folder);

    const imageUrl = formData.get('img') as string;

    return json({
      imageUrl,
      success: 1,
      file: {
        url: imageUrl,
      },
      toast: { message: 'Upload ảnh thành công!', type: 'success' },
    });
  } catch (error: any) {
    console.error(error);
    return json({
      toast: { message: error.message, type: 'error' },
    });
  }
};
