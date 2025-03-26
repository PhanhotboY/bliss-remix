import { useEffect, useRef, useState } from 'react';

import { IBranchDetail } from '~/interfaces/branch.interface';
import TextInput from '@components/TextInput';
import Wrapper from './Wrapper';
import Select from '~/widgets/Select';
import CheckboxInput from '~/components/CheckboxInput';
import ImageInput from '~/components/ImageInput';
import {
  getDistrictByCode,
  getDistrictBySlug,
  getDistrictsByProvinceCode,
  getProvinceByCode,
  getProvinceBySlug,
  provinces,
} from '~/utils/address.util';

export default function BranchEditor({
  branch,
  type,
}: {
  branch?: IBranchDetail;
  type: 'update' | 'create';
}) {
  const [isChanged, setIsChanged] = useState(false);
  const [name, setName] = useState(branch?.bra_name || '');
  const [email, setEmail] = useState(branch?.bra_email || '');
  const [msisdn, setMsisdn] = useState(branch?.bra_msisdn || '');
  const [thumbnail, setThumbnail] = useState(
    branch?.bra_thumbnail || ({} as any)
  );
  const [province, setProvince] = useState(
    getProvinceBySlug(branch?.bra_address.province) || provinces[0]
  );
  const [districts, setDistricts] = useState(
    getDistrictsByProvinceCode(province.code)
  );
  const [district, setDistrict] = useState(
    getDistrictBySlug(districts, branch?.bra_address.district) || districts[0]
  );
  const [street, setStreet] = useState(branch?.bra_address.street || '');
  const [isMain, setIsMain] = useState(branch?.bra_isMain || false);
  const [map, setMap] = useState(branch?.bra_map || '');

  useEffect(() => {
    setDistricts(getDistrictsByProvinceCode(province.code));
    setDistrict(
      getDistrictBySlug(districts, branch?.bra_address.district) || districts[0]
    );
  }, [province.code]);

  useEffect(() => {
    if (branch) {
      setIsChanged(
        name !== branch.bra_name ||
          email !== branch.bra_email ||
          msisdn !== branch.bra_msisdn ||
          thumbnail !== branch.bra_thumbnail ||
          province.slug !== branch?.bra_address.province ||
          district.slug !== branch?.bra_address.district ||
          street !== branch.bra_address.street ||
          isMain !== branch.bra_isMain ||
          map !== branch.bra_map
      );
    }
  }, [
    name,
    branch,
    email,
    msisdn,
    thumbnail,
    province,
    district,
    street,
    isMain,
    map,
  ]);

  return (
    <Wrapper fetcherKey={branch?.id || 'new'} type={type} isChanged={isChanged}>
      <div className='name col-span-12'>
        <TextInput
          label='Tên chi nhánh'
          name='name'
          value={name}
          onChange={setName}
        />
      </div>

      <div className='col-span-6 row-span-2'>
        <ImageInput
          label='Thumbnail'
          name='thumbnail'
          value={thumbnail}
          onChange={setThumbnail}
        />
      </div>

      <div className='province col-span-6 col-start-7'>
        <Select
          label='Tỉnh/Thành phố'
          name='province'
          className='w-full'
          value={province.slug}
          onChange={(e) => setProvince(getProvinceBySlug(e.target.value)!)}
        >
          <option value='' disabled>
            Chọn tỉnh/thành phố
          </option>

          {provinces.map((p) => (
            <option key={p.code} value={p.slug}>
              {p.name}
            </option>
          ))}
        </Select>
      </div>

      <div className='district col-span-6 col-start-7'>
        <Select
          label='Quận/Huyện'
          name='district'
          className='w-full'
          value={district.slug}
          onChange={(e) =>
            setDistrict(getDistrictBySlug(districts, e.target.value)!)
          }
        >
          <option value='' disabled>
            Chọn quận/huyện
          </option>

          {districts.map((d) => (
            <option key={d.code} value={d.slug}>
              {d.name}
            </option>
          ))}
        </Select>
      </div>

      <div className='map col-span-6'>
        <TextInput label='Map' name='map' value={map} onChange={setMap} />
      </div>

      <div className='street col-span-6 col-start-7'>
        <TextInput
          label='Địa chỉ chi tiết'
          name='street'
          value={street}
          onChange={setStreet}
        />
      </div>

      <div className='email col-span-6'>
        <TextInput
          label='Email'
          name='email'
          type='email'
          value={email}
          onChange={setEmail}
        />
      </div>

      <div className='phone col-span-6'>
        <TextInput
          label='Số điện thoại'
          name='msisdn'
          value={msisdn}
          onChange={setMsisdn}
          pattern='[0-9]{10,11}'
        />
      </div>

      <div className='toggle col-span-6'>
        <CheckboxInput
          label='Đặt làm chi nhánh chính'
          type='checkbox'
          name='isMain'
          checked={isMain}
          onChange={setIsMain}
        />
      </div>
    </Wrapper>
  );
}
