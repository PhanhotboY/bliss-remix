import { ISessionUser } from '~/interfaces/auth.interface';
import { fetcher } from '.';
import { IService } from '../interfaces/service.interface';

const getServices = async () => {
  const services = await fetcher('/services');
  return services as Array<IService>;
};

const getService = async (id: string) => {
  const service = await fetcher(`/services/${id}`);
  return service as IService;
};

const createService = async (service: any, request: ISessionUser) => {
  const newService = await fetcher('/services', {
    method: 'POST',
    body: JSON.stringify(service),
    request,
  });

  return newService as IService;
};

const updateService = async (
  id: string,
  service: any,
  request: ISessionUser
) => {
  const updatedService = await fetcher(`/services/${id}`, {
    method: 'PUT',
    body: JSON.stringify(service),
    request,
  });

  return updatedService as IService;
};

const deleteService = async (id: string, request: ISessionUser) => {
  await fetcher(`/services/${id}`, {
    method: 'DELETE',
    request,
  });
};

export { getServices, getService, createService, updateService, deleteService };
