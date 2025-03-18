export interface IAppSettings {
  app_title: string;
  app_description: string;
  app_logo: string;
  app_favicon: string;
  app_social: {
    facebook: string;
    youtube: string;
    tiktok: string;
    zalo: string;
  };
  app_taxCode: string;
  app_headScripts?: string;
  app_bodyScripts?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAppSettingsAttrs {
  title: string;
  description: string;
  logo: string;
  favicon: string;
  social: {
    facebook?: string;
    youtube?: string;
    tiktok?: string;
    zalo?: string;
  };
  taxCode: string;
  headScripts?: string;
  bodyScripts?: string;
}
