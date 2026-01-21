import { Phone } from "lucide-react";
import Link from "next/link";
import { MdWhatsapp } from "react-icons/md";

export default function Whatsapp() {
  return (
    <div className="fixed right-5 bottom-5 z-50">
      <div className="flex flex-col gap-5">
        <Link target="_blank" href={"tel:7829773610"} className="rounded-full">
          <div className="bg-background flex items-center justify-center rounded-full p-2 shadow-md">
            <Phone color="black" size={35} />
          </div>
        </Link>
        <Link target="_blank" href={"https://wa.me/917829773610"}>
          <div className="rounded-full bg-[#0dc143] p-2">
            <MdWhatsapp size={35} />
          </div>
        </Link>
      </div>
    </div>
  );
}
