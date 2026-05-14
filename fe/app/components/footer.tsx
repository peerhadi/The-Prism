"use client"

import * as React from "react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="flex w-full flex-col items-start justify-between gap-6 border-t px-6 py-8 md:flex-row md:items-center md:gap-0">
      {/* Left section: Brand & copyright */}
      <div className="flex flex-col space-y-2">
        <span className="text-lg font-bold">The Prism</span>
        <span className="text-sm">
          &copy; {new Date().getFullYear()} The Prism. All rights reserved.
        </span>
      </div>

      {/* Center section: Links */}
      <div className="flex space-x-6">
        <Link href="/stories" className="text-sm hover:underline">
          Stories
        </Link>
        <Link href="/explore" className="text-sm hover:underline">
          Explore
        </Link>
        <Link href="/about" className="text-sm hover:underline">
          About
        </Link>
      </div>

      {/* Right section: Misc */}
      <div className="flex space-x-4 text-sm">
        <Link href="/privacy" className="hover:underline">
          Privacy
        </Link>
        <Link href="/terms" className="hover:underline">
          Terms
        </Link>
        <Link href="/contact" className="hover:underline">
          Contact
        </Link>
      </div>
    </footer>
  )
}
