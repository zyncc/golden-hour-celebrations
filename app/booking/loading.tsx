import Spinner from "@/components/ui/loadingSpinner";
import React from "react";

const Loading = () => {
  return (
    <section>
      <div className="absolute top-0 left-0 w-screen h-screen flex items-center justify-center">
        <Spinner size={60} />
      </div>
    </section>
  );
};

export default Loading;
