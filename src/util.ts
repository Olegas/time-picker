import React from "react";
import { Selection, Transition, TransitionResult } from "./types";

const ZERO = "0".charCodeAt(0);
const NINE = "9".charCodeAt(0);

export function withoutAnyModifiers(event: React.KeyboardEvent<HTMLInputElement>) {
  const { ctrlKey, altKey, shiftKey, metaKey } = event;
  return !(ctrlKey || altKey || shiftKey || metaKey);
}

export function isNumeric(event: React.KeyboardEvent<HTMLInputElement>): boolean {
  const { key } = event;
  const code = key.charCodeAt(0);
  return ZERO <= code && code <= NINE;
}

export function withInputModifiers(event: React.KeyboardEvent<HTMLInputElement>): boolean {
  const { shiftKey, altKey } = event;
  return shiftKey || altKey;
}

export function isControlModifiers(event: React.KeyboardEvent<HTMLInputElement>): boolean {
  const { ctrlKey } = event;
  return ctrlKey;
}

export function isControlKeys(event: React.KeyboardEvent<HTMLInputElement>): boolean {
  const { code, key } = event;
  return code === key;
}

export function isSpace(event: React.KeyboardEvent<HTMLInputElement>): boolean {
  const { key } = event;
  return key === " ";
}

export function isSeparator(event: React.KeyboardEvent<HTMLInputElement>): boolean {
  const { key } = event;
  return key === ":";
}

export function beginTransition(event: React.KeyboardEvent<HTMLInputElement>): Transition | null {
  const { currentTarget, key } = event;
  const { selectionStart: from, selectionEnd: to, value } = currentTarget;

  if (from === null || to === null) return null;

  return {
    input: key,
    before: Object.freeze({
      value,
      selection: Object.freeze({ from, to })
    })
  };
}

export function finishTransition(event: React.KeyboardEvent<HTMLInputElement>, transition: TransitionResult): void {
  const { currentTarget: target } = event;
  const { after } = transition;
  target.value = after.value;
  target.selectionStart = after.selection.from;
  target.selectionEnd = after.selection.to;
}

export function cursor(pos: number): Selection {
  return {
    from: pos,
    to: pos
  };
}

export function untouched(transition: Transition): TransitionResult {
  return {
    ...transition,
    after: transition.after || transition.before
  };
}
