import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqData } from "@/lib/constants";
import { Button } from "../ui/button";

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
