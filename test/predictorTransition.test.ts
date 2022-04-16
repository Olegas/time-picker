import { createPredictorTransitionTestCase } from "./util";

describe("predictorTransition", () => {
  createPredictorTransitionTestCase("|15:58+2=2|5:58=2|4:58");
  createPredictorTransitionTestCase("12:|33+9=12:9|3=12:09|");
  createPredictorTransitionTestCase("|22:30+3=3|2:30=03:|30");
  createPredictorTransitionTestCase("|  :  +9=9| :  =09:|  ");
  createPredictorTransitionTestCase(" | :  +9= 9:|  =09:|  ");
  createPredictorTransitionTestCase(" | :  +1=1| :  =1| :  ");
  createPredictorTransitionTestCase("1| :  +3=13:|  =13:|  ");

  createPredictorTransitionTestCase("09:|11+9=09:9|1=09:09|");
  createPredictorTransitionTestCase("09:|11+6=09:6|1=09:06|");
  createPredictorTransitionTestCase("09:|11+5=09:5|1=09:5|1");

  createPredictorTransitionTestCase("09:1|1+5=09:15|=09:15|");

  createPredictorTransitionTestCase("2|2:11+9=29:|11=24:|11");
});
