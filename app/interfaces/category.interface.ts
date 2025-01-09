export interface ICategory {
  id: string;
  cat_name: string;
  cat_page: {
    _id: string;
    pst_slug: string;
    pst_title: string;
  };
  cat_parent?: {
    _id: string;
    cat_name: string;
    cat_page: string;
    cat_parent?: string;
  };
  cat_order: number;
  createdAt: string;
  updatedAt: string;
}
