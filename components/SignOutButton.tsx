"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/authClient";
import { useRouter } from "next/navigation";

function SignOutButton() {
  const router = useRouter();
  return (
    <Button
      className="hidden lg:block"
      onClick={async () => {
        authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              router.refresh();
            },
          },
        });
      }}
    >
      Sign out
    </Button>
  );
}

export default SignOutButton;
