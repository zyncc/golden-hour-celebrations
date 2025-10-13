import React from "react";
import CreateNewAdminForm from "./_components/client";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: headers(),
  });
  if (session?.user.role !== "admin") {
    return redirect("/dashboard/signin");
  }
  return (
    <div className="container mx-auto h-screen w-full flex items-center justify-center flex-col gap-y-5">
      <h1 className="text-xl font-semibold">Register New Admin</h1>
      <CreateNewAdminForm />
    </div>
  );
}
