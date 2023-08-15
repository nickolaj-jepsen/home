import "./reset.css";
import "./globals.css";
import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import clsx from "clsx";

const rubik = Rubik({ subsets: ["latin"], variable: "--font-brand" });

export const metadata: Metadata = {
  title: "A Fireproof Website",
  description: "Completely fireproof, guaranteed.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx(rubik.variable)}>{children}</body>
    </html>
  );
}
