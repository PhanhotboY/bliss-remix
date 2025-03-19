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

const { getProvinces, getDistrictsByProvinceCode, getWardsByDistrictCode } =
  pkg;
const provinces = getProvinces() as Array<IProvince>;

const ageUnit = {
  d: 'ngày',
  m: 'tháng',
  y: 'tuổi',
};

const getUnit = (u: string) => {
  return ageUnit[
    (Object.keys(ageUnit).find((key) => key === u) ||
      'y') as keyof typeof ageUnit
  ];
};

const toAgeString = ({ from, to }: { from: string; to: string }) => {
  const [fromAge, fromAgeUnit] = from.split('');
  const [toAge, toAgeUnit] = to.split('');

  if (from === to) {
    return `${from} ${getUnit(fromAgeUnit)}`;
  }

  return `${fromAge} ${getUnit(fromAgeUnit)} - ${toAge} ${getUnit(toAgeUnit)}`;
};

const abbCurrency = ['Đ', 'K', 'Tr', 'T'];
const shortenNumber = (money: number, stack = 0) => {
  if (Math.abs(+money) < 1_000 || stack >= abbCurrency.length - 1) {
    if (stack < 2) return `${+money.toFixed(2)}${abbCurrency[stack]}`;

    const [int, dec] = money.toFixed(2).split('.');
    return `${int}${abbCurrency[stack]}${dec.replace(/0+$/, '')}`;
  }

  return shortenNumber(+(+money / 1_000).toFixed(2), ++stack);
};

const toCurrencyString = (money: number | string) => {
  return shortenNumber(+money);
};

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
  const districts = getDistrictsByProvinceCode(
    p?.code || ''
  ) as Array<IDistrict>;
  const d = districts?.find((d) => d.slug === district);

  const wards = getWardsByDistrictCode(d?.code || '');
  const w = wards?.find((w) => w.slug === ward);

  return `${street}${ward ? `, ${w?.name || ''}` : ''}, ${d?.name || ''}, ${
    p?.name || ''
  }`;
};

const getMapLink = (html: string) => {
  return html.match(/(https:\/\/[^"]*)/)?.[1];
};

const toVnDateString = (date: string) => {
  return new Date(date).toLocaleDateString('vi-VN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

const isEmpltyObject = (obj: any) => {
  return Object.keys(obj || {}).length === 0;
};

export {
  toAgeString,
  toCurrencyString,
  toAddressString,
  getMapLink,
  toVnDateString,
  isEmpltyObject,
};
