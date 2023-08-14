import React, { FunctionComponent, PropsWithChildren } from "react";
import clsx from "clsx";
import styles from "./Box.module.css";

interface IBoxProps extends PropsWithChildren {
  className?: string;
}

export const Box: FunctionComponent<IBoxProps> = ({ children, className }) => {
  return <div className={clsx(className, styles.box)}>{children}</div>;
};
