import { create } from "zustand";

export type Reservation = {
  name?: string | undefined;
  phone?: string | undefined;
  email?: string | undefined;
  findus?: string | undefined;
  occasion?: string | undefined;
  nameToDisplay?: string | undefined;
  writingOnCake?: string | undefined;
  noOfPeople?: number | undefined;
  date?: Date | undefined;
  room?: string | undefined;
  timeSlot?: string | undefined;
  price?: number | undefined;
  cake?: string | undefined;
  photography?: string | undefined;
  fogEntry?: boolean | undefined;
  rosePath?: boolean | undefined;
  specialRequests?: string | undefined;
};

type ReservationType = {
  reservation: Reservation | undefined;
  setReservationData: (data: Reservation | undefined) => void;
};

export const useReservation = create<ReservationType>((set) => ({
  reservation: undefined,
  setReservationData: (data) => set({ reservation: data }),
}));
