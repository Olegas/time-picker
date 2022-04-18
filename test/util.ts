import { inputTransition } from '../src/inputTransition';
import { Selection } from '../src/types';
import { predictorTransition } from '../src/predictorTransition';
import { pasteTransition } from '../src/pasteTransition';
import { backspaceTransition } from '../src/backspaceTransition';

function parseSelection(line: string): Selection {
  const from = line.indexOf('|');
  const nextLine = line.replace(/\|/, '');
  const to = nextLine.indexOf('|');
  return {
    from,
    to: to === -1 ? from : to
  };
}

function stripCursorMarkers(line: string): string {
  return line.replace(/\|/g, '');
}

/**
 * |10:00+2=2|0:00
 * @param definition
 */
export function createInputTestCase(definition: string): void {
  const [action, result] = definition.split('=');
  const [fieldState, input] = action.split('+');
  const transitionResult = {
    selection: parseSelection(result),
    value: stripCursorMarkers(result)
  };
  it(definition, () => {
    expect(
      inputTransition({
        input,
        before: {
          value: stripCursorMarkers(fieldState),
          selection: parseSelection(fieldState)
        }
      }).after
    ).toEqual(transitionResult);
  });
}

export function createPredictorTransitionTestCase(definition: string): void {
  const [from, ...to] = definition.split('=');
  const [currentValue, input] = from.split('+');
  const transitionResult = {
    selection: parseSelection(to[1]),
    value: stripCursorMarkers(to[1])
  };
  it(definition, () => {
    expect(
      predictorTransition({
        input,
        before: {
          value: stripCursorMarkers(currentValue),
          selection: parseSelection(from)
        },
        after: {
          selection: parseSelection(to[0]),
          value: stripCursorMarkers(to[0])
        }
      }).after
    ).toEqual(transitionResult);
  });
}

export function createPasteTransitionTestCase(definition: string) {
  const [before, after] = definition.split('=');
  const [fieldState, input] = before.split('+');
  it(definition, () => {
    expect(
      pasteTransition({
        input,
        before: {
          value: stripCursorMarkers(fieldState),
          selection: parseSelection(fieldState)
        }
      }).after
    ).toEqual({
      selection: parseSelection(after),
      value: stripCursorMarkers(after)
    });
  });
}

export function createBackspaceTransitionTestCase(definition: string): void {
  const [before, after] = definition.split('=');
  const fieldState = before.replace('<-', '');
  const selection = parseSelection(fieldState);
  const textValue = stripCursorMarkers(fieldState);
  const transitionResult = {
    selection: parseSelection(after),
    value: stripCursorMarkers(after)
  };
  it(definition, () => {
    expect(
      backspaceTransition({
        input: 'Backspace',
        before: {
          value: textValue,
          selection
        }
      }).after
    ).toEqual(transitionResult);
  });
}
