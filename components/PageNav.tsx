import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { CopyLink } from "./CopyLink";

// Shared top bar for inner pages: avatar + name back home, copy link on the right.
export function PageNav() {
  return (
    <nav className="post-nav" data-animate>
      <Link href="/" className="avatar-link" aria-label={`${site.name}, back to home`}>
        <Image src="/elliot.png" alt="" width={40} height={40} className="avatar avatar-sm" />
        <span className="avatar-name">{site.name}</span>
      </Link>
      <CopyLink />
    </nav>
  );
}
