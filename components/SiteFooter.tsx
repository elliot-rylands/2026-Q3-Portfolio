import { Clock } from "@/app/Clock";
import { site } from "@/lib/site";

export function SiteFooter({ stagger = 8 }: { stagger?: number }) {
  return (
    <footer data-animate style={{ "--stagger": stagger } as React.CSSProperties}>
      <span>{site.footer}</span>
      <span>{new Date().getFullYear()}</span>
      <Clock />
    </footer>
  );
}
