import { createAuthClient } from "better-auth/react";
import { adminClient, phoneNumberClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL:
    process.env.NODE_ENV == "development"
      ? "http://localhost:3000"
      : "https://goldenhourcelebrations.in",
  plugins: [phoneNumberClient(), adminClient()],
});
