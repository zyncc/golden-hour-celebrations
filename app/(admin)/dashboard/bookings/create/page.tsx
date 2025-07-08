import { auth } from "@/auth";
import CreateBookingForm from "./CreateBookingForm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function CreateBooking() {
  const session = await auth.api.getSession({
    headers: headers(),
  });
  if (session?.user.role !== "admin") {
    return redirect("/dashboard/signin");
  }
  return (
    <div className="container my-[100px]">
      <h1 className="text-xl font-medium">Create Booking</h1>
      <div className="mt-5">
        <CreateBookingForm />
      </div>
    </div>
  );
}
