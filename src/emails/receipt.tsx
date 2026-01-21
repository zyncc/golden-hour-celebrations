import { Reservations } from "@/prisma/generated/prisma/client";
import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
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
        <Body className="bg-gray-100 py-[40px] font-sans">
          <Container className="mx-auto max-w-[600px] overflow-hidden rounded-[12px] bg-white shadow-lg">
            <Section className="bg-[#fdc700] px-[32px] py-[40px] text-center">
              <Heading className="m-0 text-[28px] leading-tight font-bold whitespace-nowrap text-black">
                Reservation Confirmed!
              </Heading>
              <Text className="mt-[8px] mb-0 text-[16px] text-black">
                Hi {name}, we&apos;re excited to host your {occasion} celebration!
              </Text>
            </Section>
            <Section className="px-[32px] py-[32px]">
              <Row className="mb-[24px]">
                <Column className="w-1/2 pr-[16px]">
                  <Text className="m-0 mb-[4px] text-[12px] font-semibold tracking-wide text-gray-500 uppercase">
                    DATE
                  </Text>
                  <Text className="m-0 text-[16px] font-medium text-gray-900">
                    {new Date(date).toLocaleDateString("en-GB", {
                      timeZone: "Asia/Kolkata",
                      weekday: "short",
                      month: "short",
                      day: "2-digit",
                    })}
                  </Text>
                </Column>
                <Column className="w-1/2 pl-[16px]">
                  <Text className="m-0 mb-[4px] text-[12px] font-semibold tracking-wide text-gray-500 uppercase">
                    TIME SLOT
                  </Text>
                  <Text className="m-0 text-[16px] font-medium text-gray-900">
                    {timeSlot}
                  </Text>
                </Column>
              </Row>
              <Row className="mb-[24px]">
                <Column className="w-1/2 pr-[16px]">
                  <Text className="m-0 mb-[4px] text-[12px] font-semibold tracking-wide text-gray-500 uppercase">
                    THEATRE
                  </Text>
                  <Text className="m-0 text-[16px] font-medium text-gray-900">
                    {room}
                  </Text>
                </Column>
                <Column className="w-1/2 pl-[16px]">
                  <Text className="m-0 mb-[4px] text-[12px] font-semibold tracking-wide text-gray-500 uppercase">
                    GUESTS
                  </Text>
                  <Text className="m-0 text-[16px] font-medium text-gray-900">
                    {noOfPeople} People
                  </Text>
                </Column>
              </Row>
              <Hr className="my-[24px] border-gray-200" />
              <Heading className="mt-0 mb-[16px] text-[18px] font-semibold text-gray-900">
                Reservation Details
              </Heading>
              <Text className="my-[4px] text-[15px] leading-[24px] text-gray-700">
                <strong>Order ID:</strong> {orderID}
              </Text>
              <Text className="my-[4px] text-[15px] leading-[24px] text-gray-700">
                <strong>Occasion:</strong> {occasion}
              </Text>
              {nameToDisplay && (
                <Text className="my-[4px] text-[15px] leading-[24px] text-gray-700">
                  <strong>Name to Display:</strong> {nameToDisplay}
                </Text>
              )}
              {writingOnCake && (
                <Text className="my-[4px] text-[15px] leading-[24px] text-gray-700">
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
                  <Hr className="my-[24px] border-gray-200" />
                  <Heading className="mt-0 mb-[16px] text-[18px] font-semibold text-gray-900">
                    Add-ons & Services
                  </Heading>
                  {cake && (
                    <Text className="my-[4px] text-[15px] leading-[24px] text-gray-700">
                      • {cake}
                    </Text>
                  )}
                  {photography && (
                    <Text className="my-[4px] text-[15px] leading-[24px] text-gray-700">
                      • {_.capitalize(photography)} Photography
                    </Text>
                  )}
                  {fogEntry && (
                    <Text className="my-[4px] text-[15px] leading-[24px] text-gray-700">
                      • Magical Fog Entry Added
                    </Text>
                  )}
                  {rosePath && (
                    <Text className="my-[4px] text-[15px] leading-[24px] text-gray-700">
                      • Rose Petal Path Added
                    </Text>
                  )}
                  {ledLetterName && (
                    <Text className="my-[4px] text-[15px] leading-[24px] text-gray-700">
                      • LED Letters: {ledLetterName}
                    </Text>
                  )}
                  {ledLetterAge && (
                    <Text className="my-[4px] text-[15px] leading-[24px] text-gray-700">
                      • LED Age Display: {ledLetterAge}
                    </Text>
                  )}
                </>
              )}
              {specialRequests && (
                <>
                  <Hr className="my-[24px] border-gray-200" />
                  <Heading className="mt-0 mb-[16px] text-[18px] font-semibold text-gray-900">
                    Special Requests
                  </Heading>
                  <Text className="my-[4px] rounded-[8px] border-l-4 border-solid border-blue-400 bg-blue-50 p-[16px] text-[15px] leading-[24px] text-gray-700">
                    {specialRequests}
                  </Text>
                </>
              )}
              <Hr className="my-[24px] border-gray-200" />
              <Section className="rounded-[8px] bg-gray-50 p-[20px]">
                <Row className="mb-[8px]">
                  <Column className="w-2/3">
                    <Text className="m-0 text-[14px] text-gray-600">Advance Paid</Text>
                  </Column>
                  <Column className="w-1/3 text-right">
                    <Text className="m-0 text-[14px] text-gray-900">
                      ₹{advanceAmount}
                    </Text>
                  </Column>
                </Row>
                <Row>
                  <Column className="w-2/3">
                    <Text className="m-0 text-[14px] font-bold text-gray-900">
                      Balance Due
                    </Text>
                  </Column>
                  <Column className="w-1/3 text-right">
                    <Text className="m-0 text-[14px] font-bold text-red-600">
                      ₹{balanceAmount}
                    </Text>
                  </Column>
                </Row>
              </Section>
              <Section className="mt-[32px] rounded-[8px] border-l-4 border-solid border-yellow-400 bg-yellow-50 p-[20px]">
                <Text className="m-0 mb-[8px] text-[14px] font-semibold text-yellow-800">
                  📋 Important Information
                </Text>
                <Text className="m-0 text-[13px] leading-[20px] text-yellow-700">
                  Please arrive 15 minutes before your scheduled time. For any changes or
                  queries, please contact us at least 24 hours in advance.
                </Text>
              </Section>
            </Section>
            <Section className="border-t border-solid border-gray-200 bg-gray-50 px-[32px] py-[24px] text-center">
              <Text className="my-[8px] text-[12px] leading-[18px] text-gray-600">
                Need to make changes? Call us at
                <Link href="tel:7829773610"> 7829773610</Link>
              </Text>
              <Text className="m-0 text-[12px] leading-[18px] text-gray-500">
                1st floor, #66, 29th main, 29th A Cross Rd, Geetha Colony, 4th Block,
                Jayanagar, 560041
              </Text>
              <Text className="m-0 text-[12px] leading-[18px] text-gray-500">
                © {new Date().getFullYear()} Golden Hour Celebrations. All rights
                reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ReservationConfirmationEmail;
