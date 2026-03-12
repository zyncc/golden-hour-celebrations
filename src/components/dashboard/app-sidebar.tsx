"use client";

import { NavMain } from "@/components/dashboard/nav-main";
import { NavUser } from "@/components/dashboard/nav-user";
import { Sidebar, SidebarContent, SidebarFooter } from "@/components/ui/sidebar";
import { authClient } from "@/lib/authClient";
import {
  IconClockHour4,
  IconGridDots,
  IconHome,
  IconListDetails,
} from "@tabler/icons-react";
import type * as React from "react";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconHome,
    },
    {
      title: "Slot Availability",
      url: "/dashboard/slots",
      icon: IconListDetails,
    },
    {
      title: "Upcoming Bookings",
      url: "/dashboard/recent-bookings",
      icon: IconClockHour4,
    },
    {
      title: "All Bookings",
      url: "/dashboard/all-bookings",
      icon: IconGridDots,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const session = authClient.useSession();
  const userData = {
    avatar: session.data?.user.image,
    name: session.data?.user.name,
    email: session.data?.user.email,
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>{!session.isPending && <NavUser user={userData} />}</SidebarFooter>
    </Sidebar>
  );
}
