import type { Metadata } from "next";
import { Onest } from "next/font/google";

// THIS IS THE CRITICAL LINE THAT WAS LIKELY MISSING
import "./globals.css";

const onest = Onest({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Joe Yoke — Social Gaming App",
  description: "The games bring you in, but the friendships keep you here.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={onest.className}>{children}</body>
    </html>
  );
}