export interface ISliderImage {
  url: string;
  alt: string;
  link?: string;
}

export interface ISlider {
  id: string;
  sld_type: string;
  sld_images: Array<ISliderImage>;
}
