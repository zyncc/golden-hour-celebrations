import DashboardWrapper from "@/components/dashboard/dashboard-wrapper";
import { TIME_ZONE } from "@/lib/constants";
import { Temporal } from "@js-temporal/polyfill";
import CreateBookingForm from "./CreateBookingForm";

export default async function CreateBooking() {
  const todayIST = Temporal.Now.plainDateISO(TIME_ZONE).toString();

  return (
    <DashboardWrapper title="Create Booking">
      <CreateBookingForm currentDate={todayIST} />
    </DashboardWrapper>
  );
}
