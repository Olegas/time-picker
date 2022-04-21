import { createPasteTransitionTestCase } from './util';

describe('pasteTransition', () => {
  createPasteTransitionTestCase('|12:33+someletters=|12:33');
  createPasteTransitionTestCase('|12:33+2244=22:44|');
  createPasteTransitionTestCase('|12:33+22:44=22:44|');
  createPasteTransitionTestCase('1|2:33+11:00=11:10|');
  createPasteTransitionTestCase('|12:00+22=22:|00');
  createPasteTransitionTestCase('12:00|+22=12:00|');
});
