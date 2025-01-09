import { ISessionUser } from '~/interfaces/auth.interface';
import { fetcher } from '.';
import { IUser } from '~/interfaces/user.interface';

const getUsers = async () => {
  const user = await fetcher('/');
};

const getCurrentUser = async (request: ISessionUser) => {
  const user = await fetcher('/users/me', {
    request,
  });
  return user as IUser;
};

const createUser = async () => {};

const updateUser = async (userId: string, data: any, request: ISessionUser) => {
  const user = await fetcher(`/users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    request,
  });
  return user as IUser;
};

const deleteUser = async () => {};

export { getUsers, getCurrentUser, createUser, updateUser, deleteUser };
