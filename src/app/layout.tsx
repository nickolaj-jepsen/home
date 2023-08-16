import "./_global_styles/reset.css";
import "./_global_styles/main.css";
import type { Metadata } from "next";
import { Rubik, Inter } from "next/font/google";
import clsx from "clsx";
import { FadeImage } from "@/components/FadeImage";
import background from "../../public/background.jpg";
import styles from "./layout.module.css";

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-brand",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

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
      <body className={clsx(rubik.variable, inter.className)}>
        <div className={styles.wrapper}>{children}</div>
        <div className={styles.background}>
          <FadeImage
            src={background}
            alt={"background"}
            className={styles.image}
            fill={true}
          />
        </div>
      </body>
    </html>
  );
}
