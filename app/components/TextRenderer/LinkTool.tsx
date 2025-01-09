export default function LinkTool({
  data,
}: {
  data: {
    link: string;
    meta: { title: string; description: string; image: { url: string } };
  };
}) {
  return (
    <a
      href={data.link}
      target='_blank'
      rel='noreferrer noopener'
      dangerouslySetInnerHTML={{ __html: data.meta.title }}
    ></a>
  );
}
