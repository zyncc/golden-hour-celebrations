import * as React from "react";
import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Row,
  Section,
  Text,
  Tailwind,
  Link,
} from "@react-email/components";
import { Reservations } from "@prisma/client";
import _ from "lodash";

const ReservationConfirmationEmail = ({
  getReservationDetails,
}: {
  getReservationDetails: Reservations;
}) => {
  const {
    name,
    date,
    timeSlot,
    room,
    noOfPeople,
    occasion,
    orderID,
    advanceAmount,
    balanceAmount,
    nameToDisplay,
    writingOnCake,
    specialRequests,
    cake,
    photography,
    fogEntry,
    rosePath,
    ledLetterName,
    ledLetterAge,
  } = getReservationDetails;

  return (
    <Html>
      <Tailwind>
        <Head />
        <Preview>Your reservation at {room} is confirmed! 🎉</Preview>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="mx-auto max-w-[600px] bg-white rounded-[12px] overflow-hidden shadow-lg">
            <Section className="bg-[#b99a00] px-[32px] py-[40px] text-center">
              <Heading className="text-black text-[28px] font-bold m-0 leading-tight">
                🎉 Reservation Confirmed 🎉
              </Heading>
              <Text className="text-black text-[16px] mt-[8px] mb-0">
                Hi {name}, we&apos;re excited to host your {occasion}{" "}
                celebration!
              </Text>
            </Section>
            <Section className="px-[32px] py-[32px]">
              <Row className="mb-[24px]">
                <Column className="w-1/2 pr-[16px]">
                  <Text className="text-gray-500 text-[12px] font-semibold uppercase tracking-wide m-0 mb-[4px]">
                    DATE
                  </Text>
                  <Text className="text-gray-900 text-[16px] font-medium m-0">
                    {new Date(date).toLocaleDateString("en-GB", {
                      timeZone: "Asia/Kolkata",
                      weekday: "short",
                      month: "short",
                      day: "2-digit",
                    })}
                  </Text>
                </Column>
                <Column className="w-1/2 pl-[16px]">
                  <Text className="text-gray-500 text-[12px] font-semibold uppercase tracking-wide m-0 mb-[4px]">
                    TIME SLOT
                  </Text>
                  <Text className="text-gray-900 text-[16px] font-medium m-0">
                    {timeSlot}
                  </Text>
                </Column>
              </Row>
              <Row className="mb-[24px]">
                <Column className="w-1/2 pr-[16px]">
                  <Text className="text-gray-500 text-[12px] font-semibold uppercase tracking-wide m-0 mb-[4px]">
                    THEATRE
                  </Text>
                  <Text className="text-gray-900 text-[16px] font-medium m-0">
                    {room}
                  </Text>
                </Column>
                <Column className="w-1/2 pl-[16px]">
                  <Text className="text-gray-500 text-[12px] font-semibold uppercase tracking-wide m-0 mb-[4px]">
                    GUESTS
                  </Text>
                  <Text className="text-gray-900 text-[16px] font-medium m-0">
                    {noOfPeople} People
                  </Text>
                </Column>
              </Row>
              <Hr className="border-gray-200 my-[24px]" />
              <Heading className="text-gray-900 text-[18px] font-semibold mb-[16px] mt-0">
                Reservation Details
              </Heading>
              <Text className="text-gray-700 text-[15px] leading-[24px] my-[4px]">
                <strong>Order ID:</strong> {orderID}
              </Text>
              <Text className="text-gray-700 text-[15px] leading-[24px] my-[4px]">
                <strong>Occasion:</strong> {occasion}
              </Text>
              {nameToDisplay && (
                <Text className="text-gray-700 text-[15px] leading-[24px] my-[4px]">
                  <strong>Name to Display:</strong> {nameToDisplay}
                </Text>
              )}
              {writingOnCake && (
                <Text className="text-gray-700 text-[15px] leading-[24px] my-[4px]">
                  <strong>Cake Message:</strong> &quot;{writingOnCake}&quot;
                </Text>
              )}
              {(cake ||
                photography ||
                fogEntry ||
                rosePath ||
                ledLetterName ||
                ledLetterAge) && (
                <>
                  <Hr className="border-gray-200 my-[24px]" />
                  <Heading className="text-gray-900 text-[18px] font-semibold mb-[16px] mt-0">
                    Add-ons & Services
                  </Heading>
                  {cake && (
                    <Text className="text-gray-700 text-[15px] leading-[24px] my-[4px]">
                      • {cake}
                    </Text>
                  )}
                  {photography && (
                    <Text className="text-gray-700 text-[15px] leading-[24px] my-[4px]">
                      • {_.capitalize(photography)} Photography
                    </Text>
                  )}
                  {fogEntry && (
                    <Text className="text-gray-700 text-[15px] leading-[24px] my-[4px]">
                      • Magical Fog Entry Added
                    </Text>
                  )}
                  {rosePath && (
                    <Text className="text-gray-700 text-[15px] leading-[24px] my-[4px]">
                      • Rose Petal Path Added
                    </Text>
                  )}
                  {ledLetterName && (
                    <Text className="text-gray-700 text-[15px] leading-[24px] my-[4px]">
                      • LED Letters: {ledLetterName}
                    </Text>
                  )}
                  {ledLetterAge && (
                    <Text className="text-gray-700 text-[15px] leading-[24px] my-[4px]">
                      • LED Age Display: {ledLetterAge}
                    </Text>
                  )}
                </>
              )}
              {specialRequests && (
                <>
                  <Hr className="border-gray-200 my-[24px]" />
                  <Heading className="text-gray-900 text-[18px] font-semibold mb-[16px] mt-0">
                    Special Requests
                  </Heading>
                  <Text className="text-gray-700 text-[15px] leading-[24px] my-[4px] bg-blue-50 p-[16px] rounded-[8px] border-l-[4px] border-solid border-blue-400">
                    {specialRequests}
                  </Text>
                </>
              )}
              <Hr className="border-gray-200 my-[24px]" />
              <Section className="bg-gray-50 p-[20px] rounded-[8px]">
                <Row className="mb-[8px]">
                  <Column className="w-2/3">
                    <Text className="text-gray-600 text-[14px] m-0">
                      Advance Paid
                    </Text>
                  </Column>
                  <Column className="w-1/3 text-right">
                    <Text className="text-gray-900 text-[14px] m-0">
                      ₹{advanceAmount}
                    </Text>
                  </Column>
                </Row>
                <Row>
                  <Column className="w-2/3">
                    <Text className="text-gray-900 text-[14px] font-bold m-0">
                      Balance Due
                    </Text>
                  </Column>
                  <Column className="w-1/3 text-right">
                    <Text className="text-red-600 text-[14px] font-bold m-0">
                      ₹{balanceAmount}
                    </Text>
                  </Column>
                </Row>
              </Section>
              <Section className="mt-[32px] bg-yellow-50 p-[20px] rounded-[8px] border-l-[4px] border-solid border-yellow-400">
                <Text className="text-yellow-800 text-[14px] font-semibold m-0 mb-[8px]">
                  📋 Important Information
                </Text>
                <Text className="text-yellow-700 text-[13px] leading-[20px] m-0">
                  Please arrive 15 minutes before your scheduled time. For any
                  changes or queries, please contact us at least 24 hours in
                  advance.
                </Text>
              </Section>
            </Section>
            <Section className="bg-gray-50 px-[32px] py-[24px] text-center border-t border-solid border-gray-200">
              <Text className="text-gray-600 text-[12px] leading-[18px] my-[8px]">
                Need to make changes? Call us at
                <Link href="tel:7829773610"> 7829773610</Link>
              </Text>
              <Text className="text-gray-500 text-[12px] leading-[18px] m-0">
                1st floor, #66, 29th main, 29th A Cross Rd, Geetha Colony, 4th
                Block, Jayanagar, 560041
              </Text>
              <Text className="text-gray-500 text-[12px] leading-[18px] m-0">
                © {new Date().getFullYear()} Golden Hour Celebrations. All
                rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ReservationConfirmationEmail;
