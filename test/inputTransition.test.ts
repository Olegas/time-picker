import { createInputTestCase } from './util';

describe('Input transition', () => {
  createInputTestCase('|+1=1| :  ');
  createInputTestCase('1| :  +2=12:|  ');
  createInputTestCase('12|:  +3=12:3| ');
  createInputTestCase('12:3| +4=12:34|');
  createInputTestCase('12:34|+5=12:34|');

  createInputTestCase('|12:34|+5=5| :  ');
  createInputTestCase('1|2:3|4+5=15:| 4');
  createInputTestCase('|12|:34+5=5| :34');
  createInputTestCase('12:|34|+5=12:5| ');
});
