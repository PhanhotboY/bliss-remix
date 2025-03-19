import { useEffect, useState } from 'react';

import { PAGE } from '~/constants/page.constant';
import LandingPageEditor from './LandingPage';
import BlogEditor from './Blog';
import { IPageDetail } from '~/interfaces/page.interface';
import Wrapper from './Wrapper';
import AboutPageEditor from './AboutPage';
import AdmissionPageEditor from './AdmissionPage';

export default function PageEditor({ page }: { page?: IPageDetail }) {
  const [isChanged, setIsChanged] = useState(false);
  const [content, setContent] = useState(page?.pst_content || '');
  const [title, setTitle] = useState(page?.pst_title || '');
  const [thumbnail, setThumbnail] = useState(
    page?.pst_thumbnail || ({} as any)
  );
  const [category, setCategory] = useState(
    page?.pst_category || PAGE.CATEGORY.NONE.slug
  );
  const [template, setTemplate] = useState(
    page?.pst_template || PAGE.TEMPLATE.BLOG.code
  );

  useEffect(() => {
    if (page) {
      setIsChanged(
        page.pst_title !== title ||
          JSON.stringify(JSON.parse(page.pst_content || '{}')?.blocks || []) !==
            JSON.stringify(JSON.parse(content || '{}')?.blocks || []) ||
          (page.pst_thumbnail?.id || '') !== thumbnail.id ||
          (page.pst_category || '') !== category ||
          (page.pst_template || '') !== template
      );
    }
  }, [page, content, title, thumbnail, category, template]);

  return (
    <Wrapper
      page={page}
      fetcherKey={page?.id || 'new'}
      type={page ? 'update' : 'create'}
      isChanged={isChanged}
    >
      {getPageEditor(template)({
        titleState: [title, setTitle],
        thumbnailState: [thumbnail, setThumbnail],
        templateState: [template, setTemplate],
        categoryState: [category, setCategory],
        contentState: [content, setContent],
      })}
    </Wrapper>
  );
}

const getPageEditor = (template: string) => {
  switch (template) {
    case PAGE.TEMPLATE.BLOG.code:
      return BlogEditor;

    default:
      return LandingPageEditor;
  }
};
