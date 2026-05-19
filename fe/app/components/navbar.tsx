"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronRight } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "All Stories", href: "/stories", desc: "Live stories and news" },
    {
      name: "Explore",
      href: "/explore",
      desc: "Analysis about news bias",
    },
    {
      name: "Archive",
      href: "/archive",
      desc: "View the archive of our previous stories!",
    },
    ,
    {
      name: "Ai Chat",
      href: "/ai-chat",
      desc: "Chat with our own personal AI",
    },
    {
      name: "Narrative Split",
      href: "/narrative-split",
      desc: "Check out the narratives around the world",
    },
    {
      name: "About",
      href: "/about",
      desc: "Learn how we interpret information",
    },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-cyan-500/30 bg-black/60 backdrop-blur-xl">
        <div className="absolute bottom-0 left-0 h-[1px] w-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)]" />

        <div className="mx-auto flex h-20 max-w-[1700px] items-center justify-between px-8">
          <div className="flex items-center gap-2">
            {/* MINIMAL THREE LINE ICON */}
            <button
              onClick={() => setIsOpen(true)}
              className="text-cyan-400 transition-colors hover:text-white"
              aria-label="Open Menu"
            >
              <Menu size={28} strokeWidth={1.5} />
            </button>

            {/* LOGO */}
            <Link href="/" className="flex items-center">
              <img src="/logo.png" width="70px" />
              <span className="ml-[-10px] text-[25px] font-black text-white uppercase">
                The Prism
              </span>
            </Link>
          </div>

          <div className="hidden items-center space-x-12 md:flex">
            {[
              {
                name: "Stories",
                link: "/stories",
              },
              { name: "Explore", link: "/explore" },
              { name: "Narrative Split", link: "/narrative-split" },
            ].map((item) => (
              <Link
                key={item.name}
                href={`${item.link}`}
                className="text-[13px] font-bold tracking-[0.3em] text-white/60 uppercase transition-colors hover:text-cyan-400"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/signup">
              <Button
                variant="outline"
                className="h-[45px] w-[110px] rounded-none border-2 border-cyan-400 bg-transparent text-[13px] font-black tracking-widest text-cyan-400 uppercase hover:bg-cyan-400/10"
              >
                Sign Up
              </Button>
            </Link>

            <Link href="/login">
              <Button
                variant="outline"
                className="h-[45px] w-[110px] rounded-none border-2 border-cyan-400 bg-transparent text-[13px] font-black tracking-widest text-cyan-400 uppercase hover:bg-cyan-400/10"
              >
                Log In
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* --- SIDEBAR DRAWER --- */}
      <aside
        className={`fixed inset-y-0 left-0 z-[100] w-full max-w-[350px] transform border-r border-cyan-500/30 bg-[#02050a] transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-white/5 px-8">
          {/* LOGO TEXT BEFORE CROSS */}
          <span className="text-[30px] font-black text-cyan-400 uppercase">
            The Prism
          </span>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/40 transition-colors hover:text-cyan-400"
          >
            <X size={28} strokeWidth={1.5} />
          </button>
        </div>

        <nav className="flex flex-col p-6">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="group flex items-center justify-between border-b border-white/5 py-6 transition-all hover:pl-2"
            >
              <div>
                <h4 className="text-[15px] font-black tracking-widest text-white uppercase transition-colors group-hover:text-cyan-400">
                  {item.name}
                </h4>
                <p className="mt-1 text-[10px] tracking-widest text-white/30 uppercase">
                  {item.desc}
                </p>
              </div>
              <ChevronRight
                className="text-white/10 transition-all group-hover:text-cyan-400"
                size={18}
              />
            </Link>
          ))}
        </nav>
      </aside>

      {/* BACKDROP */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-sm transition-opacity"
        />
      )}
    </>
  );
}
