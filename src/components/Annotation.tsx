export function Annotation({
  text,
  className = "",
  flip = false,
  rotate = -4,
  textClassName = "text-primary/80",
  arrowClassName = "text-primary/60",
}: {
  text: string;
  className?: string;
  flip?: boolean;
  rotate?: number;
  textClassName?: string;
  arrowClassName?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none hidden select-none flex-col items-center gap-1 sm:flex ${flip ? "items-end" : "items-start"} ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <span className={`font-hand text-2xl leading-tight ${textClassName}`}>{text}</span>
      <svg
        width="72" height="34" viewBox="0 0 72 34" fill="none"
        className={flip ? "-scale-x-100" : ""}
      >
        <path d="M3 4 C 22 2, 44 22, 66 27" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" className={arrowClassName} />
        <path d="M55 20 L 67 28 L 53 31" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" className={arrowClassName} />
      </svg>
    </div>
  );
}
