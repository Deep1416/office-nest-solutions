import { Link } from "@tanstack/react-router";

// `light` swaps in the white-text version for dark (navy) backgrounds.
export function Logo({ className = "", light = false }: { className?: string; light?: boolean }) {
  return (
    <Link to="/" className={`inline-flex items-center ${className}`} aria-label="OfficeMate home">
      <img
        src={light ? "/logo-light.png" : "/logo.png"}
        alt="OfficeMate — Your Business Address, Anywhere"
        width={1203}
        height={288}
        className="h-12 w-auto"
      />
    </Link>
  );
}
