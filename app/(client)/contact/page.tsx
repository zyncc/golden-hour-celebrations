import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <div className="mt-[100px] container mx-auto">
      <h1 className="text-3xl font-semibold">Contact details :</h1>
      <h1 className="mt-4 font-medium">
        Email: goldenhourcelebrationsblr@gmail.com
      </h1>
      <Link href={"tel:7829773610"}>
        <h1 className="font-medium">Phone: +91 7829773610</h1>
      </Link>
    </div>
  );
}
