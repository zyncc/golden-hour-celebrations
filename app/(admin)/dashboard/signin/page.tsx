import React from "react";
import SigninClient from "./_client";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: headers(),
  });
  if (session) {
    return redirect("/dashboard");
  }
  return (
    <div className="container mx-auto flex items-center justify-center h-screen">
      <SigninClient />
    </div>
  );
}
