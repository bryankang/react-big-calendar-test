import { CalendarEvent } from "@prisma/client";
import { BigCalendarEvent } from "./scheduling.types";

export const convertCalendarEventToBigCalendarEvent = (
  event: CalendarEvent
): BigCalendarEvent => {
  return {
    title: event.title,
    start: event.start,
    end: event.end ?? undefined,
    allDay: event.allDay,

    id: event.id,
  };
};

export const convertCalendarEventsToBigCalendarEvents = (
  events: CalendarEvent[]
): BigCalendarEvent[] => {
  return events.map((event) => convertCalendarEventToBigCalendarEvent(event));
};

export const convertBigCalendarEventToCalendarEvent = (
  event: BigCalendarEvent
): CalendarEvent => {
  return {
    title: event.title,
    start: event.start,
    end: event.end ?? null,
    allDay: !!event.allDay,

    id: event.id,
  };
};
