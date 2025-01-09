export default function About() {
  return (
    <section className='container gap-4 lg:gap-8'>
      <div className='col-span-12 md:col-span-6'>
        <h2 className='text-[--main-color] font-bold text-center text-3xl lg:text-5xl my-6'>
          Về Nails Nhà Ý
        </h2>

        <div className='overflow-y-auto h-fit md:h-[150px] lg:h-[255px] pb-4'>
          <div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
              eu velit leo. Maecenas aliquam, tortor varius ultricies
              sollicitudin, enim nulla consequat diam, ac blandit ipsum magna id
              eros. Duis in mollis elit, sed porta nunc. Curabitur vel blandit
              ligula. Nam accumsan pharetra ex a euismod. Fusce sit amet
              pulvinar eros. Ut consequat bibendum nisl eu molestie. Sed at
              libero sit amet urna dignissim vulputate.
            </p>

            <br />

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
              eu velit leo. Maecenas aliquam, tortor varius ultricies
              sollicitudin, enim nulla consequat diam, ac blandit ipsum magna id
              eros. Duis in mollis elit, sed porta nunc. Curabitur vel blandit
              ligula. Nam accumsan pharetra ex a euismod. Fusce sit amet
              pulvinar eros. Ut consequat bibendum nisl eu molestie. Sed at
              libero sit amet urna dignissim vulputate.
            </p>

            <br />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
              eu velit leo. Maecenas aliquam, tortor varius ultricies
              sollicitudin, enim nulla consequat diam, ac blandit ipsum magna id
              eros. Duis in mollis elit, sed porta nunc. Curabitur vel blandit
              ligula. Nam accumsan pharetra ex a euismod. Fusce sit amet
              pulvinar eros. Ut consequat bibendum nisl eu molestie. Sed at
              libero sit amet urna dignissim vulputate.
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
