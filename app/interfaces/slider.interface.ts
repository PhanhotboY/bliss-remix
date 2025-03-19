import { IImage } from './image.interface';

export interface ISlider {
  id: string;
  sld_type: string;
  sld_images: Array<IImage>;
}
