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
    <section className="py-12 bg-foreground/5 rounded-3xl">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16">
          <div className="md:w-1/3 lg:w-1/4 md:sticky md:top-32 self-start">
            <h2 className="text-4xl lg:text-5xl text-foreground mb-6 leading-tight">
              Frequently <br /> Asked <br />
              <span className="italic">Questions</span>
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Everything you need to know about planning your perfect
              celebration with us.
            </p>
          </div>
          <div className="md:w-2/3 lg:w-3/4">
            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem
                value="parking"
                className="border border-border/50 px-6 rounded-lg bg-background transition-all hover:border-primary/30"
              >
                <AccordionTrigger className="text-left py-6 text-base font-medium hover:no-underline hover:text-primary transition-colors">
                  Is there parking facility?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  <div className="space-y-4">
                    <p>
                      There is no designated two-wheeler parking directly in
                      front of our building in Jayanagar 4th Block.
                    </p>
                    <p>
                      For car parking, guests usually find space in the
                      surrounding public lanes.
                    </p>
                    <div className="p-4 bg-muted/50 rounded-md border-l-2 border-primary">
                      <p className="text-sm">
                        <strong className="text-foreground">Pro Tip:</strong>{" "}
                        The BMTC-paid parking near the Jayanagar bus stand is
                        just 100 meters away.
                      </p>
                      <Link
                        href="https://g.co/kgs/j9A6af1"
                        target="_blank"
                        className="text-primary hover:underline text-xs mt-2 inline-block font-medium"
                      >
                        View on Google Maps →
                      </Link>
                    </div>
                    <p className="text-sm italic">
                      We recommend arriving a bit early to comfortably manage
                      parking before your booking.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              {faqData.slice(0, 5).map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-border/50 px-6 rounded-lg bg-background transition-all hover:border-primary/30"
                >
                  <AccordionTrigger className="text-left py-6 text-base font-medium hover:no-underline hover:text-primary transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
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
