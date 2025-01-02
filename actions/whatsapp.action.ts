"use server";

export async function sendLoginOTP(phoneNumber: string, code: string) {
  const options = {
    method: "POST",
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.WHATSAPP_API_TOKEN}`,
    body: JSON.stringify({
      to: `91${phoneNumber}`,
      messaging_product: "whatsapp",
      type: "template",
      template: {
        name: "login_otp",
        language: {
          code: "en",
        },
        components: [
          {
            type: "body",
            parameters: [
              {
                type: "text",
                text: code,
              },
            ],
          },
          {
            type: "button",
            sub_type: "url",
            index: "0",
            parameters: [
              {
                type: "text",
                text: code,
              },
            ],
          },
        ],
      },
    }),
  };
  await fetch(
    `https://graph.facebook.com/v21.0/${process.env.CLOUD_API_ACCESS_TOKEN}/messages`,
    options
  );
}
