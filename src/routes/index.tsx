import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MessageCircle, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import techtallyIcon from "../assets/techtally-icon.png";
import serviceOffice from "../assets/service-office.jpg";
import serviceCad from "../assets/service-cad.jpg";
import serviceWindows from "../assets/service-windows.jpg";
import serviceAssignments from "../assets/service-assignments.jpg";
import gameCod from "../assets/game-cod.jpg";
import gameGta from "../assets/game-gta.jpg";
import gameFifa from "../assets/game-fifa.jpg";
import gameMk from "../assets/game-mk.jpg";
import techtallyFlyer from "../assets/techtally-share-flyer.jpg";

const SITE_URL = "https://fixwithdave.lovable.app";
const FLYER_URL = SITE_URL + techtallyFlyer;

const WHATSAPP_URL =
  "https://wa.me/254716345324?text=" +
  encodeURIComponent("Hello there. I would like to inquire about your services.");


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TechTally — PC Support & Software Services" },
      {
        name: "description",
        content:
          "PC software installation, troubleshooting, Windows setup, storage cleanup, security support, game installs, and writing and project services.",
      },
      { property: "og:title", content: "TechTally — PC Support & Software Services" },
      {
        property: "og:description",
        content:
          "Software installation, PC troubleshooting, Windows setup, storage cleanup, game installs, and writing and project services.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: FLYER_URL },
      { name: "twitter:image", content: FLYER_URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const services = [
  {
    id: "microsoft-365",
    letter: "M",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-600/10",
    img: serviceOffice,
    imgAlt: "Microsoft 365 apps on a laptop illustration",
    title: "Microsoft 365 Suite",
    items: ["Word, Excel, PowerPoint", "Access & Publisher", "Outlook & OneNote"],
    highlight: "+ Free Lifetime Activation",
    tag: "Available Now",
  },
  {
    id: "arch-design",
    letter: "A",
    iconColor: "text-orange-600",
    iconBg: "bg-orange-600/10",
    img: serviceCad,
    imgAlt: "Architectural CAD blueprint on a monitor illustration",
    title: "Arch & Design",
    items: ["AutoCAD & ArchiCAD", "Revit & SketchUp", "Adobe Creative Suite", "Engineering Utilities"],
    tag: "All Versions",
  },
  {
    id: "windows-security",
    letter: "W",
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-600/10",
    img: serviceWindows,
    imgAlt: "Windows security shield over a laptop illustration",
    title: "Windows & Security",
    items: ["Win 10/11 Fresh Install", "Driver Updates & Repair", "Ransomware/Virus Removal", "System Recovery"],
    tag: "Fast Service",
  },
  {
    id: "assignments",
    letter: "P",
    iconColor: "text-purple-600",
    iconBg: "bg-purple-600/10",
    img: serviceAssignments,
    imgAlt: "Laptop illustration for writing and project support",
    title: "Assignments & Projects",
    items: ["Writing Assignments", "Research Projects", "Reports & Proposals", "Editing & Formatting"],
    tag: "Academic Help",
  },
];

const games = [
  { img: gameCod, title: "Call of Duty", sub: "Infinite Warfare", alt: "Call of Duty Infinite Warfare style game art" },
  { img: gameGta, title: "GTA V", sub: "Premium Edition", alt: "Grand Theft Auto V style game art" },
  { img: gameFifa, title: "FIFA Series", sub: "All Versions", alt: "FIFA football game style art" },
  { img: gameMk, title: "Mortal Kombat", sub: "XL / 11 / 1", alt: "Mortal Kombat fighting game style art" },
];

const sideMenu = [
  { title: "Microsoft 365 Suite", href: "#microsoft-365" },
  { title: "Arch & Design", href: "#arch-design" },
  { title: "Windows & Security", href: "#windows-security" },
  { title: "Assignments & Projects", href: "#assignments" },
  { title: "Storage Fix", href: "#storage" },
  { title: "Gaming", href: "#gaming" },
];

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background font-sans text-secondary">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <a href="#top" className="flex items-center gap-3">
            <img
              src={techtallyIcon}
              alt="TechTally logo"
              className="h-10 w-10 rounded-lg object-cover"
            />
            <span className="text-xl font-bold tracking-tight">TechTally</span>
          </a>

          <div className="hidden gap-8 text-sm font-medium md:flex">
            <a href="#services" className="transition-colors hover:text-primary">Services</a>
            <a href="#gaming" className="transition-colors hover:text-primary">Gaming</a>
            <a href="#storage" className="transition-colors hover:text-primary">Storage Fix</a>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50"
              aria-label="Open services menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-3 py-2 text-sm font-bold text-card transition-all hover:brightness-110 sm:px-5 sm:py-2"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Services Menu Side Panel */}
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="right" className="w-[80vw] sm:max-w-sm">
          <SheetHeader className="text-left">
            <SheetTitle className="text-2xl font-bold italic">All Services</SheetTitle>
            <SheetDescription>
              Browse TechTally services. Tap any service to jump to it.
            </SheetDescription>
          </SheetHeader>

          <div className="mt-8 flex flex-col gap-2">
            {sideMenu.map((item) => (
              <a
                key={item.title}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl border border-slate-100 bg-card px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
              >
                {item.title}
              </a>
            ))}
          </div>

          <div className="mt-6 border-t border-slate-200 pt-6">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => setMenuOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-bold text-card transition-all hover:brightness-110"
            >
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </a>
          </div>
        </SheetContent>
      </Sheet>

      {/* Hero */}
      <header id="top" className="relative overflow-hidden px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <span className="mb-6 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary italic">
            SOFTWARE · REPAIRS · PC SUPPORT
          </span>
          <h1 className="mb-6 text-5xl font-bold leading-tight md:text-7xl">
            PC Problems? <br />
            <span className="text-primary">Consider it Done.</span>
          </h1>
          <p className="mx-auto mb-8 max-w-lg text-lg text-slate-600">
            TechTally provides PC support for customers and businesses, from software installation
            and Windows setup to security cleanup, storage troubleshooting, and game installs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#services"
              className="rounded-xl bg-secondary px-8 py-4 font-bold text-secondary-foreground transition-all hover:bg-slate-800"
            >
              View All Services
            </a>
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-card px-4 py-2">
              <div className="flex -space-x-2">
                <div className="h-8 w-8 rounded-full border-2 border-card bg-slate-200" />
                <div className="h-8 w-8 rounded-full border-2 border-card bg-slate-300" />
                <div className="h-8 w-8 rounded-full border-2 border-card bg-slate-400" />
              </div>
              <span className="text-xs font-semibold text-slate-500">Helping customers and clients</span>
            </div>
          </div>
        </div>
      </header>

      {/* Services Grid */}
      <section id="services" className="bg-card py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold">Expert Software Setup</h2>
            <p className="text-slate-500">Professional installation for the tools you need to succeed.</p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <div
                key={s.title}
                id={s.id}
                className="group overflow-hidden rounded-2xl border border-slate-100 bg-background p-0 transition-all duration-300 hover:bg-card hover:shadow-xl"
              >
                <div className="relative">
                  <img
                    src={s.img}
                    alt={s.imgAlt}
                    width={800}
                    height={512}
                    loading="lazy"
                    className="aspect-[8/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className={`absolute -bottom-6 left-8 flex h-12 w-12 items-center justify-center rounded-lg shadow-lg ${s.iconBg} ${s.iconColor} bg-card`}
                  >
                    <span className="font-bold">{s.letter}</span>
                  </div>
                </div>
                <div className="p-8 pt-10">
                <h3 className="mb-3 text-xl font-bold italic">{s.title}</h3>
                <ul className="mb-6 space-y-2 text-sm text-slate-600">
                  {s.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                  {s.highlight && <li className="font-bold text-primary">{s.highlight}</li>}
                </ul>
                <div className="flex items-center justify-between border-t border-slate-200 pt-4">
                  <span className="text-xs font-bold uppercase text-slate-400">{s.tag}</span>
                    <div className="flex flex-wrap items-center gap-2">
                    <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-bold text-primary group-hover:underline"
                  >
                    Book Now →
                  </a>
                    <Button type="button" size="sm" disabled title="Online payments will be available after payment setup.">
                      Pay Now
                    </Button>
                    </div>
                </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Storage Spotlight */}
      <section id="storage" className="bg-secondary py-24 text-secondary-foreground">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-3xl border border-white/10 bg-primary/10 p-8 md:p-12">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div>
                <h2 className="mb-6 text-4xl font-bold italic underline decoration-accent decoration-4 underline-offset-8">
                  What's eating your space?
                </h2>
                <p className="mb-8 text-lg text-slate-300">
                  Disk full but can't find the files? TechTally helps identify hidden logs,
                  temporary junk, and oversized caches that
                  common cleaners miss.
                </p>
                <div className="space-y-4">
                  {[
                    'Deep scan for hidden "Ghost" files',
                    "App cache & Temporary file clearing",
                    "Disk health check & SSD optimization",
                  ].map((line, i) => (
                    <div key={line} className="flex items-center gap-4 rounded-xl bg-white/5 p-4">
                      <div className={`h-2 w-2 rounded-full bg-accent ${i === 0 ? "animate-pulse" : ""}`} />
                      <span>{line}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex aspect-video flex-col justify-center rounded-2xl border border-white/10 bg-white/5 p-8">
                <div className="mb-4 h-4 w-full overflow-hidden rounded-full bg-white/20">
                  <div className="h-full w-[95%] bg-red-500" />
                </div>
                <p className="text-center font-mono text-sm">DISK CAPACITY: 95% FULL</p>
                <div className="mt-8 flex justify-center">
                  <div className="flex flex-wrap justify-center gap-3">
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl bg-accent px-8 py-3 text-lg font-black text-accent-foreground transition-transform hover:scale-105"
                    >
                      CLEAN IT NOW
                    </a>
                    <Button type="button" disabled title="Online payments will be available after payment setup.">
                      Pay Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About TechTally */}
      <section id="about" className="bg-card py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="relative mx-auto w-full max-w-md md:mx-0">
              <div className="flex aspect-square items-center justify-center rounded-3xl bg-card p-12 shadow-2xl">
                <img
                  src={techtallyIcon}
                  alt="TechTally logo"
                  width={400}
                  height={400}
                  loading="lazy"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 hidden rounded-2xl bg-primary px-6 py-4 text-primary-foreground shadow-lg md:block">
                <p className="text-xl font-black">PC SUPPORT</p>
                <p className="text-xs font-semibold uppercase tracking-wide">Install · repair · optimize</p>
              </div>
            </div>
            <div>
              <h2 className="mb-4 text-4xl font-bold italic">About TechTally</h2>
              <p className="mb-6 text-lg text-slate-600">
                TechTally offers computer setup and troubleshooting, including software installations,
                Windows setup, security cleanup, storage diagnostics, and PC game installs. Customers
                get clear explanations and support tailored to their device.
              </p>
              <div className="space-y-4">
                {[
                  {
                    title: "Hands-on Experience",
                    desc: "Support for Windows setup, storage issues, malware cleanup, and common PC problems.",
                  },
                  {
                    title: "Engineering & Design Focused",
                    desc: "Installation support for AutoCAD, Revit, ArchiCAD, Adobe Creative Suite, and Microsoft 365.",
                  },
                  {
                    title: "Straightforward Support",
                    desc: "Contact TechTally to discuss the issue, arrange a service, and confirm the expected turnaround.",
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-2xl border border-slate-200 bg-background p-5">
                    <h3 className="mb-1 font-bold text-secondary">{item.title}</h3>
                    <p className="text-sm text-slate-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gaming */}
      <section id="gaming" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h2 className="mb-2 text-4xl font-bold italic">Ultimate Game Library</h2>
              <p className="text-slate-500">High-performance installations for the latest titles.</p>
            </div>
            <span className="rounded bg-slate-200 px-3 py-1 font-mono text-xs">FPS OPTIMIZED</span>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {games.map((g) => (
              <div key={g.title} className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-slate-200">
                <img
                  src={g.img}
                  alt={g.alt}
                  width={600}
                  height={800}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-transparent to-transparent p-6">
                  <h4 className="text-lg font-bold text-card">{g.title}</h4>
                  <p className="text-xs text-card/60">{g.sub}</p>
                  <Button
                    type="button"
                    size="sm"
                    disabled
                    title="Online payments will be available after payment setup."
                    className="mt-3 w-fit"
                  >
                    Pay Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-24 text-center text-primary-foreground">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-6 text-4xl font-bold">Don't struggle with errors alone.</h2>
          <p className="mb-10 text-lg text-primary-foreground/80">
            For software installation, troubleshooting, and PC support, send a message to get started.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl bg-card px-10 py-4 text-xl font-black text-primary transition-all hover:shadow-lg"
            >
              Contact TechTally
            </a>
            <div className="flex items-center justify-center rounded-2xl border border-white/20 bg-black/20 px-10 py-4 font-mono text-sm">
              LOC: Common Services Block
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-12 text-center">
        <p className="text-sm text-slate-400">
          © {new Date().getFullYear()} TechTally. PC support and software services.
        </p>
      </footer>
    </div>
  );
}
