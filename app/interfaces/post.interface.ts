export interface IPost {
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

export interface IPostDetail
  extends Omit<IPost, 'pst_category' | 'pst_template'> {
  pst_content: string;
  pst_category: {
    _id: string;
    pct_name: string;
    pct_slug: string;
  };
  pst_template: {
    _id: string;
    ptp_name: string;
    ptp_code: string;
  };
  pst_isPublished: boolean;
}
