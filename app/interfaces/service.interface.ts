import { IPage } from './page.interface';

export interface IService {
  id: string;
  svc_name: string;
  svc_description: string;
  svc_basePrice: number;
  svc_discountPrice: number;
  svc_page: IPage;
  createdAt: string;
  updatedAt: string;
}
