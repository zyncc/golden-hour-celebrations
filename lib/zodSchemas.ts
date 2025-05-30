import { z } from "zod";

export const emailValidator = z.object({
  email: z
    .string({ message: "Email is required" })
    .email("Enter a valid email address"),
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
  nameToDisplay: z
    .string({ message: "Name is required" })
    .max(6, { message: "Maximum 6 letters allowed" })
    .optional(),
  email: z
    .string({ message: "Email is required" })
    .email("Enter a valid email address")
    .trim()
    .toLowerCase(),
  findus: z.string({
    message: "Please select one",
  }),
  occasion: z.string({
    message: "Please select one",
  }),
  noOfPeople: z.coerce
    .number()
    .min(2, "Minimum 2 people are required!")
    .max(15, "Maximum 15 people are allowed"),
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
  nameToDisplay: z
    .string({ message: "Name is required" })
    .max(6, { message: "Maximum 6 letters allowed" })
    .optional(),
  noOfPeople: z.coerce.number().min(2, "Minimum 2 people are required!"),
  email: z
    .string({ message: "Email is required" })
    .email("Enter a valid email address"),
  findus: z.string({
    message: "Please select one",
  }),
  occasion: z.string({
    message: "Please select one",
  }),
  date: z.date({ message: "Date is required" }),
  room: z.string(),
  timeSlot: z.string(),
  cake: z.string().optional(),
  photography: z.string().optional(),
  fogEntry: z.boolean().optional(),
  rosePath: z.boolean().optional(),
});

export const ManualBookingSchema = z.object({
  balanceAmount: z.number(),
  advanceAmount: z.number(),
  discount: z.number(),
  name: z
    .string({ message: "Name is required" })
    .min(3, { message: "Name must be atleast 3 characters" })
    .max(50, { message: "Name cannot be more than 50 characters" }),
  phone: z
    .string({ message: "Phone is required" })
    .min(10, "Phone number must me atleast 10 characters"),
  noOfPeople: z.coerce.number().min(2, "Minimum 2 people are required!"),
  nameToDisplay: z
    .string({ message: "Name is required" })
    .max(6, { message: "Maximum 6 letters allowed" })
    .optional(),
  email: z
    .string({ message: "Email is required" })
    .email("Enter a valid email address"),
  occasion: z.string({
    message: "Please select one",
  }),
  date: z.date({ message: "Date is required" }),
  room: z.string(),
  timeSlot: z.string(),
  cake: z.string().optional(),
  photography: z.string().optional(),
  fogEntry: z.boolean().optional(),
  rosePath: z.boolean().optional(),
});
