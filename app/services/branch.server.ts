import { ISessionUser } from '~/interfaces/auth.interface';
import { fetcher } from '.';
import { IBranch, IBranchDetail } from '~/interfaces/branch.interface';

const getBranches = async () => {
  const branches = await fetcher(`/branches`);
  return branches as IBranch[];
};

const getBranchDetail = async (id: string) => {
  const branch = await fetcher(`/branches/${id}`);
  return branch as IBranchDetail;
};

const createBranch = async (data: any, request: ISessionUser) => {
  const branch = await fetcher('/branches', {
    method: 'POST',
    body: JSON.stringify(data),
    request,
  });
  return branch;
};

const updateBranch = async (id: string, data: any, request: ISessionUser) => {
  const branch = await fetcher(`/branches/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    request,
  });
  return branch;
};

const deleteBranch = async (id: string, request: ISessionUser) => {
  const branch = await fetcher(`/branches/${id}`, {
    method: 'DELETE',
    request,
  });
  return branch;
};

export {
  getBranches,
  getBranchDetail,
  createBranch,
  updateBranch,
  deleteBranch,
};
