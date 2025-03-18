export interface IPage {
  id: string;
  pst_title: string;
  pst_content: string;
  pst_thumbnail: string;
  pst_slug: string;
  pst_views: number;
  pst_excerpt: string;
  pst_category: string;
  pst_template: string;
  updatedAt: string;
  createdAt: string;
}

export interface IPageDetail extends IPage {
  pst_content: string;
  pst_isPublished: boolean;
}
