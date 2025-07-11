import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getEventTimeRange(baseDateStr: string, timeSlot: string) {
  const parseTime = (timeStr: string) => {
    let [time, modifier] = timeStr.trim().split(/(AM|PM)/i);
    let [hours, minutes = "00"] = time.trim().split(":");
    let hour = parseInt(hours);

    if (/PM/i.test(modifier) && hour !== 12) hour += 12;
    if (/AM/i.test(modifier) && hour === 12) hour = 0;

    return { hour, minute: parseInt(minutes) };
  };

  const timeZoneOffset = 5.5 * 60 * 60 * 1000;
  const baseDateUTC = new Date(baseDateStr);
  const istDate = new Date(baseDateUTC.getTime() + timeZoneOffset);

  const year = istDate.getFullYear();
  const month = String(istDate.getMonth() + 1).padStart(2, "0");
  const day = String(istDate.getDate()).padStart(2, "0");

  const [startSlot, endSlot] = timeSlot.split("-");

  const { hour: startHour, minute: startMin } = parseTime(startSlot);
  const { hour: endHour, minute: endMin } = parseTime(endSlot);

  const startDateTime = new Date(
    `${year}-${month}-${day}T${String(startHour).padStart(2, "0")}:${String(
      startMin
    ).padStart(2, "0")}:00+05:30`
  );

  let endDateTime = new Date(
    `${year}-${month}-${day}T${String(endHour).padStart(2, "0")}:${String(
      endMin
    ).padStart(2, "0")}:00+05:30`
  );

  if (endHour < startHour || (endHour === startHour && endMin <= startMin)) {
    endDateTime.setDate(endDateTime.getDate() + 1);
  }

  return {
    startDateTime: startDateTime.toISOString(),
    endDateTime: endDateTime.toISOString(),
  };
}
