import { TransitionResult, Transition } from "./types";
import { cursor, untouched } from "./util";

export function predictorTransition(transition: Transition): TransitionResult {
  const { before, after, input } = transition;

  if (after === undefined) return untouched(transition);

  const { selection } = before;
  const { value } = after;
  const { from } = selection;
  const [h, m] = value.split(":");

  if (from < 2) {
    // Hours are changed
    if (+h > 24) {
      if (from === 0) {
        if (+input >= 3) {
          return {
            ...transition,
            after: {
              value: `0${input}:${m}`,
              selection: cursor(3)
            }
          };
        }
        return {
          ...transition,
          after: {
            value: `24:${m}`,
            selection: cursor(1)
          }
        };
      } else {
        return {
          ...transition,
          after: {
            value: `24:${m}`,
            selection: cursor(3)
          }
        };
      }
    } else {
      if (+input > 2 && (h[0] === " " || from === 0)) {
        return {
          ...transition,
          after: {
            value: `0${input}:${m}`,
            selection: cursor(3)
          }
        };
      }
    }
  } else if (from >= 3) {
    // Minutes are changed
    if (from === 3) {
      if (+input >= 6) {
        return {
          ...transition,
          after: {
            value: `${h}:0${input}`,
            selection: cursor(5)
          }
        };
      }
    }
  }

  return untouched(transition);
}
