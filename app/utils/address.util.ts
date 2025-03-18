import pkg from 'vn-provinces';

interface IProvince {
  code: string;
  name: string;
  slug: string;
  unit: string;
}
interface IDistrict {
  code: string;
  name: string;
  slug: string;
  unit: string;
  provinceCode: string;
  provinceName: string;
  fullName: string;
}

const {
  getProvinces,
  getDistrictsByProvinceCode: getDbyPCode,
  getWardsByDistrictCode,
} = pkg;
const provinces = getProvinces() as Array<IProvince>;

const toAddressString = ({
  street,
  ward,
  province,
  district,
}: {
  street: string;
  ward?: string;
  province: string;
  district: string;
}) => {
  const p = provinces?.find((p) => p.slug === province);
  const districts = getDistrictsByProvinceCode(p?.code || '');
  const d = districts?.find((d) => d.slug === district);

  const wards = getWardsByDistrictCode(d?.code || '');
  const w = wards?.find((w) => w.slug === ward);

  return `${street}${ward ? `, ${w?.name || ''}` : ''}, ${d?.name || ''}, ${
    p?.name || ''
  }`;
};

const getProvinceByCode = (code?: string) => {
  if (!code) return null;

  return provinces.find((p) => p.code === code) || null;
};

const getProvinceBySlug = (slug?: string) => {
  return provinces.find((p) => p.slug === slug) || null;
};

const getDistrictByCode = (districts: IDistrict[], code?: string) => {
  if (!code) return null;

  return districts.find((d) => d.code === code) || null;
};

const getDistrictBySlug = (districts: IDistrict[], slug?: string) => {
  return districts.find((d) => d.slug === slug) || null;
};

const getDistrictsByProvinceCode = (provinceCode: string) => {
  return getDbyPCode(provinceCode) as Array<IDistrict>;
};

export {
  provinces,
  toAddressString,
  getProvinceByCode,
  getDistrictByCode,
  getDistrictBySlug,
  getProvinceBySlug,
  getDistrictsByProvinceCode,
};
