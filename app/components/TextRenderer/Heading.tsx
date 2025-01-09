export default function Heading({
  data,
  tunes,
}: {
  data: { text: string; level: number };
  tunes: { textAlign: { alignment: string } };
}) {
  const className = `heading-${data.level} text-${tunes.textAlign.alignment}`;

  return [
    <h1
      className={className}
      dangerouslySetInnerHTML={{ __html: data.text }}
    ></h1>,
    <h2
      className={className}
      dangerouslySetInnerHTML={{ __html: data.text }}
    ></h2>,
    <h3
      className={className}
      dangerouslySetInnerHTML={{ __html: data.text }}
    ></h3>,
    <h4
      className={className}
      dangerouslySetInnerHTML={{ __html: data.text }}
    ></h4>,
    <h5
      className={className}
      dangerouslySetInnerHTML={{ __html: data.text }}
    ></h5>,
    <h6
      className={className}
      dangerouslySetInnerHTML={{ __html: data.text }}
    ></h6>,
  ][data.level - 1];
}
