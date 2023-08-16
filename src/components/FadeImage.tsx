"use client";

import React, { FunctionComponent, useState } from "react";
import Image, { ImageProps } from "next/image";
import clsx from "clsx";
import styles from "./FadeImage.module.css";

export const FadeImage: FunctionComponent<ImageProps> = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <Image
      {...props}
      alt={props.alt}
      className={clsx(props.className, styles.image, isLoaded && styles.loaded)}
      onLoadingComplete={() => setIsLoaded(true)}
    />
  );
};
