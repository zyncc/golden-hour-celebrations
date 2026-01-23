import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <main className="container mx-auto px-6 py-20 md:py-32">
      <div className="grid grid-cols-1 items-start gap-20 lg:grid-cols-2">
        <div className="space-y-12">
          <div className="space-y-6">
            <h2 className="text-primary/60 text-xs font-bold tracking-[0.3em] uppercase">
              Get in touch
            </h2>
            <h1 className="text-4xl leading-[0.9] tracking-tighter text-balance md:text-5xl">
              Let&apos;s craft your <br />
              <span className="italic">golden</span> moment.
            </h1>
            <p className="text-muted-foreground max-w-md text-lg leading-relaxed">
              Whether it&apos;s a grand celebration or an intimate gathering, we&apos;re
              here to bring your vision to life with exquisite detail.
            </p>
          </div>

          <div className="border-border grid grid-cols-1 gap-8 border-t pt-8">
            <div className="space-y-3 overflow-hidden">
              <h3 className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase opacity-40">
                <Mail className="h-3 w-3" /> Email
              </h3>
              <Link
                href="mailto:goldenhourcelebrationsblr@gmail.com"
                className="text-lg font-medium decoration-1 underline-offset-4 hover:underline"
              >
                goldenhourcelebrationsblr@gmail.com
              </Link>
            </div>
            <div className="space-y-3">
              <h3 className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase opacity-40">
                <Phone className="h-3 w-3" /> Phone
              </h3>
              <Link
                href="tel:7829773610"
                className="text-lg font-medium decoration-1 underline-offset-4 hover:underline"
              >
                +91 7829773610
              </Link>
            </div>
            <div className="space-y-3">
              <h3 className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase opacity-40">
                <MapPin className="h-3 w-3" /> Location
              </h3>

              <p className="text-lg font-medium">
                <Link target="_blank" href={"https://maps.app.goo.gl/1DB3uDoKLjZBtrLU7"}>
                  1st floor, #66, 29th main, 29th A Cross Rd, Geetha Colony, 4th Block,
                  Jayanagar, 560041
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d486.083498454363!2d77.58504368216717!3d12.929047951755233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15ccac350657%3A0xfeeb73c49998e57b!2sGolden%20Hour%20-%20Private%20theatre%20Celebrations%2C%20Jayanagar%204th%20block%2C%20Bangalore!5e0!3m2!1sen!2sin!4v1769200143626!5m2!1sen!2sin"
          allowFullScreen
          className="h-full min-h-[400px] w-full rounded-2xl border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </main>
  );
}
