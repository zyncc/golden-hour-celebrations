"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MdOutlineMenu } from "react-icons/md";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import logo from "@/public/logo.png";
import clsx from "clsx";

const NavLinks = [
  { Label: "Gallery", Link: "/gallery" },
  { Label: "Reviews", Link: "/#reviews" },
  { Label: "Contact", Link: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      id="header"
      className={clsx(
        "fixed top-0 left-0 right-0 z-[49] transition-all duration-300",
        scrolled
          ? "bg-white shadow-md text-black"
          : "bg-transparent text-white",
      )}
    >
      <nav className="container flex justify-between items-center py-2.5">
        <Link href={process.env.NEXT_PUBLIC_BASE_URL || "/"}>
          <Image
            src={logo}
            alt="Golden Hour"
            width={120}
            height={120}
            priority
          />
        </Link>

        <div className="hidden lg:block">
          <ul className="flex gap-x-7">
            {NavLinks.map((link) => (
              <Link key={link.Link} href={link.Link}>
                <li className="font-medium text-[15px]">{link.Label}</li>
              </Link>
            ))}
          </ul>
        </div>

        <div className="flex gap-2 items-center">
          <Link href="/book">
            <Button
              className={"rounded-full text-foreground transition-colors"}
            >
              Book now
            </Button>
          </Link>

          <Sheet>
            <SheetTrigger>
              <MdOutlineMenu
                size={33}
                className={clsx(
                  "lg:hidden",
                  scrolled ? "text-black" : "text-white",
                )}
              />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <ul className="flex flex-col gap-y-7 items-start">
                  {NavLinks.map((link) => (
                    <Link href={link.Link} key={link.Link}>
                      <SheetClose>
                        <li className="font-medium text-[15px]">
                          {link.Label}
                        </li>
                      </SheetClose>
                    </Link>
                  ))}
                </ul>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
