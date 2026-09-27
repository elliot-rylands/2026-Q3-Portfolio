import { Clock } from "@/app/Clock";
import { site } from "@/lib/site";

export function SiteFooter({ stagger = 8, reveal = false }: { stagger?: number; reveal?: boolean }) {
  return (
    <footer {...(reveal ? { "data-reveal": true } : { "data-animate": true, style: { "--stagger": stagger } as React.CSSProperties })}>
      <span>{site.footer}</span>
      <span>{new Date().getFullYear()}</span>
      <Clock />
    </footer>
  );
}
