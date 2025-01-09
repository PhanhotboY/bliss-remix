// assets
// import avatar from '@assets/avatar.webp';
import { useFetcher } from '@remix-run/react';
import { formatDate } from 'date-fns';

const UserProfileCard = ({ user }: { user: any }) => {
  const fetcher = useFetcher();
  const fullName = `${user.usr_firstName} ${user.usr_lastName}`;

  return (
    <div
      className='card flex flex-col items-center justify-center'
      id='userProfileCard'
    >
      <div className='relative mb-3.5'>
        <img
          className='relative rounded-full w-[110px] h-[110px]'
          src='https://res.cloudinary.com/dkc0dedwd/image/upload/v1731729104/blog/adcuhafsoctsawtsbndp.png'
          alt={fullName}
        />

        <button
          className='absolute z-10 right-0 bottom-0 h-10 w-10 bg-green text-widget rounded-full border-[3px]
                        border-widget border-solid transition hover:bg-green-darker'
          aria-label='Change profile picture'
        >
          <i className='inline-block icon-camera-solid mt-1' />
        </button>
      </div>

      <h4>{fullName}</h4>

      <span className='badge badge--square bg-red min-w-[96px] mt-2.5'>
        Admin
      </span>

      <p className='subheading-2 mt-6 mb-[18px]'>
        last visit {formatDate(Date.now(), 'dd/MM/yyyy')}
      </p>
    </div>
  );
};

export default UserProfileCard;
