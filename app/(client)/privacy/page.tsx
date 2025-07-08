"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Info,
  Users2,
  FileText,
  Lock,
  Shield,
  UserCog,
  RefreshCcw,
  Mail,
} from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Introduction Card */}
        <Card className="mt-[70px]">
          <CardHeader>
            <CardTitle className="text-center text-2xl sm:text-3xl font-bold">
              Privacy Policy
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center text-muted-foreground">
            Welcome to our service. Your privacy is important to us. This
            Privacy Policy outlines how we collect, use, and protect your
            information when you visit our website or use our services.
          </CardContent>
        </Card>

        {/* Privacy Policy Sections */}
        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem
            value="information-collect"
            className="border rounded-lg px-6"
          >
            <AccordionTrigger className="flex gap-2 hover:no-underline">
              <Users2 className="h-5 w-5 text-primary" />
              <span>Information We Collect</span>
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              <p className="mb-4">
                We may collect the following types of information:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Personal Information: Name, email address, phone number, and
                  any other details you provide when booking a space or
                  contacting us.
                </li>
                <li>
                  Usage Data: Information about how you use our website, such as
                  IP address, browser type, and access times.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="information-use"
            className="border rounded-lg px-6"
          >
            <AccordionTrigger className="flex gap-2 hover:no-underline">
              <FileText className="h-5 w-5 text-primary" />
              <span>How We Use Your Information</span>
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              <p className="mb-4">
                We use your information for the following purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To process and manage bookings</li>
                <li>
                  To communicate with you regarding your reservations and
                  inquiries
                </li>
                <li>To improve our services and website</li>
                <li>To comply with legal obligations</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="sharing" className="border rounded-lg px-6">
            <AccordionTrigger className="flex gap-2 hover:no-underline">
              <Lock className="h-5 w-5 text-primary" />
              <span>Sharing Your Information</span>
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              <p className="mb-4">
                We do not sell or rent your personal information to third
                parties. We may share your information with:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Service providers who assist us in operating our website or
                  conducting our business
                </li>
                <li>Legal authorities, if required by law</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="security" className="border rounded-lg px-6">
            <AccordionTrigger className="flex gap-2 hover:no-underline">
              <Shield className="h-5 w-5 text-primary" />
              <span>Data Security</span>
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              We implement reasonable security measures to protect your
              information from unauthorized access, disclosure, or misuse.
              However, no method of transmission over the Internet or electronic
              storage is 100% secure.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="rights" className="border rounded-lg px-6">
            <AccordionTrigger className="flex gap-2 hover:no-underline">
              <UserCog className="h-5 w-5 text-primary" />
              <span>Your Rights</span>
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal information</li>
                <li>Request corrections to your personal information</li>
                <li>Request deletion of your personal information</li>
                <li>Object to processing of your personal information</li>
                <li>Request data portability</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="changes" className="border rounded-lg px-6">
            <AccordionTrigger className="flex gap-2 hover:no-underline">
              <RefreshCcw className="h-5 w-5 text-primary" />
              <span>Changes to Privacy Policy</span>
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new policy on our
              website. Your continued use of our services after any
              modifications indicates your acceptance of the revised policy.
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
              If you have any questions or concerns about this Privacy Policy,
              please contact us at:
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
