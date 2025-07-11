import { Prisma } from "@prisma/client";

export type ReservationsWithTotalPrice = Prisma.ReservationsGetPayload<{
  select: {
    balanceAmount: true;
    room: true;
    advanceAmount: true;
    discount: true;
    createdAt: true;
  };
}>;

export type ReservationDetails = Prisma.ReservationsGetPayload<{
  select: {
    paymentStatus: true;
    date: true;
    room: true;
    timeSlot: true;
    occasion: true;
  };
}>;
