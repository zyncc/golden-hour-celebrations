import { z } from "zod";

export const emailValidator = z.object({
  email: z
    .string({ message: "Email is required" })
    .email("Enter a valid email address"),
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
    .max(50, { message: "Name cannot be more than 50 characters" })
    .trim(),
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
  room: z.enum(["Majestic Theatre", "Dreamscape Theatre"]),
  timeSlot: z.enum([
    "10AM - 12PM",
    "12PM - 2PM",
    "2PM - 4PM",
    "4PM - 6PM",
    "6PM - 8PM",
    "8PM - 10PM",
  ]),
  cake: z
    .enum([
      "Chocolate pastry",
      "Black forest pastry",
      "Strawberry pastry",
      "Blackcurrent pastry",
      "Vanilla pastry",
    ])
    .optional(),
  photography: z.enum(["30", "60"]).optional(),
  fogEntry: z.enum(["Fog Entry"]).optional(),
  rosePath: z.enum(["Rose Path"]).optional(),
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
