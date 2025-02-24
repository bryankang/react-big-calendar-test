"use client";

import { ScheduleDialog } from "@/_pages/SchedulePage/components/ScheduleDialog";
import { Calendar } from "@/components/Calendar";
import {
  BigCalendarEvent,
  convertBigCalendarEventToCalendarEvent,
  convertCalendarEventsToBigCalendarEvents,
} from "@/lib/scheduling";
import { CalendarEvent } from "@prisma/client";
import { Button, Flex } from "@radix-ui/themes";
import { FC, useMemo, useState } from "react";
import styles from "./SchedulePage.module.css";
import { TimezoneSelect } from "./components/TimezoneSelect/TimezoneSelect";

export type SchedulePageProps = {
  events: CalendarEvent[];
};

export const SchedulePage: FC<SchedulePageProps> = ({ events: _events }) => {
  const [timezone, setTimezone] = useState("America/New_York");
  const events = useMemo(() => {
    return convertCalendarEventsToBigCalendarEvents(_events);
  }, [_events]);
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [selectedCalendarEvent, setSelectedCalendarEvent] = useState<
    CalendarEvent | undefined
  >(undefined);

  const handleCreateEvent = () => {
    setSelectedCalendarEvent(undefined);
    setScheduleDialogOpen(true);
  };

  const handleSelectEvent = (calendarEvent: BigCalendarEvent) => {
    setSelectedCalendarEvent(
      convertBigCalendarEventToCalendarEvent(calendarEvent, timezone)
    );
    setScheduleDialogOpen(true);
  };

  return (
    <>
      <Flex direction="column" width="100dvw" height="100vh">
        <Flex
          align="center"
          justify="end"
          gap="2"
          p="2"
          className={styles.header}
        >
          <TimezoneSelect value={timezone} onValueChange={setTimezone} />
          <Button onClick={handleCreateEvent}>Create event</Button>
        </Flex>
        <Flex flexGrow="1" flexBasis="0" p="2">
          <Calendar
            timezone={timezone}
            events={events}
            onSelectEvent={handleSelectEvent}
          />
        </Flex>
      </Flex>
      <ScheduleDialog
        open={scheduleDialogOpen}
        onOpenChange={setScheduleDialogOpen}
        calendarEvent={selectedCalendarEvent}
        timezone={timezone}
      />
    </>
  );
};
