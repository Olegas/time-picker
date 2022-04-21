import { Transition, TransitionResult } from './types';
import { cursor, untouched } from './util';
import { predictorTransition } from './predictorTransition';
import { inputTransition } from './inputTransition';

const reNumbers = /\d{1,2}(?::?\d{1,2})?/;

export function pasteTransition(transition: Transition): TransitionResult {
  const { input } = transition;
  const numbersWithSeparator = input.match(reNumbers);
  if (numbersWithSeparator) {
    const match = numbersWithSeparator[0].replace(':', '');
    const { before: result } = match.split('').reduce(
      (result: Transition, char) => {
        result.input = char;
        const { after } = predictorTransition(inputTransition(result));
        return {
          input: char,
          before: after
        };
      },
      {
        ...transition,
        before: {
          ...transition.before,
          selection: cursor(transition.before.selection.from)
        }
      }
    );
    return {
      ...transition,
      after: result
    };
  }

  return untouched(transition);
}
