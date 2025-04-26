import styles from "./page.module.css";
import { Box } from "@/components/Box";
import Logo from "../../public/logo.svg";
import { GitHub, Linkedin, Mail, Rss } from "react-feather";
import { listBlogs } from "@/api/blog";
import Link from "next/link";

export default async function Page() {
  const blogPosts = await listBlogs();

  return (
    <div className={styles.wrapper}>
      <Box className={styles.main}>
        <Logo
          className={styles.logo}
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
      {blogPosts.length >= 1 && (
        <Box className={styles.blogPosts}>
          <h2 className={styles.feedHeader}>
            Latest blog posts
            <Link href={"/atom.xml"} target={"_blank"}>
              <Rss />
            </Link>
          </h2>
          <ul>
            {blogPosts.slice(0, 3).map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.date}/${post.slug}`}>
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </Box>
      )}
    </div>
  );
}
