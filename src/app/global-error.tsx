"use client";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <html>
      <body>
        <div className="section flex h-screen w-screen flex-col items-center justify-center gap-4">
          <h2 className="text-2xl font-medium">Something went Wrong!</h2>
          <Button variant={"secondary"} onClick={() => reset()}>
            Try again
          </Button>
        </div>
      </body>
    </html>
  );
}
