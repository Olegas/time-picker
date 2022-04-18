import React, { useCallback } from 'react';
import { inputTransition } from './inputTransition';
import {
  beginTransition,
  finishTransition,
  isControlKeys,
  isControlModifiers,
  isNumeric,
  isSeparator,
  isSpace,
  withInputModifiers,
  withoutAnyModifiers
} from './util';
import { predictorTransition } from './predictorTransition';
import { pasteTransition } from './pasteTransition';
import { backspaceTransition } from "./backspaceTransition";

export default function TimePicker() {
  const keyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (isSeparator(event)) {
      // TODO support separator
      event.preventDefault();
    } else if (withoutAnyModifiers(event) && isNumeric(event)) {
      const transition = beginTransition(event);
      if (transition === null) return;
      finishTransition(event, predictorTransition(inputTransition(transition)));
      event.preventDefault();
    } else if (isControlKeys(event) || isControlModifiers(event)) {
      const transition = beginTransition(event);
      if (transition === null) return;
      if (finishTransition(event, backspaceTransition(transition))) {
        event.preventDefault();
      }
      return;
    } else if (withInputModifiers(event) || isSpace(event)) {
      event.preventDefault();
    }
  }, []);

  const paste = useCallback((event: React.ClipboardEvent<HTMLInputElement>) => {
    const transition = beginTransition(event);
    if (transition === null) return;
    finishTransition(event, pasteTransition(transition));
    event.preventDefault();
  }, []);

  return <input onKeyDown={keyDown} onPaste={paste} />;
}
