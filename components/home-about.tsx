import Image from "next/image";

export function AboutUs() {
  return (
    <section id="about" className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 order-2 md:order-1">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              About Us
            </p>
            <h2 className="text-4xl md:text-6xl leading-tight">
              Crafting <span className="italic">Unforgettable</span> <br />{" "}
              Memories Since 2025
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed text-lg max-w-xl">
              <p>
                At Golden Hour Celebrations, we believe that life&apos;s most
                precious moments deserve a setting that is just as
                extraordinary. What started as a small passion project in
                Bangalore has grown into the city&apos;s premier private theatre
                decoration service.
              </p>
              <p>
                Our team of dedicated designers and planners work tirelessly to
                transform ordinary spaces into intimate, magical escapes.
                Whether it&apos;s an anniversary, a surprise proposal, or a
                &quot;just because&quot; movie night, we bring elegance and soul
                to every celebration.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/5] md:aspect-square group overflow-hidden order-1 max-md:hidden rounded-2xl">
            <Image
              src="/candlelight-dinner-setup.jpg"
              alt="About Golden Hour Celebrations"
              fill
              className="object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
