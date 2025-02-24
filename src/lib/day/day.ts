import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import localeData from "dayjs/plugin/localeData";
import isBetween from "dayjs/plugin/isBetween";
import dayjs from "dayjs";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localeData);
dayjs.extend(isBetween);

export const day = dayjs;
