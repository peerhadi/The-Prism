import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Metadata } from "next";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});
export const metadata: Metadata = {
  icons: {
    icon: "/logo.png",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable,
      )}
    >
      <body>
        <ThemeProvider>
          <Navbar />
          <GoogleOAuthProvider clientId="326949971375-3qq23gr7vdd4tnubscvs7n5agk9hbbue.apps.googleusercontent.com">
            {children}
          </GoogleOAuthProvider>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
