"use client";

import { useState } from "react";
import { FlowFrame, Toggle, flowStyles as s, nodeProps } from "./FlowFrame";

// Circuit board: eight products, each with its own front door, rewired into
// one sign-in, one shell and one launchpad. The launchpad can be labelled by
// product (version one) or by job (version two).
const PRODUCTS = [
  { id: "matrix", name: "Matrix", job: "Content management", text: "Ran the content. Its tile now leads with the job: content management first, Matrix CMS second." },
  { id: "funnelback", name: "Funnelback", job: "Search", text: "Ran the search. Setting up a data source became five steps, each explaining itself, with a review before anything runs." },
  { id: "connect", name: "Connect", job: "Integrations", text: "Part of the plumbing that joined systems together, now reached from the same drawer as everything else." },
  { id: "datastore", name: "Datastore", job: "Data storage", text: "More plumbing, now behind the same sign-in and header as the rest of the suite." },
  { id: "cdp", name: "CDP", job: "Customer data", text: "Designed inside the shell from day one, so it never had an accent to lose: sources, segments and events on shared cards and forms." },
  { id: "more", name: "+3 more", job: "Everything else", text: "Eight products in all, each with its own sign-in, header and idea of where the settings lived." },
];

const ROW = (i: number) => 58 + i * 42;
const TILE = (i: number) => ({ x: 496 + (i % 2) * 108, y: 72 + Math.floor(i / 2) * 70 });

export default function SquizFlow() {
  const [mode, setMode] = useState<"before" | "after">("before");
  const [nav, setNav] = useState<"product" | "job">("job");
  const [sel, setSel] = useState<string | null>(null);
  const after = mode === "after";
  const p = PRODUCTS.find((x) => x.id === sel);
  const hub = sel === "signin" || sel === "shell";

  const detail = p
    ? { tag: p.name, title: after ? (nav === "job" ? `${p.job}, then ${p.name}` : p.name) : `${p.name}: its own front door`, text: after ? p.text : "Its own sign-in, its own header, and a customer who bought one product might never discover the one next door." }
    : sel === "signin"
      ? { tag: "Shipped first", title: "One sign-in", text: "Every product opens the same way: the platform's name first, the product's name second." }
      : sel === "shell"
        ? { tag: "Shell", title: "One drawer, one dashboard", text: "The drawer holds the whole suite, and the dashboard shows what your organisation has switched on. The first moment a customer can see everything they pay for." }
        : null;

  return (
    <FlowFrame
      skin="squiz"
      eyebrow="Squiz · eight products, one front door"
      problem="Eight good products that behaved like strangers. The suite was the thing being sold, and nobody could actually see it."
      minWidth={600}
      controls={
        <>
          <Toggle label="Platform" value={mode} onChange={(v) => { setMode(v); setSel(null); }} options={[{ value: "before", label: "8 front doors" }, { value: "after", label: "1 front door" }]} />
          {after ? <Toggle label="Launchpad labels" value={nav} onChange={setNav} options={[{ value: "product", label: "v1 by product" }, { value: "job", label: "v2 by job" }]} /> : null}
        </>
      }
      detail={detail}
      ship={{ ordered: true, steps: ["Shell prototype in code, kept in GitHub", "Sign-in", "Shell and launchpad", "Tokens and components in Storybook", "Products moved in, one at a time"] }}
    >
      <svg viewBox="0 0 720 300" role="group" aria-label="Squiz products and the shared platform">
        {/* wires */}
        {PRODUCTS.map((x, i) => {
          const lit = sel === x.id || hub;
          const t = TILE(i);
          return (
            <g key={x.id} className={s.fade} style={{ opacity: after ? 1 : 0, pointerEvents: "none" }}>
              <path d={`M150 ${ROW(i)} H236 V150 H286`} fill="none" stroke={lit ? "var(--f-accent)" : "var(--f-line)"} strokeWidth={lit ? 2 : 1.4} />
              <path d={`M442 150 H470 V${t.y + 24} H${t.x}`} fill="none" stroke={sel === x.id ? "var(--f-accent)" : "var(--f-line)"} strokeWidth={sel === x.id ? 2 : 1.2} />
              <rect x="233" y={ROW(i) - 3} width="6" height="6" fill="var(--f-line)" />
            </g>
          );
        })}

        {/* products */}
        {PRODUCTS.map((x, i) => {
          const on = sel === x.id;
          return (
            <g key={x.id} {...nodeProps(x.name, on, () => setSel(x.id))}>
              <rect className="ring" x="24" y={ROW(i) - 15} width="126" height="30" fill={on ? "var(--f-accent)" : "var(--f-panel)"} stroke={on ? "var(--f-accent)" : "var(--f-line)"} />
              <text x="36" y={ROW(i) + 4} fontSize="11.5" fill={on ? "var(--f-on-accent)" : "var(--f-ink)"}>{x.name}</text>
              {/* before: every product drags its own sign-in and header */}
              <g className={s.fade} style={{ opacity: after ? 0 : 1 }}>
                <path d={`M150 ${ROW(i)} H196`} stroke="var(--f-line)" strokeDasharray="3 3" />
                <rect x="196" y={ROW(i) - 11} width="70" height="22" fill="none" stroke="var(--f-dim)" strokeDasharray="2 2" />
                <text x="231" y={ROW(i) + 4} textAnchor="middle" fontSize="9.5" fill="var(--f-dim)">own sign-in</text>
                <rect x="276" y={ROW(i) - 11} width="70" height="22" fill="none" stroke="var(--f-dim)" strokeDasharray="2 2" />
                <text x="311" y={ROW(i) + 4} textAnchor="middle" fontSize="9.5" fill="var(--f-dim)">own header</text>
              </g>
            </g>
          );
        })}

        <g className={s.fade} style={{ opacity: after ? 0 : 1 }}>
          <text x="480" y="130" fontSize="12" fill="var(--f-dim)">No shared sign-in.</text>
          <text x="480" y="150" fontSize="12" fill="var(--f-dim)">No shared header.</text>
          <text x="480" y="170" fontSize="12" fill="var(--f-dim)">No way to see the suite.</text>
        </g>

        {/* platform */}
        <g className={s.fade} style={{ opacity: after ? 1 : 0, pointerEvents: after ? "auto" : "none" }}>
          <g {...nodeProps("One sign-in", sel === "signin", () => setSel("signin"))}>
            <rect className="ring" x="286" y="132" width="70" height="36" fill={sel === "signin" ? "var(--f-accent)" : "var(--f-panel)"} stroke="var(--f-accent)" />
            <text x="321" y="154" textAnchor="middle" fontSize="11" fill={sel === "signin" ? "var(--f-on-accent)" : "var(--f-ink)"}>Sign-in</text>
          </g>
          <path d="M356 150 H372" stroke="var(--f-accent)" strokeWidth="2" />
          <g {...nodeProps("Shell and launchpad", sel === "shell", () => setSel("shell"))}>
            <rect className="ring" x="372" y="132" width="70" height="36" fill={sel === "shell" ? "var(--f-accent)" : "var(--f-panel)"} stroke="var(--f-accent)" />
            <text x="407" y="154" textAnchor="middle" fontSize="11" fill={sel === "shell" ? "var(--f-on-accent)" : "var(--f-ink)"}>Shell</text>
          </g>
          <text x="496" y="40" fontSize="10" fill="var(--f-dim)">LAUNCHPAD</text>
          {PRODUCTS.map((x, i) => {
            const t = TILE(i);
            const on = sel === x.id;
            const main = nav === "job" ? x.job : x.name;
            const sub = nav === "job" ? x.name : "";
            return (
              <g key={x.id} {...nodeProps(`${main} tile`, on, () => setSel(x.id))}>
                <rect className={`ring ${s.fade}`} x={t.x} y={t.y} width="102" height="50" fill={on ? "var(--f-accent)" : "var(--f-panel)"} stroke={on ? "var(--f-accent)" : "var(--f-line)"} />
                <text x={t.x + 8} y={t.y + 21} fontSize={main.length > 15 ? 8.5 : 10.5} fill={on ? "var(--f-on-accent)" : "var(--f-ink)"}>{main}</text>
                <text x={t.x + 8} y={t.y + 37} fontSize="9" fill={on ? "var(--f-on-accent)" : "var(--f-dim)"}>{sub}</text>
              </g>
            );
          })}
        </g>
      </svg>
    </FlowFrame>
  );
}
