"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
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
    <div className="section h-screen w-screen flex items-center justify-center gap-4 flex-col">
      <h2 className="font-medium text-2xl">Something went Wrong!</h2>
      <Button variant={"secondary"} onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
