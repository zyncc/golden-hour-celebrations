import React from "react";
import CreateNewAdminForm from "./_components/client";

export default function Page() {
  return (
    <div className="container mx-auto h-screen w-full flex items-center justify-center flex-col gap-y-5">
      <h1 className="text-xl font-semibold">Register New Admin</h1>
      <CreateNewAdminForm />
    </div>
  );
}
