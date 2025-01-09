const MINUTES_AGO = 'phút trước';
const HOURS_AGO = 'giờ trước';
const YESTERDAY = 'Hôm qua';
const YEARS_AGO = 'năm trước';

const getPublicPeriod = (publishedAt: string) => {
  const publishDate = new Date(publishedAt);
  const publishSince = (Date.now() - publishDate.getTime()) / 1000;

  // less than 1 hour
  if (publishSince < 60 * 60) {
    return `${Math.floor(publishSince / 60)} ${MINUTES_AGO}`;
  }

  // less than 1 day
  if (publishSince < 24 * 60 * 60) {
    return `${Math.floor(publishSince / 60 / 60)} ${HOURS_AGO}`;
  }

  // less than 2 days
  if (publishSince < 48 * 60 * 60) {
    return YESTERDAY;
  }

  // less than 1 year
  if (publishSince < 365 * 24 * 60 * 60) {
    return `${publishDate.toLocaleDateString('vi-VN')} ${publishDate
      .getHours()
      .toString()
      .padStart(2, '0')}:${publishDate
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
  }

  // more than 1 year
  return `${Math.floor(publishSince / 365 / 24 / 60 / 60)} ${YEARS_AGO}`;
};

const getNumerator = (number: number, ratio: string) => {
  return (
    (number * parseInt(ratio.split('/')[0])) / parseInt(ratio.split('/')[1])
  );
};

const getDemonator = (number: number, ratio: string) => {
  return (
    (number * parseInt(ratio.split('/')[1])) / parseInt(ratio.split('/')[0])
  );
};

const getPageOffset = ({ page, limit }: { page: number; limit: number }) => {
  return {
    start: (page - 1) * limit,
    end: page * limit,
  };
};

const clientFetch = async (url: string, init?: RequestInit) => {
  const res = await fetch(url, init);
  return res.json();
};

export {
  getPublicPeriod,
  getNumerator,
  getDemonator,
  getPageOffset,
  clientFetch,
};
