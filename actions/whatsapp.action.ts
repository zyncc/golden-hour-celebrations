"use server";

export async function sendLoginOTP(phoneNumber: string, code: string) {
  const res = await fetch(
    `https://graph.facebook.com/v21.0/${process.env.WA_PHONE_NUMBER_ID}/messages`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CLOUD_API_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        to: `91${phoneNumber}`,
        type: "template",
        messaging_product: "whatsapp",
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
    }
  );
  const response = await res.json();
  console.log(response);
  return response;
}
