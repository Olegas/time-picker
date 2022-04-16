import { createPredictorTransitionTestCase } from "./util";

describe("predictorTransition", () => {
  createPredictorTransitionTestCase("2|5:58+2=2|4:58");
  createPredictorTransitionTestCase("12:9|3+9=12:09|");
  createPredictorTransitionTestCase("3|2:30+3=03:|30");
  createPredictorTransitionTestCase("9| :  +9=09:|  ");
  createPredictorTransitionTestCase("09:9|1+9=09:09|");
});
