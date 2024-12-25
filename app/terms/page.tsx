"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertCircle,
  CreditCard,
  Users,
  XCircle,
  DoorOpen,
  Shield,
  Wine,
  AlertTriangle,
  Scale,
  FileText,
  Mail,
} from "lucide-react";
import Link from "next/link";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Introduction Card */}
        <Card className="mt-[60px]">
          <CardHeader>
            <CardTitle className="text-center text-2xl sm:text-3xl font-bold">
              Terms and Conditions
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center text-muted-foreground">
            Welcome to our service. By using our website and services, you agree
            to comply with and be bound by the following Terms and Conditions.
            Please read them carefully.
          </CardContent>
        </Card>

        {/* Terms Sections */}
        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem value="acceptance" className="border rounded-lg px-6">
            <AccordionTrigger className="flex gap-2 hover:no-underline">
              <AlertCircle className="h-5 w-5 text-primary" />
              <span>Acceptance of Terms</span>
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              By accessing or using our website, you acknowledge that you have
              read, understood, and agree to these Terms and Conditions.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="services" className="border rounded-lg px-6">
            <AccordionTrigger className="flex gap-2 hover:no-underline">
              <Users className="h-5 w-5 text-primary" />
              <span>Services Offered</span>
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              We provide private theater and celebration space rentals for
              various events, including but not limited to film screenings,
              parties, and corporate events.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="payments" className="border rounded-lg px-6">
            <AccordionTrigger className="flex gap-2 hover:no-underline">
              <CreditCard className="h-5 w-5 text-primary" />
              <span>Reservations and Payments</span>
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              Reservations can be made online or by contacting us directly. A
              50% deposit is required at the time of booking to secure your
              reservation.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="cancellation"
            className="border rounded-lg px-6"
          >
            <AccordionTrigger className="flex gap-2 hover:no-underline">
              <XCircle className="h-5 w-5 text-primary" />
              <span>Cancellation Policy</span>
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              Please refer to our Cancellation Policy for details on
              cancellation terms and potential fees.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="space" className="border rounded-lg px-6">
            <AccordionTrigger className="flex gap-2 hover:no-underline">
              <DoorOpen className="h-5 w-5 text-primary" />
              <span>Use of Space</span>
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              The space must be used solely for the intended purpose as agreed
              upon during booking. No illegal activities or unauthorized use of
              the space is permitted. You are responsible for any damage to the
              property or equipment during your event.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="safety" className="border rounded-lg px-6">
            <AccordionTrigger className="flex gap-2 hover:no-underline">
              <Shield className="h-5 w-5 text-primary" />
              <span>Capacity and Safety</span>
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              The maximum capacity for our venue is 150 guests. Exceeding this
              limit may result in additional fees or cancellation of the event.
              You are responsible for ensuring the safety and well-being of your
              guests during the event.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="alcohol" className="border rounded-lg px-6">
            <AccordionTrigger className="flex gap-2 hover:no-underline">
              <Wine className="h-5 w-5 text-primary" />
              <span>Alcohol and Catering</span>
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              Please note that smoking, drinking, and any illegal activities are
              not permitted in our private theater and celebration space. Thank
              you for your understanding.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="liability" className="border rounded-lg px-6">
            <AccordionTrigger className="flex gap-2 hover:no-underline">
              <AlertTriangle className="h-5 w-5 text-primary" />
              <span>Liability</span>
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              We are not liable for any injuries, damages, or losses incurred
              during your event, except as required by law. You agree to
              indemnify and hold harmless our company from any claims arising
              from your use of the space.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="modifications"
            className="border rounded-lg px-6"
          >
            <AccordionTrigger className="flex gap-2 hover:no-underline">
              <FileText className="h-5 w-5 text-primary" />
              <span>Modifications to Terms</span>
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              We reserve the right to modify these Terms and Conditions at any
              time. Changes will be posted on our website, and your continued
              use of our services constitutes acceptance of the modified terms.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="law" className="border rounded-lg px-6">
            <AccordionTrigger className="flex gap-2 hover:no-underline">
              <Scale className="h-5 w-5 text-primary" />
              <span>Governing Law</span>
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              These Terms and Conditions are governed by local state laws. Any
              disputes arising under these terms will be subject to the
              exclusive jurisdiction of the courts located in your jurisdiction.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Contact Section */}
        <Card id="contact" className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Contact Us
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-muted-foreground">
              If you have any questions or concerns about these Terms and
              Conditions, please contact us at:
            </p>
            <div className="space-y-1">
              <p className="font-medium">Email:</p>
              <Link
                href={"mailto:goldenhourcelebrationsblr@gmail.com"}
                className="text-muted-foreground"
              >
                goldenhourcelebrationsblr@gmail.com
              </Link>
            </div>
            <div className="space-y-1">
              <p className="font-medium">Address:</p>
              <p className="text-muted-foreground">
                1st floor, 66, 29th main, 29th A Cross Rd, Geetha Colony, <br />
                4th Block, Jayanagar, Bengaluru, Karnataka 560041
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
