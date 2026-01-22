import { auth } from "@/auth";
import DashboardWrapper from "@/components/dashboard/dashboard-wrapper";
import { TIME_ZONE } from "@/lib/constants";
import { Temporal } from "@js-temporal/polyfill";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import CreateBookingForm from "./CreateBookingForm";

export default async function CreateBooking() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session?.user.role !== "admin") {
    return redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/signin`);
  }

  const todayIST = Temporal.Now.plainDateISO(TIME_ZONE).toString();

  return (
    <DashboardWrapper title="Create Booking">
      <CreateBookingForm currentDate={todayIST} />
    </DashboardWrapper>
  );
}
