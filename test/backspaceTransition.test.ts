import { createBackspaceTransitionTestCase } from './util';

describe('baskspaceTransition', () => {
  createBackspaceTransitionTestCase('12:33|<-=12:3| ');
  createBackspaceTransitionTestCase('12:3| <-=12|:  ');
  createBackspaceTransitionTestCase('12|:  <-=1| :  ');
  createBackspaceTransitionTestCase('1| :  <-=|  :  ');
  createBackspaceTransitionTestCase('|  :  <-=|  :  ');

  createBackspaceTransitionTestCase('|12:33<-=|12:33');
});
