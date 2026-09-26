"use client";

import { useEffect, useState } from "react";

function cochraneTime() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
    timeZone: "America/Edmonton",
  }).formatToParts(new Date());
  const h = Number(parts.find((p) => p.type === "hour")?.value ?? 0) % 24;
  const m = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  return { h, m };
}

export function Clock() {
  const [time, setTime] = useState<{ h: number; m: number } | null>(null);

  useEffect(() => {
    setTime(cochraneTime());
    const id = setInterval(() => setTime(cochraneTime()), 30_000);
    return () => clearInterval(id);
  }, []);

  const hDeg = time ? (time.h % 12) * 30 + time.m * 0.5 : 0;
  const mDeg = time ? time.m * 6 : 0;
  const label = time
    ? `${time.h % 12 || 12}:${String(time.m).padStart(2, "0")}${time.h < 12 ? "am" : "pm"} in Cochrane`
    : "Cochrane, AB";

  return (
    <span className="clock-wrap" title="Time in Cochrane, Alberta">
      <span
        className="clock"
        aria-hidden="true"
        style={{ "--h-deg": `${hDeg}deg`, "--m-deg": `${mDeg}deg` } as React.CSSProperties}
      >
        <span className="hand h" />
        <span className="hand m" />
      </span>
      <span suppressHydrationWarning>{label}</span>
    </span>
  );
}
