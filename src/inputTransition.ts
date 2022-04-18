import { Transition, TransitionResult } from './types';
import { cursor, untouched } from './util';

export function inputTransition(transition: Transition): TransitionResult {
  const { before, input } = transition;
  const { value, selection } = before;

  if (selection.from >= 5) {
    return untouched(transition);
  }

  const valueWithSelectionCleared =
    value.slice(0, selection.from) +
    value.slice(selection.from, selection.to).replace(/\d/g, ' ') +
    value.slice(selection.to);

  let { from } = selection;
  let [h = '', m = ''] = valueWithSelectionCleared.split(':');
  h = h.padEnd(2, ' ');
  m = m.padEnd(2, ' ');
  let newValue: string;
  if (from >= 2) {
    if (from === 2) from++;
    const digits = m.split('').map((v) => (v === undefined ? '' : v));
    const changePoint = from - 3;
    digits[changePoint] = input;
    newValue = `${h}:${digits.join('')}`;
  } else {
    const digits = h.split('').map((v) => (v === undefined ? '' : v));
    digits[from] = input;
    newValue = `${digits.join('')}:${m}`;
  }

  from += from === 1 ? 2 : 1;
  return {
    ...transition,
    after: {
      value: newValue,
      selection: cursor(from)
    }
  };
}
