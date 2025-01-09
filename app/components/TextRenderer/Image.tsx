export default function Image({
  data,
  tunes,
}: {
  data: { file: { url: string }; caption: string };
  tunes: { caption: boolean };
}) {
  return (
    <div>
      <img src={data.file.url} alt={data.caption} loading='lazy' />
    </div>
  );
}
