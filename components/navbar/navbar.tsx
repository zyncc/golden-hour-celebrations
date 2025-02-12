import React from "react";
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
import SignOutButton from "@/components/SignOutButton";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { Button } from "@/components/ui/button";
import logo from "@/public/logo.png";

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
  const session = await auth.api.getSession({
    headers: headers(),
  });
  return (
    <header
      id="header"
      className="text-white z-50 fixed top-0 right-0 left-0 bg-transparent backdrop-blur-xl"
    >
      <nav className="container flex justify-between items-center py-2.5">
        <Link href={"/"}>
          <Image
            src={logo}
            alt="Golden Hour"
            width={120}
            height={120}
            priority
            fetchPriority="high"
          />
        </Link>
        <div className="hidden lg:block">
          <ul className="flex gap-x-7">
            {NavLinks.map((link) => (
              <Link key={link.Link} href={link.Link}>
                <li className="font-medium text-[15px]">{link.Label}</li>
              </Link>
            ))}
            {session?.user.role == "admin" && (
              <Link href={"/admin"}>
                <li className="font-medium text-[15px]">Admin</li>
              </Link>
            )}
          </ul>
        </div>
        <div className="flex gap-2 items-center justify-center">
          <div className="flex gap-x-3">
            <Link href={"/book"}>
              <Button
                className="rounded-full text-black hover:text-black bg-yellow-500 hover:bg-yellow-300"
                variant={"outline"}
              >
                Book now
              </Button>
            </Link>
            {session?.session ? (
              <SignOutButton />
            ) : (
              <Link href={"/signin"}>
                <Button variant={"outline"} className="hidden lg:block">
                  Sign in
                </Button>
              </Link>
            )}
          </div>
          <Sheet>
            <SheetTrigger>
              <MdOutlineMenu size={33} className="lg:hidden block" />
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
                  {session?.user.role == "admin" && (
                    <Link href={"/admin"}>
                      <SheetClose>
                        <li className="font-medium text-[15px]">Admin</li>
                      </SheetClose>
                    </Link>
                  )}
                  {!session?.session && (
                    <Link href={"/signin"}>
                      <SheetClose>
                        <li className="font-medium text-[15px]">Sign in</li>
                      </SheetClose>
                    </Link>
                  )}
                </ul>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
