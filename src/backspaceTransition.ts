import { Transition, TransitionResult } from './types';
import { cursor, untouched } from './util';

export function backspaceTransition(transition: Transition): TransitionResult {
  const { before, input } = transition;
  const {
    value,
    selection: { from }
  } = before;

  if (!value || from === 0 || input !== 'Backspace') return untouched(transition);
  return {
    ...transition,
    after: {
      value: value.slice(0, from - 1) + ' ' + value.slice(from),
      selection: cursor(from - (from === 4 ? 2 : 1))
    }
  };
}
