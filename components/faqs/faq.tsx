import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqData } from "@/lib/constants";
import Link from "next/link";

export const FAQSection = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="font-semibold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 text-4xl text-center lg:text-7xl">
          FAQs
        </h1>
        <div className="mx-auto max-w-3xl">
          <Accordion
            type="single"
            collapsible
            className="w-full flex flex-col gap-5 mt-10"
          >
            <AccordionItem value="item-5">
              <AccordionTrigger className="text-left text-gray-100 hover:text-gray-300">
                Is there parking facility?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300 space-y-3">
                <p>
                  There is no designated two-wheeler parking directly in front
                  of our building in Jayanagar 4th Block.
                </p>
                <p>
                  For car parking, guests usually find space in the surrounding
                  public lanes.
                </p>
                <p>
                  A convenient option is the BMTC-paid parking near the
                  Jayanagar bus stand, which is approximately 100 meters from
                  venue.
                </p>
                <p>
                  You can view the location here: BMTC – Jayanagar Parking
                  <br />
                  <Link href="https://g.co/kgs/j9A6af1">
                    https://g.co/kgs/j9A6af1.
                  </Link>
                </p>
                <br />
                We recommend arriving a bit early to comfortably manage parking
                before your booking.
              </AccordionContent>
            </AccordionItem>
            {faqData.slice(0, 5).map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-gray-100 hover:text-gray-300">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
