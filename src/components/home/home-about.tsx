import Image from "next/image";

export function AboutUs() {
  return (
    <section id="about" className="bg-background py-32">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
          <div className="order-2 space-y-8 md:order-1">
            <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase">
              About Us
            </p>
            <h2 className="text-4xl leading-tight md:text-6xl">
              Crafting <span className="italic">Unforgettable</span> <br /> Memories
            </h2>
            <div className="text-muted-foreground max-w-xl space-y-6 text-lg leading-relaxed">
              <p>
                At Golden Hour Celebrations, we believe that life&apos;s most precious
                moments deserve a setting that is just as extraordinary. What started as a
                small passion project in Bangalore has grown into the city&apos;s premier
                private theatre decoration service.
              </p>
              <p>
                Our team of dedicated designers and planners work tirelessly to transform
                ordinary spaces into intimate, magical escapes. Whether it&apos;s an
                anniversary, a surprise proposal, or a &quot;just because&quot; movie
                night, we bring elegance and soul to every celebration.
              </p>
            </div>
          </div>
          <div className="group relative order-1 aspect-4/5 overflow-hidden rounded-2xl max-md:hidden md:aspect-square">
            <Image
              src="/v17.jpg"
              alt="About Golden Hour Celebrations"
              fill
              className="rounded-2xl object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
