import { ISessionUser } from '~/interfaces/auth.interface';
import { fetcher } from '.';
import { IPage, IPageDetail } from '~/interfaces/page.interface';

const getPosts = async (q?: string) => {
  const pages = await fetcher('/pages?type=blog');
  return pages as IPage[];
};

const getPages = async ({
  isPublished,
  user: request,
}: {
  isPublished?: boolean;
  user: ISessionUser;
}) => {
  const query = new URLSearchParams([
    ['isPublished', isPublished?.toString() || ''],
  ]);

  const pages = await fetcher(`/pages/all?${query.toString()}`, { request });
  return pages as IPage[];
};

const getUnpublishedPages = async ({
  user: request,
}: {
  user: ISessionUser;
}) => {
  const pages = await fetcher('/pages/unpublished', { request });
  return pages as IPage[];
};

const getPostDetail = async (id: string, request: ISessionUser) => {
  const page = await fetcher(`/pages/${id}`, { request });
  return page as IPageDetail;
};

const getPage = async (slug: string) => {
  const page = await fetcher(`/pages/${slug}`);
  return page as IPageDetail;
};

const createPage = async (data: any, request: ISessionUser) => {
  const page = await fetcher('/pages', {
    method: 'POST',
    body: JSON.stringify(data),
    request,
  });
  return page;
};

const updatePage = async (id: string, data: any, request: ISessionUser) => {
  const page = await fetcher(`/pages/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    request,
  });
  return page;
};

const deletePage = async (id: string, request: ISessionUser) => {
  const page = await fetcher(`/pages/${id}`, {
    method: 'DELETE',
    request,
  });
  return page;
};

const increaseViewCount = async (id: string) => {
  const res = await fetcher(`/pages/${id}/views`, {
    method: 'POST',
  });
  return res;
};

export {
  getPosts,
  getPages,
  getPage,
  getPostDetail,
  createPage,
  updatePage,
  deletePage,
  increaseViewCount,
};
