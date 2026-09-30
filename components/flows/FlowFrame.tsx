"use client";

import type { KeyboardEvent, ReactNode } from "react";
import styles from "./flows.module.css";

export type Skin = "scan" | "squiz" | "gov" | "papa" | "gctv" | "titan";

// Shared mechanics for the case study flow maps. Each company gets its own skin
// (colour, type, shape) and opens on its own problem, so no two maps look alike.
export function FlowFrame({
  skin,
  eyebrow,
  problem,
  controls,
  detail,
  minWidth = 560,
  ship,
  children,
}: {
  skin: Skin;
  eyebrow: string;
  problem: string;
  controls?: ReactNode;
  detail?: { title: string; text: string; tag?: string } | null;
  minWidth?: number;
  ship: { steps: string[]; ordered?: boolean };
  children: ReactNode;
}) {
  return (
    <figure className={`${styles.frame} ${styles[skin]}`}>
      <div className={styles.head}>
        <div>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <p className={styles.problem}>{problem}</p>
        </div>
        {controls ? <div className={styles.controls}>{controls}</div> : null}
      </div>
      <div className={styles.scroll}>
        <div style={{ minWidth }}>{children}</div>
      </div>
      <div className={styles.detail} aria-live="polite">
        {detail ? (
          <>
            {detail.tag ? <span className={styles.tag}>{detail.tag}</span> : null}
            <strong>{detail.title}</strong>
            <span>{detail.text}</span>
          </>
        ) : (
          <span className={styles.hint}>Select any step to see what it does.</span>
        )}
      </div>
      <ol className={`${styles.ship} ${ship.ordered ? styles.ordered : ""}`} aria-label="How it shipped">
        {ship.steps.map((st, i) => (
          <li key={i}>{st}</li>
        ))}
      </ol>
    </figure>
  );
}

export function Toggle<T extends string>({ value, options, onChange, label }: { value: T; options: { value: T; label: string }[]; onChange: (v: T) => void; label: string }) {
  return (
    <div className={styles.toggle} role="radiogroup" aria-label={label}>
      {options.map((o) => (
        <button key={o.value} type="button" role="radio" aria-checked={value === o.value} onClick={() => onChange(o.value)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

// Keyboard and pointer props for an SVG group that behaves like a button.
export function nodeProps(label: string, selected: boolean, onSelect: () => void) {
  return {
    role: "button",
    tabIndex: 0,
    "aria-label": label,
    "aria-pressed": selected,
    onClick: onSelect,
    onKeyDown: (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onSelect();
      }
    },
    className: styles.node,
  } as const;
}

export { styles as flowStyles };
