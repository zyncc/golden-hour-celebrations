import { Metadata } from "next";
import v1 from "@/public/v1.jpg";
import v2 from "@/public/v2.jpg";
import v3 from "@/public/v3.jpg";
import v4 from "@/public/v4.jpg";
import v5 from "@/public/v5.jpg";
import v6 from "@/public/v6.jpg";
import v7 from "@/public/v7.jpg";
import v8 from "@/public/v8.jpg";
import v9 from "@/public/v9.jpg";
import v10 from "@/public/v10.jpg";
import v11 from "@/public/v11.jpg";
import v12 from "@/public/v12.jpg";
import v13 from "@/public/v13.jpg";
import v14 from "@/public/v14.jpg";
import v15 from "@/public/v15.jpg";
import v16 from "@/public/v16.jpg";
import v17 from "@/public/v17.jpg";
import v18 from "@/public/v18.jpg";
import v19 from "@/public/v19.jpg";
import v20 from "@/public/v20.jpg";
import v21 from "@/public/v21.jpg";
import v22 from "@/public/v22.jpg";
import l1 from "@/public/l1.jpg";
import l2 from "@/public/l2.jpg";
import l3 from "@/public/l3.jpg";
import l4 from "@/public/l4.jpg";
import l5 from "@/public/l5.jpg";
import l6 from "@/public/l6.jpg";
import l7 from "@/public/l7.jpg";
import l8 from "@/public/l8.jpg";
import l9 from "@/public/l9.jpg";
import l10 from "@/public/l10.jpg";
import AutomatedBentoGrid from "@/components/automated-bento-grid";
import _ from "lodash";

export const metadata: Metadata = {
  title: {
    absolute: "Gallery",
  },
};

export default function Page() {
  const images = [
    v1,
    v2,
    v3,
    v4,
    v5,
    v6,
    v7,
    v8,
    v9,
    v10,
    v11,
    v12,
    v13,
    v14,
    v15,
    v16,
    v17,
    v18,
    v19,
    v20,
    v21,
    v22,
    l1,
    l2,
    l3,
    l4,
    l5,
    l6,
    l7,
    l8,
    l9,
    l10,
  ];
  return (
    <div className="my-[100px] container">
      <AutomatedBentoGrid images={_.shuffle(images)} />
    </div>
  );
}
