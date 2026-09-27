export type UnlockRequest = { slug: string; title: string; trigger?: HTMLElement };

const EVENT = "er:open-unlock";

export function openUnlock(detail: UnlockRequest) {
  window.dispatchEvent(new CustomEvent<UnlockRequest>(EVENT, { detail }));
}

export function onOpenUnlock(fn: (r: UnlockRequest) => void) {
  const handler = (e: Event) => fn((e as CustomEvent<UnlockRequest>).detail);
  window.addEventListener(EVENT, handler);
  return () => window.removeEventListener(EVENT, handler);
}
