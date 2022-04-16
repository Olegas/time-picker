export interface Selection {
  from: number;
  to: number;
}

interface State {
  value: string;
  selection: Selection;
}

export interface Transition {
  input: string;
  before: Readonly<State>;
  after?: State;
}

export interface TransitionResult extends Transition {
  after: State;
}
