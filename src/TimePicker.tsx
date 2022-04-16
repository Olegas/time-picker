import React, { useCallback } from "react";
import { inputTransition } from "./inputTransition";
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
} from "./util";
import { predictorTransition } from "./predictorTransition";

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
      return;
    } else if (withInputModifiers(event) || isSpace(event)) {
      event.preventDefault();
    }
  }, []);

  const paste = useCallback((event: React.ClipboardEvent<HTMLInputElement>) => {
    const { clipboardData, currentTarget } = event;
    const match = /(\d\d?):(\d\d?)/.exec(clipboardData.getData("text/plain"));
    if (match) {
      const [_, h, m] = match;
      if (+h <= 24 && +m <= 59) {
        currentTarget.value = `${h.padStart(2, "0")}:${m.padStart(2, "0")}`;
      }
    }
    event.preventDefault();
  }, []);

  return <input onKeyDown={keyDown} onPaste={paste} />;
}
