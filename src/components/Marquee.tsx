export default function Marquee({ text }: { text: string }) {
  const words = Array.from({ length: 8 }, (_, i) => (
    <span key={i} className="marquee-word">
      {text}
    </span>
  ));

  return (
    <div className="marquee" role="presentation">
      <div className="marquee-track">
        <div className="marquee-group">{words}</div>
        <div className="marquee-group" aria-hidden="true">
          {words}
        </div>
      </div>
    </div>
  );
}