import type { Metadata, Viewport } from "next";
import { Onest } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const onest = Onest({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-onest",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Joe Yoke — Make Your Game Shine",
  description:
    "Joe Yoke is the ultimate gamification engine. Turn routine into reward with seamless points, badges, and leaderboards.",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={onest.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
