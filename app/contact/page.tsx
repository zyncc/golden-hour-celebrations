import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <div className="mt-[100px] container mx-auto">
      <h1 className="text-3xl font-semibold">Contact details :</h1>
      <h1 className="mt-4 font-medium">
        Email: <Link href={"mailto:"}>goldenhourcelebrations@gmail.com</Link>
      </h1>
      <h1 className="font-medium">Phone: 9739204918</h1>
    </div>
  );
}