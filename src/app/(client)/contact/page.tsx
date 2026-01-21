import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
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
            <h1 className="text-6xl leading-[0.9] tracking-tighter text-balance md:text-8xl">
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

        {/* Right Side: Form */}
        <div className="bg-foreground/5 border-foreground/5 space-y-8 rounded-3xl border p-8 md:p-12">
          <h3 className="text-2xl">Inquiry Form</h3>
          <form className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-bold tracking-widest uppercase opacity-60">
                  First Name
                </label>
                <Input
                  placeholder="Jane"
                  className="border-foreground/20 focus-visible:border-primary rounded-none border-0 border-b bg-transparent px-0 shadow-none transition-colors focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold tracking-widest uppercase opacity-60">
                  Last Name
                </label>
                <Input
                  placeholder="Doe"
                  className="border-foreground/20 focus-visible:border-primary rounded-none border-0 border-b bg-transparent px-0 shadow-none transition-colors focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold tracking-widest uppercase opacity-60">
                Phone number
              </label>
              <Input
                type="phone"
                placeholder="951275828"
                className="border-foreground/20 focus-visible:border-primary rounded-none border-0 border-b bg-transparent px-0 shadow-none transition-colors focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold tracking-widest uppercase opacity-60">
                Tell us about your event
              </label>
              <Textarea
                placeholder="Date, location, and any initial thoughts..."
                className="border-foreground/20 focus-visible:border-primary min-h-[120px] resize-none rounded-none border-0 border-b bg-transparent px-0 shadow-none transition-colors focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <Button
              type="submit"
              className="bg-foreground text-background hover:bg-foreground/90 h-14 w-full rounded-full text-xs font-bold tracking-[0.2em] uppercase transition-all"
            >
              Send Inquiry <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
