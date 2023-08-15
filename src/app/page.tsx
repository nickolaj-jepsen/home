import styles from "./page.module.css";
import Image from "next/image";
import { Box } from "@/components/Box";
import logo from "../../public/logo.png";
import background from "../../public/background.jpg";
import { GitHub, Linkedin, Mail } from "react-feather";

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
          <h1>Nickolaj Jepsen</h1>
          <h3>Software developer</h3>
          <div className={styles.socials}>
            <a
              href="https://github.com/nickolaj-jepsen"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHub />
            </a>
            <a
              href={"mailto:nickolaj@fireproof.website"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Mail />
            </a>
            <a
              href="https://www.linkedin.com/in/nickolaj-jepsen/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin />
            </a>
          </div>
        </Box>
      </div>
      <Image
        src={background}
        loading={"lazy"}
        placeholder={"blur"}
        alt={"background"}
        className={styles.background}
        fill={true}
      />
    </>
  );
}
