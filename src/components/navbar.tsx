"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/authClient";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MdOutlineMenu } from "react-icons/md";
import logo from "../../public/logo.png";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";

const NavLinks = [
  { Label: "Gallery", Link: "/gallery" },
  { Label: "Reviews", Link: "/#reviews" },
  { Label: "Contact", Link: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  const session = authClient.useSession();

  const isLoggedIn = !!session.data?.session;
  const isAdmin = session.data?.user.role === "admin";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  useEffect(() => {
    if (!isHome) {
      setScrolled(false);
      return;
    }
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const isTransparent = isHome && !scrolled;

  return (
    <header
      id="header"
      className={clsx(
        "fixed top-0 right-0 left-0 z-49 transition-all duration-300",
        isTransparent ? "bg-transparent text-white" : "bg-white text-black shadow-md",
      )}
    >
      <nav className="container flex items-center justify-between py-2.5">
        <Link href={process.env.NEXT_PUBLIC_BASE_URL || "/"}>
          <Image src={logo} alt="Golden Hour" width={120} height={120} priority />
        </Link>

        <div className="hidden lg:block">
          <ul className="flex gap-x-7">
            {NavLinks.map((link) => (
              <Link key={link.Link} href={link.Link}>
                <li className="text-[15px] font-medium">{link.Label}</li>
              </Link>
            ))}
            {!isLoggedIn && (
              <Link href={"/signin"}>
                <li className="text-[15px] font-medium">Login</li>
              </Link>
            )}
            {isAdmin && (
              <Link
                href={
                  process.env.NODE_ENV === "development"
                    ? "http://admin.localhost:3000/dashboard"
                    : "https://admin.goldenhourcelebrations.in/dashboard"
                }
              >
                <li className="text-[15px] font-medium">Admin</li>
              </Link>
            )}
          </ul>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/book" scroll={true}>
            <Button className={"text-foreground rounded-full transition-colors"}>
              Book now
            </Button>
          </Link>
          <Drawer>
            <DrawerTrigger asChild>
              <button aria-label="Open menu" className="block lg:hidden">
                <MdOutlineMenu size={28} />
              </button>
            </DrawerTrigger>
            <DrawerContent className="border-border/50 border-t">
              <DrawerHeader className="px-6 pt-6 pb-0">
                <DrawerTitle className="sr-only">Navigation Menu</DrawerTitle>
              </DrawerHeader>
              <nav className="px-6 pb-8">
                <ul className="flex flex-col gap-y-3">
                  {NavLinks.map((link) => (
                    <li key={link.Link}>
                      <DrawerClose asChild>
                        <Link
                          href={link.Link}
                          className="text-foreground/90 hover:text-foreground hover:bg-muted/60 block rounded-lg px-4 py-3 text-base font-medium transition-all duration-200"
                        >
                          {link.Label}
                        </Link>
                      </DrawerClose>
                    </li>
                  ))}
                  {!isLoggedIn && (
                    <li>
                      <DrawerClose asChild>
                        <Link
                          href={"/signin"}
                          className="text-foreground/90 hover:text-foreground hover:bg-muted/60 block rounded-lg px-4 py-3 text-base font-medium transition-all duration-200"
                        >
                          Signin
                        </Link>
                      </DrawerClose>
                    </li>
                  )}
                  {isAdmin && (
                    <li>
                      <DrawerClose asChild>
                        <Link
                          href={`admin.${process.env.NODE_ENV == "development" ? "http://admin.localhost:3000/dashboard" : "https://goldenhourcelebrations.in/dashboard"}`}
                          className="text-foreground/90 hover:text-foreground hover:bg-muted/60 block rounded-lg px-4 py-3 text-base font-medium transition-all duration-200"
                        >
                          Admin
                        </Link>
                      </DrawerClose>
                    </li>
                  )}
                </ul>
              </nav>
            </DrawerContent>
          </Drawer>
        </div>
      </nav>
    </header>
  );
}
