import { Event } from "react-big-calendar";

export type BigCalendarEvent = Omit<Event, "title" | "start"> & {
  title: string;
  start: Date;

  id: string;
};
