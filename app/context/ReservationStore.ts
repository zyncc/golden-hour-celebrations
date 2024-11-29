import { create } from "zustand";

type Reservation = {
  name: string | undefined;
  phone: string | undefined;
  findus: string | undefined;
  occasion: string | undefined;
  date: Date | undefined;
};

type ReservationType = {
  reservation: Reservation | undefined;
  setReservationData: (data: Reservation) => void;
};

export const useReservation = create<ReservationType>((set) => ({
  reservation: undefined,
  setReservationData: (data) => set({ reservation: data }),
}));
