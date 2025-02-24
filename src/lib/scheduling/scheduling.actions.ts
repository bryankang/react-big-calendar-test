"use server";

import { revalidatePath } from "next/cache";
import { day } from "../day";
import { prisma } from "../prisma";

export const createCalendarEvent = async (
  {
    title,
    startDate,
    startTime,
    endDate,
    endTime,
    timezone,
  }: {
    title: string;
    startDate: string;
    startTime: string;
    endDate?: string;
    endTime?: string;
    timezone: string;
  },
  path: string
) => {
  const start = day.tz(`${startDate} ${startTime}`, timezone).toISOString();
  const end =
    endDate && endTime
      ? day.tz(`${endDate} ${endTime}`, timezone).toISOString()
      : undefined;

  const calendarEvent = await prisma.calendarEvent.create({
    data: {
      title,
      start,
      end,
    },
  });

  revalidatePath(path);

  return {
    data: calendarEvent,
    error: "",
  };
};

export const updateCalendarEvent = async (
  {
    id,
    title,
    startDate,
    startTime,
    endDate,
    endTime,
    timezone,
  }: {
    id: string;
    title: string;
    startDate: string;
    startTime: string;
    endDate?: string;
    endTime?: string;
    timezone: string;
  },
  path: string
) => {
  const start = day.tz(`${startDate} ${startTime}`, timezone).toISOString();
  const end =
    endDate && endTime
      ? day.tz(`${endDate} ${endTime}`, timezone).toISOString()
      : undefined;

  const calendarEvent = await prisma.calendarEvent.update({
    where: {
      id: id,
    },
    data: {
      title,
      start,
      end,
    },
  });

  revalidatePath(path);

  return {
    data: calendarEvent,
    error: "",
  };
};
