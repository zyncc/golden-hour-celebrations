"use client";

import { Phone } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdWhatsapp } from "react-icons/md";

export default function ContactButtons() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const buttons = [
    {
      id: "phone",
      icon: Phone,
      href: "tel:7829773610",
      label: "Call Us",
      bgColor: "bg-[#171717]",
    },
    {
      id: "whatsapp",
      icon: MdWhatsapp,
      href: "https://wa.me/917829773610",
      label: "WhatsApp",
      bgColor: "bg-[#25D366]",
    },
  ];

  return (
    <div
      className={`fixed right-6 bottom-6 z-50 transition-all duration-500 ease-out ${visible ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-24 opacity-0"} `}
    >
      <div className="flex flex-col gap-3">
        {buttons.map((button, index) => {
          const Icon = button.icon;

          return (
            <div
              key={button.id}
              className={`group flex items-center justify-end gap-3 transition-all duration-500 ease-out ${visible ? "translate-x-0 opacity-100" : "translate-x-24 opacity-0"} `}
              style={{
                transitionDelay: visible ? `${index * 120}ms` : "0ms",
              }}
            >
              <Link
                target="_blank"
                href={button.href}
                className={`inline-flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 ${button.bgColor}`}
              >
                <Icon size={28} className="text-white" />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
