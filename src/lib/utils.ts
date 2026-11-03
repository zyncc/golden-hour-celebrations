import { Temporal } from "@js-temporal/polyfill";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { getTimeSlotsForDuration, TIME_ZONE } from "./constants";
import { ReservationDetails } from "./types";

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
      startMin,
    ).padStart(2, "0")}:00+05:30`,
  );

  let endDateTime = new Date(
    `${year}-${month}-${day}T${String(endHour).padStart(2, "0")}:${String(
      endMin,
    ).padStart(2, "0")}:00+05:30`,
  );

  if (endHour < startHour || (endHour === startHour && endMin <= startMin)) {
    endDateTime.setDate(endDateTime.getDate() + 1);
  }

  return {
    startDateTime: startDateTime.toISOString(),
    endDateTime: endDateTime.toISOString(),
  };
}

export function parseTimeString(timeStr: string): { hour: number; minute: number } {
  const clean = timeStr.trim().toLowerCase();
  const isPM = clean.includes("pm");
  const isAM = clean.includes("am");
  const parts = clean.replace(/(am|pm)/g, "").trim().split(":");
  let hour = parseInt(parts[0], 10);
  const minute = parts[1] ? parseInt(parts[1], 10) : 0;
  if (isPM && hour !== 12) hour += 12;
  if (isAM && hour === 12) hour = 0;
  return { hour, minute };
}

export function parseSlotStart(slot: string): Temporal.PlainTime {
  const [start] = slot.split(/\s*-\s*/);
  const { hour, minute } = parseTimeString(start);
  return Temporal.PlainTime.from({ hour, minute });
}

export function getSlotInterval(
  dateStr: string,
  slotStr: string,
): {
  startInstant: Temporal.Instant;
  endInstant: Temporal.Instant;
  startDate: Date;
  endDate: Date;
  durationHours: number;
} {
  const [startStr, endStr] = slotStr.split(/\s*-\s*/);
  const start = parseTimeString(startStr);
  const end = parseTimeString(endStr);

  const plainDate = Temporal.PlainDate.from(dateStr);
  const startZoned = plainDate.toZonedDateTime({
    plainTime: start,
    timeZone: "Asia/Kolkata",
  });

  let endDayOffset = 0;
  if (end.hour < start.hour || (end.hour === start.hour && end.minute <= start.minute)) {
    endDayOffset = 1;
  }

  const endZoned = plainDate.add({ days: endDayOffset }).toZonedDateTime({
    plainTime: end,
    timeZone: "Asia/Kolkata",
  });

  const durationHours =
    (endZoned.epochMilliseconds - startZoned.epochMilliseconds) / (1000 * 60 * 60);

  return {
    startInstant: startZoned.toInstant(),
    endInstant: endZoned.toInstant(),
    startDate: new Date(startZoned.epochMilliseconds),
    endDate: new Date(endZoned.epochMilliseconds),
    durationHours,
  };
}

export function hasMidnightCharge(slotStr?: string): boolean {
  if (!slotStr) return false;
  if (slotStr === "10PM - 12AM" || slotStr === "10:30PM - 12:30AM") return true;

  try {
    const [startStr, endStr] = slotStr.split(/\s*-\s*/);
    const start = parseTimeString(startStr);
    const end = parseTimeString(endStr);

    if (start.hour >= 22 || (start.hour >= 0 && start.hour < 5)) return true;
    if (end.hour < start.hour && (end.hour > 0 || end.minute > 0)) return true;
    if (end.hour === 0 && start.hour > 0) return true;
    return false;
  } catch {
    return false;
  }
}

export function toISTZoned(dateISO: string) {
  return Temporal.Instant.from(dateISO).toZonedDateTimeISO("Asia/Kolkata");
}

export function isSlotUnavailable(
  slot: string,
  room: string,
  reservations: ReservationDetails[] | undefined,
  selectedDate: string, // yyyy-mm-dd
) {
  if (!selectedDate) return false;

  let candidateInterval: ReturnType<typeof getSlotInterval>;
  try {
    candidateInterval = getSlotInterval(selectedDate, slot);
  } catch {
    return false;
  }

  const nowMs = Date.now();

  // Rule 1: Past slot
  if (candidateInterval.startDate.getTime() <= nowMs) {
    return true;
  }

  if (!reservations || reservations.length === 0) return false;

  // Rule 2: Overlapping reservation for THIS room using actual timestamps
  const isBooked = reservations.some((reservation) => {
    if (reservation.room !== room) return false;
    if (!reservation.paymentStatus) return false;

    let bookedStartMs: number;
    let bookedEndMs: number;

    if (reservation.slotStartTime && reservation.slotEndTime) {
      bookedStartMs = new Date(reservation.slotStartTime).getTime();
      bookedEndMs = new Date(reservation.slotEndTime).getTime();
    } else {
      // Fallback for legacy database records
      try {
        const istDateStr = FormatDate(new Date(reservation.date));
        const legacyInterval = getSlotInterval(istDateStr, reservation.timeSlot);
        bookedStartMs = legacyInterval.startDate.getTime();
        bookedEndMs = legacyInterval.endDate.getTime();
      } catch {
        return false;
      }
    }

    const candStartMs = candidateInterval.startDate.getTime();
    const candEndMs = candidateInterval.endDate.getTime();

    // Overlap: A_start < B_end && A_end > B_start
    return candStartMs < bookedEndMs && candEndMs > bookedStartMs;
  });

  return isBooked;
}

export function getAvailableSlotsCount(
  duration: number,
  room: string,
  reservations: ReservationDetails[] | undefined,
  selectedDate?: string,
): number {
  if (!selectedDate) return 0;
  const slots: string[] = getTimeSlotsForDuration(duration);
  return slots.filter((slot) => !isSlotUnavailable(slot, room, reservations, selectedDate))
    .length;
}

export function FormatDate(date: Date) {
  return Temporal.Instant.fromEpochMilliseconds(date.getTime())
    .toZonedDateTimeISO("Asia/Kolkata")
    .toPlainDate()
    .toString();
}
