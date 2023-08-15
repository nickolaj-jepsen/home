import styles from "./page.module.css";
import Image from "next/image";
import { Box } from "@/components/Box";
import logo from "../../public/logo.png";
import background from "../../public/background.jpg";
import { GitHub, Linkedin, Mail } from "react-feather";
import { FadeImage } from "@/components/FadeImage";

export default function Home() {
  return (
    <>
      <div className={styles.wrapper}>
        <Box className={styles.main}>
          <Image
            className={styles.logo}
            src={logo}
            alt={"pixel art of a flame"}
          />
          <h1 className={styles.name}>Nickolaj Jepsen</h1>
          <h2 className={styles.title}>Software developer</h2>
          <div className={styles.socials}>
            <a
              href="https://github.com/nickolaj-jepsen"
              target="_blank"
              aria-label="Visit my gitHub"
              rel="noopener noreferrer"
            >
              <GitHub />
            </a>
            <a
              href={"mailto:nickolaj@fireproof.website"}
              target="_blank"
              aria-label="Write me an email"
              rel="noopener noreferrer"
            >
              <Mail />
            </a>
            <a
              href="https://www.linkedin.com/in/nickolaj-jepsen/"
              target="_blank"
              aria-label="Visit my LinkedIn"
              rel="noopener noreferrer"
            >
              <Linkedin />
            </a>
          </div>
        </Box>
      </div>
      <FadeImage
        src={background}
        alt={"background"}
        className={styles.background}
        fill={true}
      />
    </>
  );
}
