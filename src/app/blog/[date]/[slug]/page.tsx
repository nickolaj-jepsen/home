import React from "react";
import { Box } from "@/components/Box";
import styles from "./page.module.css";
import Image from "next/image";
import logo from "../../../../../public/logo.png";
import { getBlog, listBlogs } from "@/api/blog";
import Link from "next/link";

export async function generateStaticParams() {
  return listBlogs();
}

export default async function Page({
  params,
}: {
  params: { slug: string; date: string };
}) {
  const {
    result,
    toc,
    frontmatter: { title, published },
  } = await getBlog(params.date, params.slug);

  if (!published && process.env.NODE_ENV === "production") {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <Box className={styles.header}>
        <h1>{title}</h1>
        <span className={styles.author}>
          Author:{" "}
          <Link href={"/"} className={styles.authorLink}>
            <Image
              src={logo}
              height={20}
              alt={""}
              className={styles.authorImage}
            ></Image>
            Nickolaj Jepsen
          </Link>
        </span>
      </Box>
      {toc?.length ? (
        <div className={styles.tocParent}>
          <Box className={styles.toc}>
            <h2>Table of contents</h2>
            <ul>
              {toc.map((lvl1) => (
                <li key={lvl1.id}>
                  <a href={`#${lvl1.id}`}>{lvl1.value}</a>
                  {lvl1.children?.length ? (
                    <ul>
                      {lvl1.children.map((lvl2) => (
                        <li key={lvl2.id}>
                          <a href={`#${lvl2.id}`}>{lvl2.value}</a>
                        </li>
                      ))}
                    </ul>
                  ) : undefined}
                </li>
              ))}
            </ul>
          </Box>
        </div>
      ) : undefined}
      <Box className={styles.body}>{result}</Box>
    </div>
  );
}
