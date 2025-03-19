export default function About() {
  return (
    <section className='container gap-4 lg:gap-8'>
      <div className='col-span-12 md:col-span-6'>
        <h2 className='text-[--main-color] font-bold text-center text-3xl lg:text-5xl my-6'>
          Về Hải Anh Starbeauty
        </h2>

        <div className='overflow-y-auto h-fit md:h-[150px] lg:h-[255px] pb-4'>
          <div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>

            <br />

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>

            <br />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
          </div>
        </div>
      </div>

      <div className='col-span-12 md:col-span-6'>
        <img
          className='h-full w-full object-contain object-top'
          src='/assets/about-us.png'
          alt=''
        />
      </div>
    </section>
  );
}
