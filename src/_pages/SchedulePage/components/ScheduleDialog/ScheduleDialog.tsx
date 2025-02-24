import { day } from "@/lib/day";
import { createCalendarEvent, updateCalendarEvent } from "@/lib/scheduling";
import { CalendarEvent } from "@prisma/client";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { FC, FormEvent, useEffect, useState } from "react";

export type ScheduleDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  calendarEvent?: CalendarEvent;
  timezone: string;
};

export const ScheduleDialog: FC<ScheduleDialogProps> = ({
  open,
  onOpenChange,
  calendarEvent,
  timezone,
}) => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    if (calendarEvent) {
      setTitle(calendarEvent.title);
      setStartDate(
        day.utc(calendarEvent.start).tz(timezone).format("YYYY-MM-DD")
      );
      setStartTime(day.utc(calendarEvent.start).tz(timezone).format("HH:mm"));
      setEndDate(
        calendarEvent.end
          ? day.utc(calendarEvent.end).tz(timezone).format("YYYY-MM-DD")
          : ""
      );
      setEndTime(
        calendarEvent.end
          ? day.utc(calendarEvent.end).tz(timezone).format("HH:mm")
          : ""
      );
    } else {
      reset();
    }
  }, [calendarEvent, timezone]);

  const reset = () => {
    setTitle("");
    setStartDate(day.utc().tz(timezone).format("YYYY-MM-DD"));
    setStartTime(day.utc().tz(timezone).format("HH:mm"));
    setEndDate("");
    setEndTime("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      if (calendarEvent) {
        await updateCalendarEvent(
          {
            id: calendarEvent.id,
            title,
            startDate,
            startTime,
            endDate,
            endTime,
            timezone,
          },
          "/"
        );
      } else {
        await createCalendarEvent(
          {
            title,
            startDate,
            startTime,
            endDate,
            endTime,
            timezone,
          },
          "/"
        );
      }
      reset();
      onOpenChange(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          reset();
        }
        onOpenChange(open);
      }}
    >
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>
          {calendarEvent ? "Edit event" : "Create event"}
        </Dialog.Title>
        <Dialog.Description size="2" mb="4">
          {calendarEvent
            ? "Edit the details of the event"
            : "Fill in the details of the event"}
        </Dialog.Description>

        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Event title
              </Text>
              <TextField.Root
                name="title"
                placeholder="Event title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Start date
              </Text>
              <TextField.Root
                name="startDate"
                type="date"
                placeholder="Start date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Start time
              </Text>
              <TextField.Root
                name="startTime"
                type="time"
                placeholder="Start time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                End date
              </Text>
              <TextField.Root
                name="endDate"
                type="date"
                placeholder="End date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                End time
              </Text>
              <TextField.Root
                name="endTime"
                type="time"
                placeholder="End time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </label>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Button loading={loading} type="submit">
              Save
            </Button>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};
