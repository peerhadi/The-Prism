'use client';

import * as React from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import PublicIcon from '@mui/icons-material/Public';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import LanguageIcon from '@mui/icons-material/Language';
import MemoryIcon from '@mui/icons-material/Memory';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CampaignIcon from '@mui/icons-material/Campaign';
import PsychologyIcon from '@mui/icons-material/Psychology';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

export function Sidebar() {
  return (
    <aside className="w-[280px] h-[inherit] border-r border-[rgb(32,43,62)] bg-[rgb(11,19,38)] flex flex-col p-4">

      {/* Title */}
      <div className="mb-4">
        <h1 className="text-3xl font-semibold text-white tracking-tight">
          The Prism
        </h1>

        <p className="text-[15px] text-gray-400 mt-1">
          Perspective-driven narratives
        </p>
      </div>

      <Separator className="mb-4 bg-[rgb(32,43,62)]" />

      {/* Navigation */}
      <nav className="flex flex-col gap-1">

        {[
          {
            href: "/news/world-news",
            label: "World News",
            icon: <PublicIcon fontSize="small" />,
          },
          {
            href: "/news/geopolitics",
            label: "Geopolitics",
            icon: <LanguageIcon fontSize="small" />,
          },
          {
            href: "/news/economics",
            label: "Economics",
            icon: <TrendingUpIcon fontSize="small" />,
          },
          {
            href: "/news/technology",
            label: "Technology",
            icon: <MemoryIcon fontSize="small" />,
          },
          {
            href: "/news/politics",
            label: "Politics",
            icon: <AccountBalanceIcon fontSize="small" />,
          },
          {
            href: "/news/media-narratives",
            label: "Media Narratives",
            icon: <CampaignIcon fontSize="small" />,
          },
          {
            href: "/news/psychology",
            label: "Psychology",
            icon: <PsychologyIcon fontSize="small" />,
          },
          {
            href: "/news/sports",
            label: "Sports",
            icon: <SportsBasketballIcon fontSize="small" />,
          },
        ].map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant="ghost"
              className="w-full h-[48px] px-3 justify-start gap-3 rounded-none text-[17px] font-normal text-gray-300 hover:text-white hover:bg-[rgb(19,27,46)]"
            >
              {item.icon}
              {item.label}
            </Button>
          </Link>
        ))}

      </nav>
    </aside>
  );
}
