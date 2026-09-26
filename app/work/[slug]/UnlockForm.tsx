"use client";

import { useActionState } from "react";
import { unlock, type UnlockState } from "../actions";

export function UnlockForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState<UnlockState, FormData>(unlock, {});

  return (
    <form action={action} className="unlock">
      <input type="hidden" name="next" value={next} />
      <label htmlFor="password" className="unlock-label">
        Password
      </label>
      <div className="unlock-row">
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          aria-invalid={state.error ? true : undefined}
          aria-describedby={state.error ? "unlock-error" : undefined}
        />
        <button type="submit" disabled={pending}>
          {pending ? "Checking" : "Unlock"}
        </button>
      </div>
      {state.error ? (
        <p id="unlock-error" className="unlock-error" role="alert">
          {state.error}
        </p>
      ) : null}
    </form>
  );
}
