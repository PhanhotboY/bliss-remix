export interface IProduct {
  id: string;
  prd_name: string;
  prd_slug: string;
  prd_category: {
    _id: string;
    pct_name: string;
    pct_slug: string;
    createdAt: string;
    updatedAt: string;
  };
  prd_basePrice: number;
  prd_discountPrice: number;
  prd_thumbnail: string;
  prd_quantity: number;
  updatedAt: string;
  createdAt: string;
}

export interface IProductDetails extends IProduct {
  prd_description: string;
  prd_isPublished: boolean;
}
