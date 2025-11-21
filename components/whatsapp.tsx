import { Phone } from "lucide-react";
import Link from "next/link";
import React from "react";
import { MdWhatsapp } from "react-icons/md";

export default function Whatsapp() {
  return (
    <div className="fixed bottom-5 right-5 z-[100]">
      <div className="flex flex-col gap-5">
        <Link target="_blank" href={"tel:7829773610"} className="rounded-full">
          <div className="bg-white p-2 rounded-full flex items-center justify-center">
            <Phone color="black" size={35} />
          </div>
        </Link>
        <Link target="_blank" href={"https://wa.me/917829773610"}>
          <div className="bg-[#0dc143] p-2 rounded-full">
            <MdWhatsapp size={35} />
          </div>
        </Link>
      </div>
    </div>
  );
}
