import { forwardRef, useEffect, useMemo } from "react";
import {
  Calendar as BigCalendar,
  dayjsLocalizer,
  CalendarProps as BigCalendarProps,
} from "react-big-calendar";
import styles from "./Calendar.module.css";
import clsx from "clsx";
import { BigCalendarEvent } from "@/lib/scheduling";
import { day } from "@/lib/day";

export type CalendarProps = Omit<
  BigCalendarProps<BigCalendarEvent>,
  "localizer"
> & {
  timezone: string;
};

export const Calendar = forwardRef<BigCalendar, CalendarProps>(
  ({ timezone, className, ...props }, ref) => {
    const localizer = useMemo(() => {
      day.tz.setDefault(timezone);
      return dayjsLocalizer(day);
    }, [timezone]);

    return (
      <BigCalendar<BigCalendarEvent>
        startAccessor="start"
        endAccessor="end"
        {...props}
        titleAccessor={(event) =>
          `${event.title} (${day
            .utc(event.start)
            .tz(timezone)
            .format("h:mma")} - ${day
            .utc(event.end)
            .tz(timezone)
            .format("h:mma")})`
        }
        ref={ref as any}
        localizer={localizer}
        className={clsx(styles.root, className)}
      />
    );
  }
);
