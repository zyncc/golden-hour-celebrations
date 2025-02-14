import CreateBookingForm from "./CreateBookingForm";

export default async function CreateBooking() {
  return (
    <div className="container my-[100px]">
      <h1 className="text-xl font-medium">Create Booking</h1>
      <div className="mt-5">
        <CreateBookingForm />
      </div>
    </div>
  );
}
