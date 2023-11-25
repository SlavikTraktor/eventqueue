export type RegionId = string | number;
export type EventId = string | number;

export interface Event {
  id: EventId;
  name?: string;
  start: number;
  end?: number | null;
  factor: number;
  regions: RegionId[];
  meta?: any;
}
