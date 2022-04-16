import React, { ChangeEvent, useCallback } from "react";
import { inputTransition } from "./inputTransition";
import {
  isControlKeys,
  isControlModifiers,
  isNumeric,
  isSeparator,
  isSpace,
  withInputModifiers,
  withoutAnyModifiers
} from "./util";
import { changeTransition } from "./changeTransition";
import { predictorTransition } from "./predictorTransition";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function TimePicker() {
  const keyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    const { currentTarget, key } = event;
    const { selectionStart: from, selectionEnd: to, value } = currentTarget;

    // Haw can it be?
    if (from === null || to === null) return;

    if (isSeparator(event)) {
      // TODO support separator
      event.preventDefault();
    } else if (withoutAnyModifiers(event) && isNumeric(event)) {
      let result = inputTransition(value, { from, to }, key);
      result = predictorTransition(result.value, result.selection, key);
      currentTarget.value = result.value;
      currentTarget.selectionStart = result.selection.from;
      currentTarget.selectionEnd = result.selection.to;
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
