import HorizontalPost from '~/components/Post/Horizontal';

export default function RelatedArticle({ posts }: { posts: any[] }) {
  return (
    <section className='md:border md:px-6 md:py-2'>
      <h2 className='hidden md:block text-xl font-bold text-[--main-color] uppercase my-4'>
        Tin liên quan
      </h2>

      <ul className='flex flex-col gap-4'>
        {posts.slice(0, 5).map((p, index) => (
          <li key={index}>
            <HorizontalPost
              post={p}
              ratio='5/7'
              colSpan={12}
              className='grid'
              detailed
              important
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
