import { addMinutes, format } from "date-fns";
import { BasePubSubClass, PubSubMixin, createPubSubMixin } from "./subscriberMixin.ts";

type PubSubParam = Date;

class _Timer implements BasePubSubClass<PubSubParam> {
  private time: Date;
  private interval?: number;
  constructor(date?: Date) {
    this.time = date || new Date(1960, 6, 2, 19, 2);
  }

  pushEvent(_: PubSubParam): void {}

  public start() {
    this.interval = setInterval(() => {
      this.time = addMinutes(this.time, 1);
      console.log(format(this.time, "Y-M-d HH:mm"));
      this.pushEvent(this.time);
    }, 1000);
  }

  public getCurrentTime() {
    return this.time;
  }

  public stop() {
    clearInterval(this.interval);
  }
}

export interface TimerIstance extends _Timer, PubSubMixin<PubSubParam> {}
export const Timer = createPubSubMixin<PubSubParam, typeof _Timer>(_Timer, "timer_topic");
