import { toast as notify } from 'react-toastify';
import { useEffect, useRef, useState } from 'react';
import { json, useFetcher, useLoaderData } from '@remix-run/react';

import { getAppSettings } from '~/services/app.server';
import TextInput from '~/components/TextInput';
import ImageInput from '~/components/ImageInput';
import pkg from 'vn-provinces';
import { SCHOOL } from '~/constants/school.constant';
import HandsomeError from '~/components/HandsomeError';

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

const { getProvinces, getDistrictsByProvinceCode, getProvinceByCode } = pkg;
const provinces = getProvinces() as Array<IProvince>;

export const meta = [
  {
    title: 'Cms Desk',
  },
];

export const loader = async () => {
  const appSettings = await getAppSettings();

  return json({ appSettings });
};

export default function CmsDesk() {
  const { appSettings } = useLoaderData<typeof loader>();

  const fetcher = useFetcher<any>();

  const [email, setEmail] = useState(appSettings.app_email);
  const [msisdn, setMsisdn] = useState(appSettings.app_msisdn);
  const [province, setProvince] = useState(
    provinces.find((p) => p.slug === appSettings.app_address.province)?.slug ||
      ''
  );
  const [districts, setDistricts] = useState(
    provinces.find((p) => p.slug === appSettings.app_address.province)?.code
      ? getDistrictsByProvinceCode(
          provinces.find((p) => p.slug === appSettings.app_address.province)
            ?.code || ''
        )
      : ([] as Array<IDistrict>)
  );
  const [district, setDistrict] = useState(
    districts.find((d) => d.slug === appSettings.app_address.district)?.slug ||
      ''
  );
  // const [ward, setWard] = useState(appSettings.app_address);
  const [street, setStreet] = useState(appSettings.app_address.street);
  const [logo, setLogo] = useState(appSettings.app_logo);
  const [title, setTitle] = useState(appSettings.app_title);
  const [description, setDescription] = useState(appSettings.app_description);
  const [favicon, setFavicon] = useState('/favicon.ico');
  const [facebook, setFacebook] = useState(appSettings.app_social.facebook);
  const [tiktok, setTiktok] = useState(appSettings.app_social.tiktok);
  const [youtube, setYoutube] = useState(appSettings.app_social.youtube);
  const [zalo, setZalo] = useState(appSettings.app_social.zalo);
  const [taxCode, setTaxCode] = useState(appSettings.app_taxCode);
  const [analytics, setAnalytics] = useState(appSettings.app_google.analytics);
  const [map, setMap] = useState(appSettings.app_google.map);

  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    getDistrictsByProvinceCode(
      provinces.find((p) => p.slug === province)?.code || ''
    );
    const districts =
      getDistrictsByProvinceCode(
        provinces.find((p) => p.slug === province)?.code || ''
      ) || ([] as Array<IDistrict>);

    setDistricts(districts);
    setDistrict(
      districts.find((d) => d.slug === appSettings.app_address.district)
        ?.slug || ''
    );
  }, [province]);

  useEffect(() => {
    setIsChanged(
      email !== appSettings.app_email ||
        msisdn !== appSettings.app_msisdn ||
        province !== appSettings.app_address.province ||
        district !== appSettings.app_address.district ||
        // ward !== appSettings.app_address ||
        street !== appSettings.app_address.street ||
        title !== appSettings.app_title ||
        description !== appSettings.app_description ||
        facebook !== appSettings.app_social.facebook ||
        tiktok !== appSettings.app_social.tiktok ||
        youtube !== appSettings.app_social.youtube ||
        zalo !== appSettings.app_social.zalo ||
        taxCode !== appSettings.app_taxCode ||
        analytics !== appSettings.app_google.analytics ||
        map !== appSettings.app_google.map ||
        logo !== appSettings.app_logo ||
        favicon?.includes('blob')
    );
  }, [
    email,
    msisdn,
    province,
    district,
    // ward,
    street,
    logo,
    title,
    description,
    favicon,
    facebook,
    tiktok,
    youtube,
    zalo,
    taxCode,
    analytics,
    map,
  ]);

  const toastIdRef = useRef<any>(null);

  useEffect(() => {
    switch (fetcher.state) {
      case 'submitting':
        toastIdRef.current = notify.loading('Loading...', {
          autoClose: false,
        });

        break;

      case 'idle':
        if (fetcher.data?.toast && toastIdRef.current) {
          const { toast: toastData } = fetcher.data as any;
          notify.update(toastIdRef.current, {
            render: toastData.message,
            type: toastData.type || 'success', // Default to 'success' if type is not provided
            autoClose: 3000,
            isLoading: false,
          });
          toastIdRef.current = null;
          setIsChanged(false);
          break;
        }

        notify.update(toastIdRef.current, {
          render: fetcher.data?.toast.message,
          autoClose: 3000,
          isLoading: false,
          type: 'error',
        });

        break;
    }
  }, [fetcher.state]);

  return (
    <div className='container'>
      <fetcher.Form
        className='grid grid-cols-12 gap-8 col-span-12'
        method='POST'
        action='/cmsdesk'
        encType='multipart/form-data'
      >
        <div className='col-span-4 flex flex-col gap-4'>
          <ImageInput
            name='logo'
            label='Logo'
            value={logo}
            onChange={setLogo}
          />

          <ImageInput
            name='favicon'
            label='Favicon'
            value={favicon}
            onChange={setFavicon}
          />
        </div>

        <div className='meta col-span-4 flex flex-col gap-4'>
          <div className='meta flex flex-col gap-4'>
            <TextInput
              name='title'
              value={title}
              label='Title'
              onChange={setTitle}
            />
            <TextInput
              name='description'
              value={description}
              label='Description'
              onChange={setDescription}
            />
          </div>

          <div className='contact flex flex-col gap-4'>
            <TextInput
              name='email'
              value={email}
              type='email'
              label='Email'
              onChange={setEmail}
            />
            <TextInput
              name='phone'
              value={msisdn}
              label='Phone'
              pattern='[0-9]{10}'
              onChange={setMsisdn}
            />
          </div>

          <div className='w-full'>
            <label
              htmlFor='province'
              className='block text-sm font-semibold leading-6 text-black'
            >
              Tỉnh/Thành phố
            </label>
            <div className='mt-2.5'>
              <select
                name='province'
                id='province'
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                autoComplete='given-name'
                className='h-10 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm shadow-blue-500 ring-1 ring-inset ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6 focus:outline-none bg-white'
              >
                <option value=''>Chọn tỉnh/thành phố</option>
                {provinces.map((p) => (
                  <option key={p.code} value={p.slug}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className='w-full'>
            <label
              htmlFor='district'
              className='block text-sm font-semibold leading-6 text-black'
            >
              Quận/Huyện
            </label>
            <div className='mt-2.5'>
              <select
                name='district'
                id='district'
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                autoComplete='given-name'
                className='h-10 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm shadow-blue-500 ring-1 ring-inset ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6 focus:outline-none bg-white'
              >
                <option value=''>Chọn quận/huyện</option>
                {districts.map((d) => (
                  <option key={d.code} value={d.slug}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <TextInput
            name='street'
            value={street}
            label='Đường'
            onChange={setStreet}
          />
        </div>

        <div className='logo col-span-4 flex flex-col gap-4'>
          <TextInput
            name='analytics'
            value={analytics}
            label='Google Analytics'
            onChange={setAnalytics}
          />

          <TextInput
            label='Google Map Link'
            value={map}
            name='map'
            onChange={setMap}
          />

          <TextInput
            name='facebook'
            value={facebook}
            label='Facebook'
            onChange={setFacebook}
          />

          <TextInput
            name='tiktok'
            value={tiktok}
            label='Tiktok'
            onChange={setTiktok}
          />

          <TextInput
            name='youtube'
            value={youtube}
            label='Youtube'
            onChange={setYoutube}
          />

          <TextInput name='zalo' value={zalo} label='Zalo' onChange={setZalo} />

          <TextInput
            name='taxCode'
            value={taxCode}
            label='MST'
            onChange={setTaxCode}
          />
        </div>

        <button
          className='middle col-span-8 col-start-5 none center w-full rounded-lg bg-blue-500 py-3 px-6 font-sans text-sm font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
          data-ripple-light='true'
          type='submit'
          disabled={!isChanged}
        >
          Cập nhật
        </button>
      </fetcher.Form>
    </div>
  );
}

export const ErrorBoundary = () => <HandsomeError basePath='/cmsdesk' />;
