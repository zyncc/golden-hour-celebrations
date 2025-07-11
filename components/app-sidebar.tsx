"use client";

import type React from "react";
import {
  LayoutDashboard,
  Users,
  Home,
  Plus,
  CalendarHeart,
  Clock9,
  Grid3x3,
  BetweenVerticalEnd,
} from "lucide-react";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";

const data = [
  {
    title: "Dashboard",
    url: "#",
    icon: LayoutDashboard,
    items: [
      {
        title: "Home",
        url: "/",
        icon: Home,
      },
      {
        title: "Slot Availability",
        url: "/dashboard/slots",
        icon: BetweenVerticalEnd,
      },
    ],
  },
  {
    title: "Bookings",
    url: "#",
    icon: CalendarHeart,
    items: [
      {
        title: "Recent Bookings",
        url: "/dashboard/recent-bookings",
        icon: Clock9,
      },
      {
        title: "All Bookings",
        url: "/dashboard/all-bookings",
        icon: Grid3x3,
      },
      {
        title: "Create Booking",
        url: "/dashboard/create",
        icon: Plus,
      },
    ],
  },
  {
    title: "Users",
    icon: Users,
    url: "#",
    items: [
      {
        title: "All Users",
        url: "/dashboard/users",
        icon: Users,
      },
    ],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const sidebar = useSidebar();
  const isMobile = sidebar.isMobile;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent className="bg-background">
        {data.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel className="flex items-center justify-start gap-x-2">
              <group.icon className="h-4 w-4" />
              <span className="group-data-[collapsible=icon]:hidden">
                {group.title}
              </span>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem
                    key={item.title}
                    onClick={() => (isMobile ? sidebar.toggleSidebar() : null)}
                  >
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <Link href={item.url} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="bg-background">
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
