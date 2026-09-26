"use client";

import { AnimatePresence, animate, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import styles from "./gap-demo.module.css";

const THUMB_X = 20;
const UNDO_SECONDS = 8;
const RING_R = 12;
const RING_CIRC = 2 * Math.PI * RING_R;

const MEMBER = {
  name: "Maya Chen",
  role: "Billing admin",
  detail: "Exports invoices · Last seen 2h ago",
  initials: "MC",
};

type Phase = "idle" | "pending" | "gone";

export default function GapDemo() {
  const reduceMotion = useReducedMotion();
  const [live, setLive] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [secondsLeft, setSecondsLeft] = useState(UNDO_SECONDS);
  const removeRef = useRef<HTMLButtonElement>(null);
  const undoRef = useRef<HTMLButtonElement>(null);
  const goneRef = useRef<HTMLDivElement>(null);
  const restored = useRef(false);
  const progress = useMotionValue(0);
  const dashOffset = useTransform(progress, [0, 1], [0, RING_CIRC]);

  const spring = reduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 520, damping: 34, mass: 0.7 };
  const thumbSpring = reduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 560, damping: 28, mass: 0.55 };
  const swap = reduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 480, damping: 36, mass: 0.8 };

  useMotionValueEvent(progress, "change", (value) => {
    const next = Math.max(1, Math.ceil((1 - value) * UNDO_SECONDS));
    setSecondsLeft(next);
  });

  useEffect(() => {
    if (phase !== "pending") return;
    progress.set(0);
    setSecondsLeft(UNDO_SECONDS);
    const playback = animate(progress, 1, {
      duration: UNDO_SECONDS,
      ease: "linear",
      onComplete: () => {
        restored.current = false;
        setPhase("gone");
      },
    });
    return () => playback.stop();
  }, [phase, progress]);

  useEffect(() => {
    if (!live) return;
    if (phase === "pending") {
      undoRef.current?.focus();
      return;
    }
    if (phase === "gone") {
      goneRef.current?.focus();
      return;
    }
    if (phase === "idle" && restored.current) {
      removeRef.current?.focus();
    }
  }, [phase, live]);

  const setMode = (next: boolean) => {
    restored.current = false;
    setPhase("idle");
    progress.set(0);
    setSecondsLeft(UNDO_SECONDS);
    setLive(next);
  };

  const onRemove = () => {
    if (!live || phase !== "idle") return;
    restored.current = false;
    setPhase("pending");
  };

  const onUndo = () => {
    if (phase !== "pending") return;
    restored.current = true;
    setPhase("idle");
    progress.set(0);
    setSecondsLeft(UNDO_SECONDS);
  };

  const livePhase = live ? phase : "idle";

  const hint = !live
    ? "A static wireframe."
    : livePhase === "pending"
      ? "Eight seconds. Then it’s committed."
      : livePhase === "gone"
        ? "The seat is empty. Flip to Figma to reset."
        : "Remove her access. You get a window to take it back.";

  const status =
    livePhase === "pending"
      ? "Access revoked. Undo available."
      : livePhase === "gone"
        ? "Access removed."
        : restored.current
          ? "Access restored."
          : "";

  return (
    <figure className={styles.root} aria-label="Interactive specimen. Toggle between a Figma wireframe and a React component.">
      <div className={styles.chrome}>
        <div className={styles.mark}>
          <i className={styles.dot} aria-hidden />
          <div>
            <h3>Gap</h3>
            <p>A static frame. Then a control you can take back.</p>
          </div>
        </div>
      </div>

      <div className={styles.stage}>
        <motion.div
          className={styles.object}
          style={{ width: "100%" }}
          animate={{ paddingTop: live ? 0 : 28 }}
          transition={spring}
        >
          <AnimatePresence>
            {live ? null : (
              <motion.div
                key="figma-chrome"
                className={styles.figma}
                aria-hidden
                initial={false}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={spring}
              >
                <span className={styles.figmaBar}>Row · Auto layout</span>
                <i className={styles.handle} data-pos="tl" />
                <i className={styles.handle} data-pos="tr" />
                <i className={styles.handle} data-pos="bl" />
                <i className={styles.handle} data-pos="br" />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            className={styles.card}
            data-live={live}
            data-phase={livePhase}
            style={{ width: "100%" }}
            layout
            transition={swap}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {livePhase === "gone" ? (
                <motion.div
                  key="gone"
                  ref={goneRef}
                  tabIndex={-1}
                  className={styles.gone}
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                  transition={swap}
                >
                  <p className={styles.goneKicker}>Removed</p>
                  <p className={styles.goneCopy}>
                    {MEMBER.name} no longer has billing. Nothing to take back.
                  </p>
                </motion.div>
              ) : livePhase === "pending" ? (
                <motion.div
                  key="pending"
                  className={styles.undo}
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                  transition={swap}
                >
                  <span className={styles.ring} aria-hidden>
                    <svg viewBox="0 0 32 32">
                      <circle className={styles.ringTrack} cx="16" cy="16" r={RING_R} />
                      <motion.circle
                        className={styles.ringValue}
                        cx="16"
                        cy="16"
                        r={RING_R}
                        style={{ strokeDasharray: RING_CIRC, strokeDashoffset: dashOffset }}
                      />
                    </svg>
                    <span className={styles.ringCount}>{secondsLeft}</span>
                  </span>
                  <div className={styles.undoCopy}>
                    <p className={styles.undoTitle}>Access revoked</p>
                    <p className={styles.undoDetail}>
                      Maya loses billing. Seat frees at midnight.
                    </p>
                  </div>
                  <motion.button
                    ref={undoRef}
                    type="button"
                    className={styles.undoBtn}
                    onClick={onUndo}
                    whileHover={reduceMotion ? undefined : { y: -1 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                    transition={spring}
                  >
                    Undo
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  className={styles.row}
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                  transition={swap}
                >
                  <span className={styles.avatar} aria-hidden>
                    {live ? MEMBER.initials : ""}
                  </span>
                  <div className={styles.identity}>
                    <p className={styles.name}>{live ? MEMBER.name : "Member name"}</p>
                    <p className={styles.role}>{live ? MEMBER.role : "Role"}</p>
                    <p className={styles.detail}>{live ? MEMBER.detail : "Supporting text"}</p>
                  </div>
                  {live ? (
                    <motion.button
                      ref={removeRef}
                      type="button"
                      className={styles.remove}
                      aria-label={`Remove ${MEMBER.name}'s billing access`}
                      onClick={onRemove}
                      whileHover={reduceMotion ? undefined : { y: -1 }}
                      whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                      transition={spring}
                    >
                      Remove
                    </motion.button>
                  ) : (
                    <span className={styles.remove} aria-hidden>
                      Delete
                    </span>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
            <motion.div className={styles.wash} initial={false} animate={{ opacity: live ? 0 : 0.5 }} transition={spring} />
          </motion.div>
        </motion.div>
      </div>

      <p className={styles.srOnly} aria-live="polite" aria-atomic="true">
        {status}
      </p>

      <div className={styles.toggleWrap}>
        <div className={styles.toggle}>
          <button type="button" className={styles.toggleWord} data-on={!live} onClick={() => setMode(false)}>
            Figma
          </button>
          <button
            type="button"
            className={styles.toggleTrack}
            data-on={live}
            role="switch"
            aria-checked={live}
            aria-label="React component"
            onClick={() => setMode(!live)}
          >
            <motion.span
              className={styles.toggleThumb}
              initial={false}
              animate={{ x: live ? THUMB_X : 0 }}
              transition={thumbSpring}
            />
          </button>
          <button type="button" className={styles.toggleWord} data-on={live} onClick={() => setMode(true)}>
            React
          </button>
        </div>
        <p className={styles.hint}>{hint}</p>
      </div>
    </figure>
  );
}
