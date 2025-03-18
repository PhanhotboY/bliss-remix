import { IPage } from './page.interface';

export interface IService {
  id: string;
  svc_name: string;
  svc_description: string;
  svc_basePrice: number;
  svc_discountPrice: number;
  svc_page: {
    _id: string;
    pst_title: string;
    pst_thumbnail: string;
    pst_slug: string;
  };
  createdAt: string;
  updatedAt: string;
}
