import { intervalToDuration } from "date-fns";

export const formatToHHMM = (hours: number, minutes: number) => {
  const HH = hours < 10 ? `0${hours}` : String(hours);
  const MM = minutes < 10 ? `0${minutes}` : String(minutes);

  return `${HH}:${MM}`;
};

function incrementOneDay(date: string) {
  return new Date(new Date(date).setDate(new Date(date).getDate() + 1))
    .toISOString()
    .split("T")[0];
}

export function calculateTotalSleep({
  date,
  sleepStart,
  sleepEnd,
}: {
  date: string | undefined;
  sleepStart: string | undefined;
  sleepEnd: string | undefined;
}): string | null {
  if (!date || !sleepStart || !sleepEnd) {
    return null;
  }

  const sleepEndDate = incrementOneDay(date);

  const { hours, minutes } = intervalToDuration({
    start: new Date(`${date}T${sleepStart}`),
    end: new Date(`${sleepEndDate}T${sleepEnd}`),
  });

  if (hours === undefined || minutes === undefined) {
    return null;
  }

  return formatToHHMM(hours, minutes);
}
