import React from 'react';
import { Selection, Transition, TransitionResult } from './types';

const ZERO = '0'.charCodeAt(0);
const NINE = '9'.charCodeAt(0);

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
  return key === ' ';
}

export function isSeparator(event: React.KeyboardEvent<HTMLInputElement>): boolean {
  const { key } = event;
  return key === ':';
}

export function beginTransition(
  event: React.KeyboardEvent<HTMLInputElement> | React.ClipboardEvent<HTMLInputElement>
): Transition | null {
  const { currentTarget } = event;
  const { selectionStart: from, selectionEnd: to, value } = currentTarget;

  if (from === null || to === null) return null;

  let input;
  if ('key' in event) {
    input = event.key;
  } else if ('clipboardData' in event) {
    input = event.clipboardData.getData('text/plain');
  } else {
    return null;
  }

  return {
    input,
    before: Object.freeze({
      value,
      selection: Object.freeze({ from, to })
    })
  };
}

export function finishTransition(
  event: React.UIEvent<HTMLInputElement> | React.ClipboardEvent<HTMLInputElement>,
  transition: TransitionResult
): boolean {
  const { currentTarget: target } = event;
  const { after } = transition;
  const changes =
    target.value !== after.value ||
    target.selectionStart !== after.selection.from ||
    target.selectionEnd !== after.selection.to;
  target.value = after.value;
  target.selectionStart = after.selection.from;
  target.selectionEnd = after.selection.to;

  return changes;
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
