"use client";

import React, { useEffect } from "react";
import { useReservation } from "@/app/context/ReservationStore";

function Page() {
  const { setReservationData } = useReservation();

  useEffect(() => {
    setReservationData(undefined);
  }, []);
  return (
    <div className={"mt-[100px] container flex items-center justify-center"}>
      <h1 className={"text-green-600 text-3xl"}>Success</h1>
    </div>
  );
}

export default Page;
