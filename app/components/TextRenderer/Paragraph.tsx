export default function Paragraph({
  data,
  tunes,
}: {
  data: { text: string };
  tunes?: { textAlign: { alignment: string } };
}) {
  return (
    <p
      className={`edjs-paragraph text-${tunes?.textAlign.alignment}`}
      dangerouslySetInnerHTML={{ __html: data.text }}
    ></p>
  );
}
