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
  }: {
    title: string;
    startDate: string;
    startTime: string;
    endDate?: string;
    endTime?: string;
  },
  path: string
) => {
  const start = day(`${startDate} ${startTime}`).toISOString();
  const end =
    endDate && endTime ? day(`${endDate} ${endTime}`).toISOString() : undefined;

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
  }: {
    id: string;
    title: string;
    startDate: string;
    startTime: string;
    endDate?: string;
    endTime?: string;
  },
  path: string
) => {
  const start = day(`${startDate} ${startTime}`).toISOString();
  const end =
    endDate && endTime ? day(`${endDate} ${endTime}`).toISOString() : undefined;

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
