"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/authClient";
import { IconDotsVertical, IconLogout } from "@tabler/icons-react";
import { UserMinus } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function NavUser({
  user,
}: {
  user: {
    name: string | undefined;
    email: string | undefined;
    avatar: string | null | undefined;
  };
}) {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar! || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback className="rounded-lg">
                    {user.name?.slice(0, 1).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
                <IconDotsVertical className="ml-auto size-4" />
              </SidebarMenuButton>
            }
          />
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <Link href={process.env.NEXT_PUBLIC_BASE_URL || "/"}>
              <DropdownMenuItem>
                <IconLogout />
                Exit
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              variant="destructive"
              onClick={() =>
                authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      router.refresh();
                    },
                  },
                })
              }
            >
              <UserMinus />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
