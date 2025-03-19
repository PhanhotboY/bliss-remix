export interface IImage {
  id: string;
  img_name: string;
  img_title: string;
  img_url: string;
  img_type: string;
  img_link: string;
  img_isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IImageDetail extends IImage {
  img_description: string;
}
