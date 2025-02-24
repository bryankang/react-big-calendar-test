import { SchedulePage } from "@/_pages/SchedulePage";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const events = await prisma.calendarEvent.findMany();

  return <SchedulePage events={events} />;
}
