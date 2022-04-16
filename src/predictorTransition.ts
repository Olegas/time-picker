import { Selection, TransitionResult } from "./types";

export function predictorTransition(value: string, selection: Selection, input: string): TransitionResult {
  const [h, m] = value.split(":");
  let newValue = value;
  if (+h > 24) {
    if (+input > 2) {
      return {
        value: `${input.padStart(2, "0")}:${m}`,
        selection: {
          from: 3,
          to: 3
        }
      };
    }
    newValue = `24:${m}`;
  } else if (+input > 2) {
    return {
      value: `${input.padStart(2, "0")}:${m}`,
      selection: {
        from: 3,
        to: 3
      }
    };
  } else if (+m > 59) {
    return {
      value: `${h}:${input.padStart(2, "0")}`,
      selection: {
        from: 5,
        to: 5
      }
    };
  }
  return {
    value: newValue,
    selection
  };
}
