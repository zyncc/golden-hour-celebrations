import formatCurrency from "@/lib/formatCurrency";
import { Reservations } from "@prisma/client";
import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

export const NikeReceiptEmail = ({
  getReservationDetails,
}: {
  getReservationDetails: Reservations;
}) => (
  <Html>
    <Head />
    <Preview>Get your order summary, estimated delivery date and more</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={track.container}>
          <Row>
            <Column>
              <Text style={global.paragraphWithBold}>Transaction Number</Text>
              <Text style={track.number}>{getReservationDetails.orderID}</Text>
            </Column>
            <Column align="right">
              <Link
                href="https://goldenhourcelebrations.in/contact"
                style={global.button}
              >
                Contact us
              </Link>
            </Column>
          </Row>
        </Section>
        <Hr style={global.hr} />
        <Section style={message}>
          <Heading style={global.heading}>
            Your Reservation has been Booked!
          </Heading>
          <Text style={{ ...global.text, marginTop: 24, textAlign: "left" }}>
            Dear {getReservationDetails.name},
            <br />
            We are thrilled to confirm your reservation with us! 🎉
            <br />
            Theatre - {getReservationDetails.room}
            <br />
            Time - {getReservationDetails.timeSlot}
            <br />
            {getReservationDetails.cake &&
              "Cake - " + getReservationDetails.cake}
            {getReservationDetails.cake && <br />}
            {getReservationDetails.photography &&
              "Photography - " +
                (getReservationDetails.photography == "60"
                  ? "60 min"
                  : "30 min")}
            {getReservationDetails.photography && <br />}
            Ocassion - {getReservationDetails.occasion}
            <br />
            {getReservationDetails.fogEntry && "Fog Entry Added"}
            {getReservationDetails.fogEntry && <br />}
            {getReservationDetails.rosePath && "Candle Light Rose Path Added"}
            {getReservationDetails.rosePath && <br />}
            Date -{" "}
            {getReservationDetails.date.toLocaleDateString("en-GB", {
              timeZone: "Asia/Kolkata",
              weekday: "short",
              month: "short",
              day: "2-digit",
            })}
            <br />
            {getReservationDetails.paymentID &&
              "Payment ID - " + getReservationDetails.paymentID}
            {getReservationDetails.paymentID && <br />}
            Phone - {getReservationDetails.phone}
            <br />
            Balance Amount Payable -{" "}
            {formatCurrency(getReservationDetails.balanceAmount).split(".")[0]}
            <br />
            Advance Amount Paid -{" "}
            {formatCurrency(getReservationDetails.advanceAmount).split(".")[0]}
            <br />
            <br />
            If you have any special requests or need further assistance, please
            dont hesitate to reach out.
          </Text>
        </Section>
        <Section style={paddingY}>
          <Row>
            <Text style={global.heading}>Golden Hour Celebrations ✨</Text>
          </Row>
        </Section>
        <Hr style={{ ...global.hr, marginTop: "12px" }} />
        <Section style={paddingY}>
          <Row>
            <Text style={{ ...footer.text, paddingTop: 30, paddingBottom: 30 }}>
              Please contact us if you have any questions. (If you reply to this
              email, we wont be able to see it.)
            </Text>
          </Row>
          <Row>
            <Text style={footer.text}>
              © 2024 Golden Hour Celebrations, Inc. All Rights Reserved.
            </Text>
          </Row>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default NikeReceiptEmail;

const paddingX = {
  paddingLeft: "40px",
  paddingRight: "40px",
};

const paddingY = {
  paddingTop: "22px",
  paddingBottom: "22px",
};

const paragraph = {
  margin: "0",
  lineHeight: "2",
};

const global = {
  paddingX,
  paddingY,
  defaultPadding: {
    ...paddingX,
    ...paddingY,
  },
  paragraphWithBold: { ...paragraph, fontWeight: "bold" },
  heading: {
    fontSize: "32px",
    lineHeight: "1.3",
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: "-1px",
  } as React.CSSProperties,
  text: {
    ...paragraph,
    color: "#747474",
    fontWeight: "500",
  },
  button: {
    border: "1px solid #929292",
    fontSize: "16px",
    textDecoration: "none",
    padding: "10px 0px",
    width: "220px",
    display: "block",
    textAlign: "center",
    fontWeight: 500,
    color: "#000",
  } as React.CSSProperties,
  hr: {
    borderColor: "#E5E5E5",
    margin: "0",
  },
};

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "10px auto",
  width: "600px",
  maxWidth: "100%",
  border: "1px solid #E5E5E5",
};

const track = {
  container: {
    padding: "22px 40px",
    backgroundColor: "#F7F7F7",
  },
  number: {
    margin: "12px 0 0 0",
    fontWeight: 500,
    lineHeight: "1.4",
    color: "#6F6F6F",
  },
};

const message = {
  padding: "40px 74px",
  textAlign: "center",
} as React.CSSProperties;

const footer = {
  policy: {
    width: "166px",
    margin: "auto",
  },
  text: {
    margin: "0",
    color: "#AFAFAF",
    fontSize: "13px",
    textAlign: "center",
  } as React.CSSProperties,
};
