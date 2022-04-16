import React from "react";

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
