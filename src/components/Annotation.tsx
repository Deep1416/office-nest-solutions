export function Annotation({
  text,
  className = "",
  flip = false,
  rotate = -4,
}: {
  text: string;
  className?: string;
  flip?: boolean;
  rotate?: number;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none hidden select-none flex-col items-center gap-1 text-primary/70 sm:flex ${flip ? "items-end" : "items-start"} ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <span className="font-hand text-2xl leading-none whitespace-nowrap">{text}</span>
      <svg
        width="72" height="34" viewBox="0 0 72 34" fill="none"
        className={flip ? "-scale-x-100" : ""}
      >
        <path d="M3 4 C 22 2, 44 22, 66 27" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M55 20 L 67 28 L 53 31" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    </div>
  );
}
