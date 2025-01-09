import { IAppSettings, IAppSettingsAttrs } from '~/interfaces/app.interface';
import { fetcher } from '.';

const getAppSettings = async () => {
  const res = await fetcher(`/app/settings`);

  return res as IAppSettings;
};

const updateAppSettings = async (
  data: Partial<IAppSettingsAttrs>,
  request: any
) => {
  const res = await fetcher(`/app/settings`, {
    method: 'PUT',
    body: JSON.stringify(data),
    request,
  });

  return res as IAppSettings;
};

export { getAppSettings, updateAppSettings };
