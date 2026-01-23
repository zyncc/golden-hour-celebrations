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
    <section className="bg-foreground/5 rounded-3xl py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-16 md:flex-row">
          <div className="self-start md:sticky md:top-32 md:w-1/3 lg:w-1/4">
            <h2 className="text-foreground mb-6 text-4xl leading-tight lg:text-5xl">
              Frequently <br /> Asked <br />
              <span className="italic">Questions</span>
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Everything you need to know about planning your perfect celebration with us.
            </p>
          </div>
          <div className="md:w-2/3 lg:w-3/4">
            <Accordion multiple className="w-full space-y-4 border-none">
              <AccordionItem
                value="parking"
                className="border-border/50 bg-background hover:border-primary/30 rounded-lg border px-6"
              >
                <AccordionTrigger className="hover:text-primary py-6 text-left text-base font-medium hover:no-underline">
                  Is there parking facility?
                </AccordionTrigger>
                <AccordionContent className="pb-6 leading-relaxed">
                  <div className="space-y-4">
                    <p>
                      There is no designated two-wheeler parking directly in front of our
                      building in Jayanagar 4th Block.
                    </p>
                    <p>
                      For car parking, guests usually find space in the surrounding public
                      lanes.
                    </p>
                    <div className="bg-muted/50 border-primary rounded-md border-l-2 p-4">
                      <p className="text-sm">
                        <strong className="text-foreground">Pro Tip:</strong> The
                        BMTC-paid parking near the Jayanagar bus stand is just 100 meters
                        away.
                      </p>
                      <Link
                        href="https://g.co/kgs/j9A6af1"
                        target="_blank"
                        className="text-primary mt-2 inline-block text-xs font-medium hover:underline"
                      >
                        View on Google Maps →
                      </Link>
                    </div>
                    <p className="text-sm italic">
                      We recommend arriving a bit early to comfortably manage parking
                      before your booking.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              {faqData.slice(0, 5).map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-border/50 bg-background hover:border-primary/30 rounded-lg border px-6"
                >
                  <AccordionTrigger className="hover:text-primary py-6 text-left text-base font-medium hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};
