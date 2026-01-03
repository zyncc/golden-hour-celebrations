import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <main className="container mx-auto px-6 py-20 md:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        <div className="space-y-12">
          <div className="space-y-6">
            <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-primary/60">
              Get in touch
            </h2>
            <h1 className="text-6xl md:text-8xl leading-[0.9] tracking-tighter text-balance">
              Let&apos;s craft your <br />
              <span className="italic">golden</span> moment.
            </h1>
            <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
              Whether it&apos;s a grand celebration or an intimate gathering,
              we&apos;re here to bring your vision to life with exquisite
              detail.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 pt-8 border-t border-border">
            <div className="space-y-3 overflow-hidden">
              <h3 className="text-xs uppercase tracking-widest font-bold opacity-40 flex items-center gap-2">
                <Mail className="w-3 h-3" /> Email
              </h3>
              <Link
                href="mailto:goldenhourcelebrationsblr@gmail.com"
                className="text-lg font-medium hover:underline decoration-1 underline-offset-4"
              >
                goldenhourcelebrationsblr@gmail.com
              </Link>
            </div>
            <div className="space-y-3">
              <h3 className="text-xs uppercase tracking-widest font-bold opacity-40 flex items-center gap-2">
                <Phone className="w-3 h-3" /> Phone
              </h3>
              <Link
                href="tel:7829773610"
                className="text-lg font-medium hover:underline decoration-1 underline-offset-4"
              >
                +91 7829773610
              </Link>
            </div>
            <div className="space-y-3">
              <h3 className="text-xs uppercase tracking-widest font-bold opacity-40 flex items-center gap-2">
                <MapPin className="w-3 h-3" /> Location
              </h3>

              <p className="text-lg font-medium">
                <Link
                  target="_blank"
                  href={"https://maps.app.goo.gl/1DB3uDoKLjZBtrLU7"}
                >
                  1st floor, #66, 29th main, 29th A Cross Rd, Geetha Colony, 4th
                  Block, Jayanagar, 560041
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="bg-foreground/5 p-8 md:p-12 rounded-3xl border border-foreground/5 space-y-8">
          <h3 className="text-2xl">Inquiry Form</h3>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold opacity-60">
                  First Name
                </label>
                <Input
                  placeholder="Jane"
                  className="bg-transparent border-0 border-b border-foreground/20 rounded-none px-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold opacity-60">
                  Last Name
                </label>
                <Input
                  placeholder="Doe"
                  className="bg-transparent border-0 border-b border-foreground/20 rounded-none px-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary transition-colors"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-bold opacity-60">
                Phone number
              </label>
              <Input
                type="phone"
                placeholder="951275828"
                className="bg-transparent border-0 border-b border-foreground/20 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary focus-visible:ring-offset-0 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-bold opacity-60">
                Tell us about your event
              </label>
              <Textarea
                placeholder="Date, location, and any initial thoughts..."
                className="bg-transparent border-0 border-b border-foreground/20 rounded-none px-0 min-h-[120px] resize-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary transition-colors"
              />
            </div>
            <Button
              type="submit"
              className="w-full h-14 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-all text-xs uppercase tracking-[0.2em] font-bold"
            >
              Send Inquiry <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
