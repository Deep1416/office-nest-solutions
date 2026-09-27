import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/config";

export function WhatsAppFloating({ message }: { message?: string }) {
  const msg = message ?? "Hello OfficeMate, I am interested in a virtual office. Please share more details.";
  return (
    <a
      href={whatsappUrl(msg)}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-20 right-4 z-30 grid h-14 w-14 place-items-center rounded-full bg-success text-success-foreground shadow-elevated transition-transform hover:scale-105 lg:bottom-6"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
