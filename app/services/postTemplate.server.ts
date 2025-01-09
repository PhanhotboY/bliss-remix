import { IPostTemplate } from '~/interfaces/postTemplate.interface';
import { fetcher } from '.';

const getPostTemplates = async () => {
  const postTemplates = await fetcher('/posts/templates');
  return postTemplates as IPostTemplate[];
};

const createPostTemplate = async (data: any) => {
  const postTemplate = await fetcher('/posts/templates', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return postTemplate;
};

export { getPostTemplates, createPostTemplate };
