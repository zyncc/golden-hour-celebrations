import { z } from "zod";

export const phoneValidator = z.object({
  phone: z
    .string()
    .min(10, "Phone Number must be 10 digits")
    .max(10, "Phone Number must be 10 digits")
    .regex(/^[6-9]\d{9}$/, "Invalid Phone Number"),
});

export const validation = z.object({
  bookingName: z.string(),
  branch: z.string(),
  cake: z.string().optional(),
  decoration: z.string().optional(),
  email: z.string().email("Enter a valid email").trim().toLowerCase(),
  gifts: z.string().optional(),
  occasion: z.string().min(1, "Please select the Occasion"),
  noOfPeople: z.enum(["2", "3", "4", "5", "6"]),
  phone: z
    .string()
    .min(10, "Invalid phone number")
    .max(10, "Invalid phone number"),
  theatre: z.enum(["standard-theatre", "romantic-theatre"]),
  time: z.string().min(1, "Please select a time slot"),
});

export const StepOneFormSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(3, { message: "Name must be atleast 3 characters" })
    .max(50, { message: "Name cannot be more than 50 characters" }),
  phone: z.string({ message: "Phone is required" }).regex(/^[6-9]\d{9}$/, {
    message: "Invalid phone number",
  }),
  email: z
    .string({ message: "Email is required" })
    .email("Enter a valid email address"),
  findus: z.enum(["Instagram / Facebook", "Google", "Word of mouth"], {
    message: "Please select one",
  }),
  occasion: z.enum(
    [
      "Birthday",
      "Anniversary",
      "Bride / Groom to be",
      "Graduation Party",
      "Proposal",
      "Mom to be",
      "Other Surprises",
    ],
    {
      message: "Please select one",
    }
  ),
  date: z.date({ message: "Date is required" }),
});

export const payReservationSchema = z.object({
  balanceAmount: z.number(),
  name: z
    .string({ message: "Name is required" })
    .min(3, { message: "Name must be atleast 3 characters" })
    .max(50, { message: "Name cannot be more than 50 characters" }),
  phone: z.string({ message: "Phone is required" }).regex(/^[6-9]\d{9}$/, {
    message: "Invalid phone number",
  }),
  email: z
    .string({ message: "Email is required" })
    .email("Enter a valid email address"),
  findus: z.enum(["Instagram / Facebook", "Google", "Word of mouth"], {
    message: "Please select one",
  }),
  occasion: z.enum(
    [
      "Birthday",
      "Anniversary",
      "Bride / Groom to be",
      "Graduation Party",
      "Proposal",
      "Mom to be",
      "Other Surprises",
    ],
    {
      message: "Please select one",
    }
  ),
  date: z.date({ message: "Date is required" }),
  room: z.enum(["Basic Package", "Standard Package", "Premium Package"]),
  timeSlot: z.enum([
    "10AM - 12PM",
    "12PM - 2PM",
    "2PM - 4PM",
    "4PM - 6PM",
    "6PM - 8PM",
    "8PM - 10PM",
  ]),
});

export const ManualBookingSchema = z.object({
  advanceAmount: z.number(),
  balanceAmount: z.number(),
  date: z.date(),
  email: z.string().email().trim().toLowerCase(),
  name: z.string(),
  occasion: z.enum(
    [
      "Birthday",
      "Anniversary",
      "Bride / Groom to be",
      "Graduation Party",
      "Proposal",
      "Mom to be",
      "Other Surprises",
    ],
    {
      message: "Please select one",
    }
  ),
  packageType: z.string(),
  phone: z.string({ message: "Phone is required" }).regex(/^[6-9]\d{9}$/, {
    message: "Invalid phone number",
  }),
  timeSlot: z.string(),
});
