import React from "react";
import { Box } from "@/components/Box";
import styles from "./page.module.css";
import Image from "next/image";
import Logo from "../../../../../public/logo.svg";
import { getBlog, listBlogs } from "@/api/blog";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return listBlogs();
}

export default async function Page({
  params,
}: {
  params: { slug: string; date: string };
}) {
  const { slug, date } = await params;
  const {
    result,
    toc,
    frontmatter: { title, published },
  } = await getBlog(date, slug);

  if (!published && process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <div className={styles.wrapper}>
      <Box className={styles.header}>
        <h1>{title}</h1>
        <span className={styles.author}>
          Author:{" "}
          <Link href={"/"} className={styles.authorLink}>
            <Logo
              height={20}
              alt={""}
              className={styles.authorImage}
            ></Logo>
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
