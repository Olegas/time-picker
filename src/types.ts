export interface Selection {
  from: number;
  to: number;
}

export interface TransitionResult {
  value: string;
  selection: Selection;
}
