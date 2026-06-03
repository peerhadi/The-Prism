"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  ChevronRight,
  User,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useRouter } from "next/navigation";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);

  const router = useRouter();
  const profileRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    setAuthenticated(!!localStorage.getItem("token"));
    const update = () => {
      setAuthenticated(!!localStorage.getItem("token"));
    };

    window.addEventListener("auth-changed", update);

    return () => window.removeEventListener("auth-changed", update);
  }, []);
  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
    window.location.reload();
  };
  const links = [
    {
      name: "Stories",
      href: "/stories",
      desc: "Live intelligence streams",
    },
    {
      name: "Explore",
      href: "/explore",
      desc: "Narrative and bias analysis",
    },
    {
      name: "Archive",
      href: "/archive",
      desc: "Historical signal database",
    },
    {
      name: "AI Chat",
      href: "/ai-chat",
      desc: "Interact with Prism AI",
    },
    {
      name: "Narrative Split",
      href: "/narrative-split",
      desc: "Compare global narratives",
    },
    {
      name: "Dashboard",
      href: "/dashboard",
      desc: "The admin dashboard",
    },
    {
      name: "About",
      href: "/about",
      desc: "Inside the intelligence framework",
    },
  ];
  if (authenticated === null) {
    return;
  }
  return (
    <>
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-2xl">
        {/* glow */}
        <div className="absolute bottom-0 left-0 h-px w-full bg-cyan-400/70 shadow-[0_0_20px_#22d3ee]" />

        <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-6">
          {/* LEFT */}
          <div className="flex items-center gap-5">
            <button
              onClick={() => setOpen(true)}
              className="group flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] transition-all hover:border-cyan-500/30 hover:bg-cyan-500/10"
            >
              <Menu
                suppressHydrationWarning
                className="h-5 w-5 text-cyan-400 transition-transform group-hover:scale-110"
              />
            </button>

            <Link
              href={authenticated ? "/stories" : "/"}
              className="flex items-center gap-3"
            >
              <img
                src="/logo.png"
                alt="The Prism"
                className="h-12 w-12 object-contain"
              />

              <div>
                <h1 className="text-[22px] leading-none font-black tracking-tight uppercase">
                  The Prism
                </h1>

                <p className="mt-1 text-[9px] tracking-[0.3em] text-cyan-400 uppercase">
                  Narrative Intelligence
                </p>
              </div>
            </Link>
          </div>

          {/* CENTER */}
          <nav className="hidden items-center gap-10 xl:flex">
            {[
              ["Stories", "/stories"],
              ["Explore", "/explore"],
              ["Narrative Split", "/narrative-split"],
              ["Archive", "/archive"],
            ].map(([name, href]) => (
              <Link
                key={name}
                href={href}
                className="relative text-[13px] font-black tracking-[0.25em] text-white/50 uppercase transition-colors hover:text-cyan-400"
              >
                {name}
              </Link>
            ))}
          </nav>

          {/* RIGHT */}
          {/* RIGHT */}
          <div className="flex items-center gap-3">
            {!authenticated ? (
              <>
                <Link
                  href="/login"
                  className="hidden rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 text-[11px] font-black tracking-[0.25em] text-white/60 uppercase transition-all hover:border-white/20 hover:bg-white/10 md:block"
                >
                  Log In
                </Link>

                <Link
                  href="/signup"
                  className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 px-5 py-3 text-[11px] font-black tracking-[0.25em] text-cyan-400 uppercase transition-all hover:scale-[1.03] hover:bg-cyan-500/20"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="
          group
          flex
          items-center
          gap-3
          rounded-2xl
          border border-cyan-500/20
          bg-cyan-500/[0.04]
          px-2 py-2
          transition-all
          hover:border-cyan-500/40
          hover:bg-cyan-500/[0.08]
        "
                >
                  <User className="h-8 w-8 text-cyan-400" />
                </button>

                <div
                  className={`
    absolute right-0 top-[calc(100%+12px)]
    w-64 overflow-hidden rounded-3xl
    border border-cyan-500/20
    bg-[#050816]/95
    backdrop-blur-2xl
    shadow-[0_0_40px_rgba(34,211,238,0.12)]

    origin-top-right
    transition-all duration-300
    ease-out

    ${
      profileOpen
        ? "pointer-events-auto opacity-100 scale-100 translate-y-0"
        : "pointer-events-none opacity-0 scale-95 -translate-y-2"
    }
  `}
                >
                  <div className="h-px w-full bg-cyan-500/20" />

                  <Link
                    href="/profile"
                    className="flex items-center gap-4 px-5 py-4 transition-all hover:bg-cyan-500/[0.05]"
                  >
                    <User className="h-5 w-5 text-cyan-400" />

                    <span className="text-[11px] font-black tracking-[0.2em] uppercase">
                      Profile
                    </span>
                  </Link>

                  <Link
                    href="/settings"
                    className="flex items-center gap-4 px-5 py-4 transition-all hover:bg-cyan-500/[0.05]"
                  >
                    <Settings className="h-5 w-5 text-cyan-400" />

                    <span className="text-[11px] font-black tracking-[0.2em] uppercase">
                      Settings
                    </span>
                  </Link>

                  <button
                    onClick={logout}
                    className="flex w-full items-center gap-4 px-5 py-4 text-left transition-all hover:bg-red-500/10"
                  >
                    <LogOut className="h-5 w-5 text-red-400" />

                    <span className="text-[11px] font-black tracking-[0.2em] text-red-400 uppercase">
                      Logout
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* SIDEBAR */}
      <aside
        className={`
fixed top-0 left-0 z-[100]
h-screen w-full max-w-[360px]
overflow-hidden
border-r border-white/10
bg-[#050816]/95
backdrop-blur-2xl

transform-gpu
transition-all
duration-500
ease-[cubic-bezier(0.22,1,0.36,1)]

${open ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}
`}
      >
        {/* bg */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-[120px]" />

          <div className="absolute inset-0 opacity-[0.05]">
            <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:50px_50px]" />
          </div>
        </div>

        <div className="relative z-10 flex h-full flex-col">
          {/* top */}
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-6">
            <div>
              <h2 className="text-2xl font-black uppercase">The Prism</h2>

              <p className="mt-1 text-[10px] tracking-[0.3em] text-cyan-400 uppercase">
                Intelligence Layer
              </p>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] transition-all hover:border-cyan-500/30 hover:bg-cyan-500/10"
            >
              <X className="h-5 w-5 text-cyan-400" />
            </button>
          </div>

          {/* links */}
          <nav
            className={`
    flex-1 px-4 py-4
    transition-all duration-500 delay-100
    ${open ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"}
  `}
          >
            {links.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className="group flex items-center justify-between rounded-2xl border border-transparent px-4 py-5 transition-all hover:border-cyan-500/20 hover:bg-cyan-500/[0.04]"
              >
                <div>
                  <h3 className="text-sm font-black tracking-[0.18em] text-white uppercase transition-colors group-hover:text-cyan-400">
                    {item.name}
                  </h3>

                  <p className="mt-2 max-w-[220px] text-[11px] leading-relaxed text-white/35">
                    {item.desc}
                  </p>
                </div>

                <ChevronRight className="h-4 w-4 text-white/20 transition-all group-hover:translate-x-1 group-hover:text-cyan-400" />
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* BACKDROP */}
      <div
        onClick={() => setOpen(false)}
        className={`
    fixed inset-0 z-[90]
    bg-black/80 backdrop-blur-sm
    transition-all duration-500
    ${
      open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
    }
  `}
      />
    </>
  );
}
