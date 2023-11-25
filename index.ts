import { Queue } from "./queue.ts";
import { Timer } from "./timer.ts";
import { getUnixTime } from "date-fns";

const timer = new Timer();
const queue = new Queue(timer);
queue.start();

queue.addEvents([
  {
    id: 1,
    start: getUnixTime(new Date(1960, 6, 2, 19, 7)),
    factor: 1,
    regions: [1, 3],
  },
  {
    id: 2,
    start: getUnixTime(new Date(1960, 6, 2, 19, 4)),
    factor: 5,
    regions: [1, 2],
  },
]);

queue.subscribe((events) => {
  console.log(events[0].id);
});

timer.start();
