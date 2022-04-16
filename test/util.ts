import { inputTransition } from "../src/inputTransition";
import { Selection } from "../src/types";
import { predictorTransition } from "../src/predictorTransition";

function parseSelection(line: string): Selection {
  const from = line.indexOf("|");
  const nextLine = line.replace(/\|/, "");
  const to = nextLine.indexOf("|");
  return {
    from,
    to: to === -1 ? from : to
  };
}

function stripCursorMarkers(line: string): string {
  return line.replace(/\|/g, "");
}

/**
 * |10:00+2=2|0:00
 * @param definition
 */
export function createInputTestCase(definition: string): void {
  const [action, result] = definition.split("=");
  const [fieldState, input] = action.split("+");
  const selection = parseSelection(fieldState);
  const transitionResult = {
    selection: parseSelection(result),
    value: stripCursorMarkers(result)
  };
  const textValue = stripCursorMarkers(fieldState);
  it(definition, () => {
    expect(
      inputTransition({
        input,
        before: {
          value: textValue,
          selection
        }
      }).after
    ).toEqual(transitionResult);
  });
}

export function createPredictorTransitionTestCase(definition: string): void {
  const [from, ...to] = definition.split("=");
  const [currentValue, input] = from.split("+");
  const selectionBefore = parseSelection(from);

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
          selection: selectionBefore
        },
        after: {
          selection: parseSelection(to[0]),
          value: stripCursorMarkers(to[0])
        }
      }).after
    ).toEqual(transitionResult);
  });
}
