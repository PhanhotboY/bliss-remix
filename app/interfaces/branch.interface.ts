import { IImage } from './image.interface';

export interface IBranch {
  id: string;
  bra_name: string;
  bra_address: {
    province: string;
    district: string;
    street: string;
  };
  bra_email: string;
  bra_msisdn: string;
  bra_thumbnail: IImage;
  bra_map: string;
  bra_isMain: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBranchDetail extends IBranch {}
