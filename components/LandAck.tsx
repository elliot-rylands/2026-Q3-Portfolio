"use client";

import { useEffect, useId, useRef, useState } from "react";
import { site } from "@/lib/site";

// "Made by hand on Treaty 7 territory." with the full land acknowledgement in
// a small card on hover or keyboard focus. Tap toggles it on touch screens;
// Esc or tapping elsewhere closes it. The text is always in the DOM and tied
// to the trigger with aria-describedby, so screen readers and crawlers get it.
export function LandAck() {
  const id = useId();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  return (
    <span className="ack" ref={ref} data-open={open || undefined}>
      Made by hand on{" "}
      <button type="button" className="ack-trigger" aria-describedby={id} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        Treaty 7 territory
      </button>
      .
      <span role="tooltip" id={id} className="ack-card">
        {site.landAcknowledgement}
      </span>
    </span>
  );
}
