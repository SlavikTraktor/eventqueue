import { Event } from "./event.ts";
import { BasePubSubClass, PubSubMixin, createPubSubMixin } from "./subscriberMixin.ts";
import { TimerIstance } from "./timer.ts";
import { getUnixTime } from "date-fns";

type PubSubParam = Event[];

class _Queue implements BasePubSubClass<PubSubParam> {
  private upcomingEvents: Event[] = [];
  private timerSubToken?: string;
  constructor(private readonly timer: TimerIstance) {}

  public start() {
    this.timerSubToken = this.timer.subscribe(this.cycle.bind(this));
  }

  pushEvent(_: PubSubParam) {}

  public stop() {
    this.timerSubToken && this.timer.unsubscribe(this.timerSubToken);
    this.timerSubToken = undefined;
  }

  public cycle(nowDate: Date) {
    const eventsAppeared = this.upcomingEvents.filter((v) => v.start <= getUnixTime(nowDate));

    eventsAppeared.length && this.pushEvent(eventsAppeared);
    this.upcomingEvents = this.upcomingEvents.filter((v) => v.start > getUnixTime(nowDate));
  }

  public addEvent(event: Event) {
    this.upcomingEvents.push(event);
  }

  public addEvents(event: Event[]) {
    this.upcomingEvents.push(...event);
  }

  public getUpcomingEvents() {
    return this.upcomingEvents;
  }
}

export interface QueueIstance extends _Queue, PubSubMixin<PubSubParam> {}
export const Queue = createPubSubMixin<PubSubParam, typeof _Queue>(_Queue, "queue_topic");
