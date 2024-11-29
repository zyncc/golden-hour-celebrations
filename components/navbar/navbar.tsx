import React from "react";
import Link from "next/link";
import CustomBtn from "../CustomButton";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MdOutlineMenu } from "react-icons/md";
import { Button } from "../ui/button";
import { signOut } from "@/auth";
import getSession from "@/lib/getSession";
import Image from "next/image";

const NavLinks = [
  {
    Label: "Our Services",
    Link: "/services",
  },
  {
    Label: "Gallery",
    Link: "/gallery",
  },
  {
    Label: "Contact",
    Link: "/contact",
  },
];

export default async function Navbar() {
  const session = await getSession();
  return (
    <header
      id="header"
      className="text-white z-50 fixed top-0 right-0 left-0 bg-transparent backdrop-blur-xl"
    >
      <nav className="container flex justify-between items-center py-3">
        <Link href={"/"}>
          <Image
            src={"/logo2.svg"}
            alt="Logo"
            width={50}
            height={50}
            priority
            fetchPriority="high"
            unoptimized
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
        <div className="flex gap-2 items-center justify-center">
          <div className="flex gap-x-3">
            {session?.user && (
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <Button type="submit">Sign out</Button>
              </form>
            )}
            <Link href={"/booking"}>
              <CustomBtn classes="rounded-full" variant={"outline"}>
                Book now
              </CustomBtn>
            </Link>
          </div>
          <Sheet>
            <SheetTrigger>
              <MdOutlineMenu size={33} className="lg:hidden block" />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <ul className="flex flex-col gap-y-7 items-start">
                  {NavLinks.map((link) => (
                    <Link key={link.Link} href={link.Link}>
                      <li className="font-medium text-[15px]">{link.Label}</li>
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
