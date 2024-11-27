import getSession from "@/lib/getSession";
import BookingComponent from "./Booking";
import { redirect } from "next/navigation";

export const revalidate = 0;

export default async function Booking() {
  const session = await getSession();
  if (!session?.user) {
    redirect("/signup?callbackUrl=/booking");
  }
  return (
    <section className="section container mt-10">
      <BookingComponent />
    </section>
  );
}
