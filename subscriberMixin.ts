// @deno-types="@types/pubsub-js"
import PubSub from "pubsub-js";

export interface BasePubSubClass<T> {
  pushEvent(param: T): void;
}

export interface PubSubMixin<T> {
  subscribe(subFn: (param: T) => void): string;
  unsubscribe(subToken: string): void;
  pushEvent(param: T): void;
}

// deno-lint-ignore no-explicit-any
export function createPubSubMixin<T, TBase extends { new (...args: any[]): BasePubSubClass<T> }>(
  Base: TBase,
  subTopic: string,
) {
  return class extends Base implements PubSubMixin<T> {
    subscribe(subFn: (param: T) => void) {
      return PubSub.subscribe(subTopic, (_, data) => subFn(data));
    }

    unsubscribe(subToken: string) {
      PubSub.unsubscribe(subToken);
    }

    pushEvent(param: T) {
      PubSub.publish(subTopic, param);
    }
  };
}
