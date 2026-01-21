import { auth } from "@/auth";
import DashboardWrapper from "@/components/dashboard/dashboard-wrapper";
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

  return (
    <DashboardWrapper title="Create Booking">
      <CreateBookingForm />
    </DashboardWrapper>
  );
}
